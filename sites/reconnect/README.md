# 리커넥트 홈페이지

ReConnect(리커넥트) 부부 정서 케어 앱 소개 사이트. 원본은 [reconnect.waveon.me](https://reconnect.waveon.me) (360px 모바일 화면). 문구와 이미지는 원본 그대로 쓰고, 디자인은 원본 색(밤하늘 남색 · 보라)을 살려 새로 만들었다. Next.js + TypeScript로 만들고 정적 HTML로 내보낸다.

## 명령어

패키지 설치는 저장소 맨 위(`homepage/`)에서 `npm install` 한 번이면 된다. 아래 명령은 이 폴더에서 실행하거나, 맨 위에서 `npm run dev:reconnect`처럼 실행한다.

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
│   ├── layout.tsx          # 제목·설명·공유 미리보기, 검색 사이트 인증
│   ├── page.tsx            # 메인 (테스터 결과·후기·혜택 문구는 맨 위 배열)
│   └── globals.css         # 전체 디자인 (모바일 → 태블릿 768px → PC 1080px)
├── components/
│   ├── Header.tsx          # 로고 + 감정 진단 버튼
│   ├── FeatureCarousel.tsx # 기능 6개 캐러셀 (FEATURES 배열)
│   ├── StoreBadges.tsx     # 구글 플레이 / 앱스토어 배지
│   └── Footer.tsx
└── lib/site.ts             # 주소, 감정 진단 링크, 스토어 링크, 회사 정보
public/images/              # 히어로 사진, 앱 화면 캡처, 로고, 배지
```

## 참고

- "EmoMap 감정 진단" 버튼은 원본처럼 `reconnect-ivory.vercel.app/diagnosis` 로 이동한다.
- 원본의 스토어 배지에는 링크가 없었다. `lib/site.ts` 의 `STORE_LINKS` 에 주소를 넣으면 배지가 링크가 된다. 비어 있는 동안은 흐린 배지에 '출시 예정' 표시가 붙는다.
- 원본에서 이미지 한 장이던 사전 테스터 결과는 HTML 로 다시 만들었다.

## 배포 (Cloudflare Pages)

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:reconnect`
- 출력 폴더: `sites/reconnect/out`
- 빌드 감시 경로: `sites/reconnect/*`, `package.json`, `package-lock.json`, `.node-version`
