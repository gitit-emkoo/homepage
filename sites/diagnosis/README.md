# 바다야 사업자 자가진단

따로 있던 Waveon 진단 앱 4개를 한 사이트로 묶고, 4개를 고를 수 있는 메인 페이지를 새로 만들었다. 각 진단 화면은 원본 앱 코드를 그대로 옮겼고(문구·점수 계산·디자인 동일), 위에 공통 헤더와 아래에 푸터만 더했다. Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:diagnosis`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 페이지

| 주소 | 진단 | 원본 |
| --- | --- | --- |
| `/` | 진단 4종 목록 (새로 만듦) | - |
| `/ops` | 소상공인 사업운영 진단 (숫자 입력형) | kwcc2020-99047.waveon.me |
| `/startup` | 창업성공 가능성 진단 | bdy2.waveon.me |
| `/ceo` | 대표자 자질 테스트 | bdy.waveon.me |
| `/loss` | 내 사업의 숨은 손해 진단 | bdy3.waveon.me |

원본은 각각 다른 도메인이라 자동 이동(리다이렉트)은 걸 수 없다. 광고·SNS에 걸린 링크는 새 주소로 바꿔야 한다.

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 공통 헤더·푸터, 제목·설명
│   ├── page.tsx            # 메인 (진단 카드 목록)
│   ├── ops/ startup/ ceo/ loss/   # 각 진단 (page.tsx + 공유 이미지)
│   ├── globals.css         # 원본이 쓰던 Tailwind 기본 리셋
│   └── hub.css             # 헤더·푸터·메인 디자인
├── components/
│   ├── SiteHeader.tsx / SiteFooter.tsx
│   └── tests/              # 진단 화면 4개 (원본 코드를 옮긴 것, 스타일은 파일 안에 있음)
└── lib/
    ├── site.ts             # 주소, 바다야 스토어 링크, 진단 목록(TESTS)
    └── useParticipantCount.ts  # "n명이 참여했습니다" 숫자 (브라우저에 저장)
```

- 진단 문항·점수·결과 문구는 각 `components/tests/*.tsx` 위쪽의 상수(`questions`, `resultRanges` 등)에 있다.
- 메인 카드의 제목·설명·이미지는 `lib/site.ts` 의 `TESTS` 에서 고친다.
- 참여자 수는 원본과 같이 기준 숫자 + 이 브라우저에서 시작한 횟수다 (실제 전체 참여자 수가 아님).
- 답변은 서버로 보내지 않는다. 결과는 브라우저 안에서만 계산된다.

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:diagnosis`
- 출력 폴더: `sites/diagnosis/out`
- 빌드 감시 경로: `sites/diagnosis/*`, `package.json`, `package-lock.json`
