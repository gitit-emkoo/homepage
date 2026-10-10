# 코어셋 홈페이지

[www.coreset.im](https://www.coreset.im) — MVP 앱·웹 개발 스튜디오 소개 사이트. 원본 Waveon 페이지의 내용을 바탕으로 디자인을 새로 만들었다. Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:coreset`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 페이지

| 주소 | 내용 | 예전 Waveon 주소 |
| --- | --- | --- |
| `/` | 메인 | `/1775641271197` |
| `/process` | 서비스 · 절차, FAQ | `/1673319925800` |
| `/portfolio` | 포트폴리오 13건 | `/1775579848012` |
| `/contact` | 상담 문의 폼 | `/1673320025940` |

예전 주소로 들어오면 `public/_redirects` 가 새 주소로 보내준다 (Cloudflare Pages, Netlify 에서 동작).

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 제목·설명·공유 미리보기, 검색 사이트 인증, GA
│   ├── page.tsx            # 메인
│   ├── process/ portfolio/ contact/
│   └── globals.css         # 전체 디자인 (모바일 → 태블릿 768px → PC 1080px)
├── components/
│   ├── Header.tsx          # 상단 메뉴 (모바일 햄버거)
│   ├── ContactForm.tsx     # 상담 문의 폼 → Web3Forms → 이메일
│   ├── WorkCard.tsx        # 포트폴리오 카드
│   └── CtaBand.tsx / PageIntro.tsx / Footer.tsx
└── lib/
    ├── site.ts             # 주소, 설명, GA, 폼 키·메일 제목, 회사 정보
    └── work.ts             # 포트폴리오 목록 (여기만 고치면 메인·포트폴리오에 반영)
public/images/  work/(화면)  icons/(앱 아이콘)
```

## 포트폴리오 추가하기

1. 화면 이미지(1920x1080)를 `public/images/work/<slug>.png`, 앱 아이콘(정사각형)을 `public/images/icons/<slug>.png` 로 넣는다.
2. `src/lib/work.ts` 의 `WORKS` 배열에 항목을 추가한다. 메인에는 `page.tsx` 에서 고른 3개만 나온다.

## 상담 문의 폼

원본은 구글 시트(코어셋 문의)에 저장했다. 지금은 Web3Forms 로 cokwcc@gmail.com 에 메일로 온다. 메일 제목: `[코어셋] 상담 문의`

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:coreset`
- 출력 폴더: `sites/coreset/out`
- 빌드 감시 경로: `sites/coreset/*`, `package.json`, `package-lock.json`
