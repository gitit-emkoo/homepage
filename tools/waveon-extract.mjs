// 웨이브온(Waveon) 페이지의 디자인 데이터와 이미지를 추출한다.
// 사용법: node tools/waveon-extract.mjs <페이지 URL> <저장 폴더>
// 결과: <저장 폴더>/tree.txt(요소 목록), tree.json, head.txt(헤드/바디 스크립트), assets/(이미지)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const [url, outDir] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("사용법: node tools/waveon-extract.mjs <페이지 URL> <저장 폴더>");
  process.exit(1);
}

const MOBILE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
const html = await (await fetch(url, { headers: { "user-agent": MOBILE_UA } })).text();
const script = html.match(/<script>(window\.__NUXT__=[\s\S]*?)<\/script>/);
if (!script) throw new Error("웨이브온 페이지 데이터(__NUXT__)를 찾지 못했습니다.");

const ctx = { window: {} };
vm.runInNewContext(script[1], ctx);
const nuxt = ctx.window.__NUXT__;

function findPage(o, depth = 0) {
  if (!o || typeof o !== "object" || depth > 8) return null;
  if (o.datas?.page) return o;
  for (const v of Object.values(o)) {
    const r = findPage(v, depth + 1);
    if (r) return r;
  }
  return null;
}

const STYLE_KEYS = /font|color|background|radius|shadow|opacity|line-height|letter|text-align|object-fit|border-width|stroke/;
const records = [];

function walk(node, offsetY, depth) {
  const mob = node.responsive?.datas?.mobile ?? {};
  const x = mob.x ?? node.x, y = mob.y ?? node.y, w = mob.w ?? node.w, h = mob.h ?? node.h;
  const styles = { ...(node.styles ?? {}), ...(mob.styles ?? {}) };
  const rec = {
    depth, type: node.type, name: node.name, hidden: Boolean(mob.hide ?? node.hide),
    x: +(+x).toFixed(1), y: +(+y).toFixed(1), absY: +(offsetY + (+y || 0)).toFixed(1), w: +(+w).toFixed(1), h: +(+h).toFixed(1),
    styles: Object.fromEntries(Object.entries(styles).filter(([k, v]) => v != null && v !== "" && STYLE_KEYS.test(k))),
  };
  const text = mob.text ?? node.text;
  if (text) rec.text = text;
  if (node.src) rec.src = node.src;
  const logics = (node.logics ?? []).filter((l) => l.results?.length);
  if (logics.length) {
    rec.logics = logics.map((l) => ({
      when: l.conditions.map((c) => c.type),
      do: l.results.map(({ metadata, ...r }) => r),
    }));
  }
  records.push(rec);
  for (const child of node.childs ?? []) walk(child, rec.absY, depth + 1);
}

const found = findPage(nuxt);
let tileY = 0;
for (const tile of found.datas.page.childs) {
  const h = tile.responsive?.datas?.mobile?.h ?? tile.h ?? 0;
  walk(tile, tileY - (tile.responsive?.datas?.mobile?.y ?? tile.y ?? 0), 0);
  tileY += h;
}

fs.mkdirSync(path.join(outDir, "assets"), { recursive: true });
fs.writeFileSync(path.join(outDir, "tree.json"), JSON.stringify(records, null, 1));

const lines = [`URL: ${url}`, `page styles: ${JSON.stringify(found.datas.page.styles)}`, ""];
for (const r of records) {
  const pad = "  ".repeat(r.depth);
  lines.push(`${pad}[${r.type}] ${r.name ?? "-"}${r.hidden ? " (HIDDEN)" : ""} x=${r.x} y=${r.y} absY=${r.absY} w=${r.w} h=${r.h}${r.src ? " src=" + r.src.split("/").pop() : ""}`);
  if (r.text) lines.push(`${pad}   text: ${r.text.replace(/\n/g, " ")}`);
  if (Object.keys(r.styles).length) lines.push(`${pad}   style: ${Object.entries(r.styles).map(([k, v]) => `${k}:${v}`).join("; ")}`);
  if (r.logics) lines.push(`${pad}   logic: ${JSON.stringify(r.logics)}`);
}
fs.writeFileSync(path.join(outDir, "tree.txt"), lines.join("\n"));

const head = [];
(function findScripts(o) {
  if (!o || typeof o !== "object") return;
  for (const [k, v] of Object.entries(o)) {
    if ((k === "headScript" || k === "bodyScript") && typeof v === "string" && !head.includes(v)) head.push(`--- ${k} ---\n${v}`);
    else if (typeof v === "object") findScripts(v);
  }
})(nuxt);
const metas = html.match(/<(meta|link)[^>]+(description|og:|icon|verification)[^>]*>/g) ?? [];
fs.writeFileSync(path.join(outDir, "head.txt"), [...metas, "", ...new Set(head)].join("\n"));

const decoded = html.replace(/\\u002F/g, "/");
const assetUrls = [...new Set(decoded.match(/https?:\/\/static\.waveon\.io\/(?:apps|img\/apps)\/[^"'\s)\\,]+\.(?:png|jpe?g|webp|gif|svg|mp4)/g) ?? [])];
for (const assetUrl of assetUrls) {
  const file = path.join(outDir, "assets", assetUrl.split("/").pop());
  if (!fs.existsSync(file)) fs.writeFileSync(file, Buffer.from(await (await fetch(assetUrl)).arrayBuffer()));
}

console.log(`요소 ${records.length}개, 이미지 ${assetUrls.length}개 → ${outDir}`);
