# 월세 스위치 (임대인용) 홈페이지

매출연동 임대차 플랫폼의 중개사 파트너 모집 랜딩 페이지. 원본은 Waveon(`https://kwcc2020-100047.waveon.me/`). Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:wolse-landlord`처럼 실행한다.

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
│   ├── page.tsx            # 공지 띠 + 섹션 순서 + 푸터
│   └── globals.css         # 전체 디자인 (원본 CSS 그대로, 760px 이하 모바일)
├── components/
│   ├── Header.tsx          # 상단 메뉴 (모바일 햄버거)
│   ├── PartnerSection.tsx  # 초기 파트너 신청 폼 → Web3Forms → 이메일
│   └── ...Section.tsx      # 섹션별 컴포넌트 (tools/waveon-decompile.mjs 로 복원)
└── lib/
    └── site.ts             # 주소, 설명, 폼 키·메일 제목
public/images/
```

## 원본과 다른 점

- 원본 로고 이미지는 제작자 PC 경로(`C:\Users\...`)로 걸려 있어 깨져 보였다. 임차인용 사이트의 "스위치" 로고로 대체했다.
- 원본 신청 폼은 존재하지 않는 주소(`/api/partner-application`)로 보내고 있었다. Web3Forms 로 바꿔 cokwcc@gmail.com 으로 오게 했다. 메일 제목: `[월세스위치 임대인용] 초기 파트너 신청`

## 남은 일

- `src/lib/site.ts` 의 `SITE_URL` 을 실제 도메인으로 교체

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:wolse-landlord`
- 출력 폴더: `sites/wolse-landlord/out`
- 빌드 감시 경로: `sites/wolse-landlord/*`, `package.json`, `package-lock.json`
