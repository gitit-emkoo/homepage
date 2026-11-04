# 코어셋 홈페이지

[www.coreset.im](https://www.coreset.im) — 앱·웹 제작, 마케팅 대행, AI 영상·이미지 제작 스튜디오 소개 사이트(원페이지). Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:coreset`처럼 실행한다.

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (http://localhost:3000) |
| `npm run build` | 배포용 파일을 `out/` 폴더에 생성 |
| `npm run preview` | `out/` 폴더를 로컬에서 미리보기 |
| `npm run lint` | 코드 검사 |

## 페이지

원페이지(`/`) 한 장에 서비스·절차·포트폴리오·문의가 모두 있다. 예전 경로(`/process`, `/portfolio`, `/contact`)와 Waveon 주소는 홈으로 리다이렉트된다.

| 앵커 | 내용 |
| --- | --- |
| `#services` | 앱·웹 / 마케팅 / AI 서비스 캐러셀 |
| `#process` | 절차 · FAQ |
| `#portfolio` | Instagram `@coreset.im` 피드 |
| (플로팅 문의) | Web3Forms 모달 |

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx          # 메타, GA, Header/Footer, 문의 모달·FAB
│   ├── page.tsx            # 원페이지
│   ├── process/ portfolio/ contact/  # 홈 앵커로 리다이렉트
│   └── globals.css
├── components/
│   ├── Header.tsx / Footer.tsx / CtaBand.tsx
│   ├── ServicesCarousel.tsx / InstagramFeed.tsx
│   ├── ContactProvider.tsx / ContactModal.tsx / ContactFab.tsx / ContactForm.tsx
│   └── …
└── lib/
    ├── site.ts             # 주소, 네비, 인스타, GA, 폼 키
    └── work.ts             # (이전 포트폴리오 데이터, 현재 미사용)
```

## Instagram 피드 연결

SnapWidget embed가 `src/lib/site.ts` 의 `INSTAGRAM_EMBED_URL` 에 연결되어 있다. 위젯을 바꾸려면 SnapWidget iframe `src` 만 교체하면 된다.

## 상담 문의 폼

우측 하단 플로팅 버튼·헤더 CTA·본문 버튼이 모두 같은 모달을 연다. Web3Forms → cokwcc@gmail.com. 메일 제목: `[코어셋] 상담 문의`

## 배포 (Cloudflare Pages / Netlify / Vercel 공통)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:coreset`
- 출력 폴더: `sites/coreset/out`
- 빌드 감시 경로: `sites/coreset/*`, `package.json`, `package-lock.json`
