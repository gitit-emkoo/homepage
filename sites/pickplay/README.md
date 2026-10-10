# 픽플레이 홈페이지

PickPlay(픽플레이) 앱 소개 사이트와 앱에 연결된 정책 페이지. 원본은 [pickplay.waveon.me](https://pickplay.waveon.me) (360px 모바일 화면). 모바일은 원본과 같은 구성으로 두고, 태블릿·PC는 넓은 화면에 맞게 좌우 배치로 바꿨다. Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:pickplay`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 페이지

| 주소 | 내용 | 예전 Waveon 주소 |
| --- | --- | --- |
| `/` | 앱 소개 메인 | `/` |
| `/terms` | 이용약관 | `/pages/1757994808102` |
| `/privacy` | 개인정보처리방침 | `/pages/1757994427672` |
| `/trust` | 신뢰운영원칙 | `/pages/1767583113427` |
| `/support` | 고객센터 문의 폼 | `/pages/1757817752093` |

예전 경로로 들어오면 `public/_redirects` 가 새 주소로 보내준다 (Cloudflare Pages, Netlify 에서 동작). 단, 도메인 자체가 `pickplay.waveon.me` 에서 바뀌므로 **앱스토어·플레이스토어에 등록한 개인정보처리방침/지원 URL은 새 도메인으로 고쳐야 한다.**

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 제목·설명·공유 미리보기, 검색 사이트 인증
│   ├── page.tsx            # 메인 (기능 소개 목록은 FEATURES 배열)
│   ├── terms/ privacy/ trust/ support/
│   └── globals.css         # 전체 디자인 (모바일 → 태블릿 768px → PC 1080px)
├── components/
│   ├── StoreButtons.tsx    # 구글 플레이 / 앱스토어 버튼
│   ├── SubPage.tsx         # 정책 페이지 공통 틀 (상단 뒤로가기 바)
│   ├── SupportForm.tsx     # 고객 문의 폼 → Web3Forms → 이메일
│   └── Footer.tsx
└── lib/site.ts             # 주소, 스토어 링크, 유튜브 영상, 폼 키·메일 제목, 회사 정보
public/images/              # 히어로, 앱 화면 캡처(600px), 스토어 배지
```

## 고객 문의 폼

원본은 구글 시트에 저장했다. 지금은 Web3Forms 로 cokwcc@gmail.com 에 메일로 온다. 메일 제목: `[픽플레이] 고객 문의 성함`

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:pickplay`
- 출력 폴더: `sites/pickplay/out`
- 빌드 감시 경로: `sites/pickplay/*`, `package.json`, `package-lock.json`
