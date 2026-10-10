// waveon-extract.mjs 가 만든 tree.json 에서 긴 원문 텍스트(약관 등)를 찾아 TS 상수 파일로 저장한다.
// 사용법: node tools/waveon-text.mjs <out.ts> <CONST_NAME>=<tree.json>:<찾을 문구> [...]
// 예: node tools/waveon-text.mjs src/lib/legal.ts PRIVACY_TEXT=privacy/tree.json:제1조
import fs from "node:fs";

const [, , outFile, ...specs] = process.argv;
if (!outFile || specs.length === 0) {
  console.error("usage: node tools/waveon-text.mjs <out.ts> <NAME>=<tree.json>:<needle> [...]");
  process.exit(1);
}

function findText(node, needle) {
  if (typeof node.text === "string" && node.text.includes(needle)) return node.text;
  for (const child of node.children ?? []) {
    const hit = findText(child, needle);
    if (hit) return hit;
  }
  return null;
}

const toTemplateLiteral = (s) =>
  "`" + s.replace(/\r/g, "").trim().replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";

const parts = specs.map((spec) => {
  const m = spec.match(/^([A-Z0-9_]+)=(.+):([^:]+)$/);
  if (!m) throw new Error(`잘못된 형식: ${spec}`);
  const [, name, file, needle] = m;
  const tree = JSON.parse(fs.readFileSync(file, "utf8"));
  const text = (Array.isArray(tree) ? tree : [tree]).map((n) => findText(n, needle)).find(Boolean);
  if (!text) throw new Error(`${file} 에서 "${needle}" 를 찾지 못했습니다`);
  console.log(`${name}: ${text.length}자`);
  return `export const ${name} = ${toTemplateLiteral(text)};\n`;
});

fs.writeFileSync(outFile, parts.join("\n"));
