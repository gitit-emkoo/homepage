# 재무박스 홈페이지

초기 소형법인 셀프 재무관리 서비스 랜딩 페이지. 원본은 Waveon(`https://kwcc2020-99888.waveon.me/`). Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:jaemubox`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 제목·설명·공유 미리보기
│   ├── page.tsx            # 상단 메뉴 + 섹션 순서
│   └── globals.css         # 전체 디자인 (원본 CSS 그대로, 760px 이하 모바일)
├── components/             # 섹션별 컴포넌트 (원본 Waveon 앱 코드를 tools/waveon-decompile.mjs 로 복원)
└── lib/
    └── site.ts             # 주소, 설명, 앱 스토어 링크
public/images/
```

## 남은 일

- `src/lib/site.ts` 의 `SITE_URL` 을 실제 도메인으로 교체
- 앱 출시 후 `PLAY_STORE_URL`, `APP_STORE_URL` 을 실제 앱 주소로 교체 (원본도 스토어 메인 주소만 걸려 있음)

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:jaemubox`
- 출력 폴더: `sites/jaemubox/out`
- 빌드 감시 경로: `sites/jaemubox/*`, `package.json`, `package-lock.json`
