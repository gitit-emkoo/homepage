// 새 방식 웨이브온(React 앱) 사이트의 bundle.js 를 원래 소스 파일(JSX)로 되돌린다.
// 사용법: node tools/waveon-decompile.mjs <bundle.js> <저장 폴더>
// 결과: <저장 폴더>/src/... (번들 안의 virtual-fs:/src 경로 그대로, node_modules 제외)
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const [bundlePath, outDir] = process.argv.slice(2);
if (!bundlePath || !outDir) {
  console.error("사용법: node tools/waveon-decompile.mjs <bundle.js> <저장 폴더>");
  process.exit(1);
}

// 문자열 안의 \uXXXX, \xXX 를 실제 글자로 바꾼다. 따옴표·역슬래시·제어문자는 문자열이 깨지지 않게 그대로 둔다.
const unescape = (code, hex) => {
  const c = String.fromCharCode(parseInt(hex, 16));
  return c < " " || /["'`\\\u2028\u2029]/.test(c) ? code : c;
};
const source = fs
  .readFileSync(bundlePath, "utf8")
  .replace(/\/\* @__PURE__ \*\/ /g, "")
  .replace(/\\u([0-9a-fA-F]{4})/g, unescape)
  .replace(/\\x([89a-fA-F][0-9a-fA-F])/g, unescape);

// "// virtual-fs:/src/..." 표시를 기준으로 파일별로 나눈다. 같은 경로가 여러 번 나오면 이어 붙인다.
const segments = new Map();
const marker = /^\/\/ virtual-fs:(\/\S+)$/gm;
const marks = [...source.matchAll(marker)];
marks.forEach((m, i) => {
  const file = m[1];
  if (!file.startsWith("/src/")) return;
  const body = source.slice(m.index + m[0].length, marks[i + 1]?.index ?? source.length);
  segments.set(file, (segments.get(file) ?? "") + body);
});

const f = ts.factory;
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

function decompile(code, fileName) {
  const sf = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const jsxNames = new Set();
  const fragmentNames = new Set();
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) || st.moduleSpecifier.text !== "react/jsx-runtime") continue;
    for (const el of st.importClause?.namedBindings?.elements ?? []) {
      ((el.propertyName ?? el.name).text === "Fragment" ? fragmentNames : jsxNames).add(el.name.text);
    }
  }

  const transformer = (ctx) => (root) => {
    const isJsxCall = (n) => ts.isCallExpression(n) && ts.isIdentifier(n.expression) && jsxNames.has(n.expression.text);
    const visit = (n) => (isJsxCall(n) ? toJsx(n) : ts.visitEachChild(n, visit, ctx));

    const safeText = (s) => s !== "" && s.trim() === s && !/[{}<>&\n]/.test(s);
    const child = (e) => {
      if (ts.isStringLiteral(e)) return safeText(e.text) ? f.createJsxText(e.text) : f.createJsxExpression(undefined, e);
      if (isJsxCall(e)) return toJsx(e);
      return f.createJsxExpression(undefined, visit(e));
    };
    const attrValue = (init) =>
      ts.isStringLiteral(init) && !/["\n\\]/.test(init.text)
        ? f.createStringLiteral(init.text)
        : f.createJsxExpression(undefined, visit(init));

    function toJsx(call) {
      const [typeArg, propsArg, keyArg] = call.arguments;
      const isFragment = ts.isIdentifier(typeArg) && fragmentNames.has(typeArg.text) && !keyArg;
      const tag = ts.isStringLiteral(typeArg)
        ? f.createIdentifier(typeArg.text)
        : ts.isIdentifier(typeArg) && fragmentNames.has(typeArg.text)
          ? f.createIdentifier("Fragment")
          : visit(typeArg);

      const attrs = [];
      let children = [];
      if (keyArg) attrs.push(f.createJsxAttribute(f.createIdentifier("key"), f.createJsxExpression(undefined, visit(keyArg))));
      if (propsArg && ts.isObjectLiteralExpression(propsArg)) {
        for (const p of propsArg.properties) {
          if (ts.isSpreadAssignment(p)) {
            attrs.push(f.createJsxSpreadAttribute(visit(p.expression)));
            continue;
          }
          const name = p.name.text;
          const init = ts.isShorthandPropertyAssignment(p) ? p.name : p.initializer;
          if (name === "children") {
            children = (ts.isArrayLiteralExpression(init) && call.expression.text.startsWith("jsxs") ? init.elements : [init]).map(child);
          } else {
            attrs.push(f.createJsxAttribute(f.createIdentifier(name), attrValue(init)));
          }
        }
      } else if (propsArg) {
        attrs.push(f.createJsxSpreadAttribute(visit(propsArg)));
      }

      if (isFragment) return f.createJsxFragment(f.createJsxOpeningFragment(), children, f.createJsxJsxClosingFragment());
      const attributes = f.createJsxAttributes(attrs);
      if (children.length === 0) return f.createJsxSelfClosingElement(tag, undefined, attributes);
      return f.createJsxElement(f.createJsxOpeningElement(tag, undefined, attributes), children, f.createJsxClosingElement(tag));
    }

    return ts.visitNode(root, visit);
  };

  const result = ts.transform(sf, [transformer]);
  return printer.printFile(result.transformed[0]);
}

for (const [file, code] of segments) {
  const out = path.join(outDir, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, /\.(t|j)sx?$/.test(file) ? decompile(code, file) : code.trim() + "\n");
  console.log(file);
}
