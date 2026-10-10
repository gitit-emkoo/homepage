# 패스북 홈페이지

[www.passbook.today](https://www.passbook.today) 랜딩 페이지와 하위 페이지. Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:passbook`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 페이지

| 주소 | 내용 | 예전 Waveon 주소 |
| --- | --- | --- |
| `/` | 메인 | `/1755248199682` |
| `/guide` | 사용 가이드 (영상 팝업) | `/1755248220833` |
| `/privacy` | 개인정보처리방침 | `/1769330591251` |
| `/terms` | 이용약관 | `/1769330489959` |
| `/withdraw` | 계정삭제안내 | `/1770004947971` |

예전 주소로 들어오면 `public/_redirects` 가 새 주소로 보내준다 (Cloudflare Pages, Netlify 에서 동작).

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 제목·설명·공유 미리보기, GTM·GA·뷰저블, 구조화 데이터
│   ├── page.tsx            # 메인 섹션 순서
│   ├── guide/ privacy/ terms/ withdraw/   # 하위 페이지
│   └── globals.css         # 전체 디자인 (모바일 → 태블릿 768px → PC 1024px)
├── components/
│   ├── StoreLink.tsx       # 안드로이드·PC는 플레이스토어, 아이폰은 앱스토어
│   ├── VideoButton.tsx     # "동영상으로 보기" 팝업
│   └── sections/           # 메인 화면 구간별 컴포넌트
└── lib/
    ├── site.ts             # 주소, 추적 ID, 회사 정보, 구조화 데이터
    └── legal.ts            # 약관 원문 (tools/waveon-text.mjs 로 추출)
public/images/  public/videos/
```

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 프로젝트 루트 폴더: `sites/passbook`
- 빌드 명령어: `npm run build`
- 출력 폴더: `out`
