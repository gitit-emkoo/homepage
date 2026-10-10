// 페이지 전체를 세로로 잘라 캡처한다. 원본 Waveon 페이지와 이관한 페이지를 나란히 비교할 때 쓴다.
// 사용법: node tools/shot.mjs <url> <이름> <가로폭> [조각높이] [mobile]
// 결과: shots/<이름>-0.png, -1.png ... (shots/ 는 git 에 올라가지 않음)
// 환경 변수 VH: 뷰포트 높이 (Waveon 처럼 안쪽 컨테이너가 스크롤되는 페이지는 페이지 높이만큼 크게)
//           CHROME: Chrome 실행 파일 경로 (기본값은 Windows 기본 설치 경로)
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [url, name, width, chunkArg, mobileArg] = process.argv.slice(2);
if (!url || !name || !width) {
  console.error("사용법: node tools/shot.mjs <url> <이름> <가로폭> [조각높이] [mobile]");
  process.exit(1);
}

const W = Number(width);
const chunk = Number(chunkArg || 1400);
const isMobile = mobileArg === "mobile";
const VH = Number(process.env.VH || 800);
const outDir = path.resolve("shots");
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: VH, deviceScaleFactor: 1, isMobile, hasTouch: isMobile });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1500));
  const total = Math.max(VH, await page.evaluate(() => document.documentElement.scrollHeight));
  const overflowX = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  let i = 0;
  for (let y = 0; y < total; y += chunk) {
    const h = Math.min(chunk, total - y);
    await page.screenshot({
      path: path.join(outDir, `${name}-${i}.png`),
      clip: { x: 0, y, width: W, height: h },
      captureBeyondViewport: true,
    });
    i++;
  }
  console.log(`${name}: ${W}x${total}, ${i}장, 가로 넘침=${overflowX}px`);
} finally {
  await browser.close();
}
