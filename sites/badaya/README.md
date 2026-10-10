# 바다야 홈페이지

[www.badaya.io.kr](https://www.badaya.io.kr) 랜딩 페이지. Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:badaya`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000, 수정하면 바로 반영) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx         # 페이지 제목, 설명, 공유 미리보기, 사이트 인증 메타
│   ├── page.tsx           # 섹션 순서
│   ├── globals.css        # 전체 디자인 (모바일 → 태블릿 768px → PC 1024px)
│   ├── icon.png           # 파비콘
│   └── opengraph-image.jpg # 링크 공유 미리보기 이미지
├── components/
│   ├── AppDownloadButton.tsx # 기기별 앱스토어 이동 버튼
│   ├── ScrollReveal.tsx      # 스크롤 애니메이션
│   └── sections/             # 화면 구간별 컴포넌트
└── lib/site.ts            # 사이트 주소, 앱스토어 링크, SNS 링크
public/images/             # 이미지
```

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:badaya`
- 출력 폴더: `sites/badaya/out`
