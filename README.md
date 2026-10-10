# homepage

노코드(Waveon)로 만들었던 홈페이지들을 Next.js + TypeScript 코드로 옮겨 모아 둔 저장소.
사이트끼리는 서로 별개이고, **패키지(`node_modules`)만 맨 위에서 한 벌로 같이 쓴다** (npm workspaces).

## 구조

```
homepage/
├── package.json        # workspaces: sites/* , 사이트별 단축 명령
├── node_modules/       # 모든 사이트가 같이 쓰는 패키지 (한 벌)
├── sites/
│   ├── badaya/         # www.badaya.io.kr
│   └── passbook/       # www.passbook.today
├── tools/
│   ├── waveon-extract.mjs  # Waveon 페이지 → 디자인 데이터·이미지 추출
│   └── waveon-text.mjs     # 추출 데이터에서 긴 글(약관 등) 꺼내기
└── _archive/           # 예전 작업물 보관
```

## 자주 쓰는 명령 (맨 위 폴더에서)

| 명령어 | 설명 |
| --- | --- |
| `npm install` | 처음 한 번 (새 사이트를 추가했을 때도 한 번) |
| `npm run dev:badaya` / `npm run dev:passbook` | 해당 사이트 개발 서버 |
| `npm run build:badaya` / `npm run build:passbook` | 해당 사이트 배포 파일(`out/`) 생성 |
| `npm run build:all` | 모든 사이트 빌드 |
| `npm run lint:all` | 모든 사이트 코드 검사 |

## 새 사이트 추가하기

1. `node tools/waveon-extract.mjs <Waveon 주소> <작업 폴더>` 로 디자인 데이터와 이미지를 뽑는다.
2. `sites/passbook` 의 설정 파일(`package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`)을 `sites/<새 이름>/` 으로 복사하고 `package.json` 의 `name` 을 바꾼다.
3. 맨 위에서 `npm install` → 루트 `package.json` 에 `dev:<이름>`, `build:<이름>` 단축 명령을 추가한다.

## 배포

사이트마다 Cloudflare Pages / Netlify / Vercel 프로젝트를 하나씩 만들고 아래처럼 설정한다.

- 루트 폴더: `sites/<사이트 이름>`
- 빌드 명령어: `npm run build`
- 출력 폴더: `out`
