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
│   ├── passbook/       # www.passbook.today
│   └── jaemubox/       # 재무박스 (kwcc2020-99888.waveon.me)
├── tools/
│   ├── waveon-extract.mjs    # 예전 Waveon 페이지(블록형) → 디자인 데이터·이미지 추출
│   ├── waveon-text.mjs       # 추출 데이터에서 긴 글(약관 등) 꺼내기
│   └── waveon-decompile.mjs  # 새 Waveon 앱(*.waveon.me) bundle.js → React 소스 복원
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

1. Waveon 페이지 종류에 따라 원본을 뽑는다.
   - 예전 블록형 페이지: `node tools/waveon-extract.mjs <Waveon 주소> <작업 폴더>` 로 디자인 데이터와 이미지를 뽑는다.
   - 새 앱형 페이지(`*.waveon.me`, HTML에 `static.waveon.io/apps/<id>/versions/<v>/bundle.js` 가 있음): 그 `bundle.js` 를 받아 `node tools/waveon-decompile.mjs bundle.js <작업 폴더>` 로 React 소스를 복원한다. 원본이 Tailwind CDN 을 쓰므로 그 기본 리셋도 CSS 에 넣는다 (`sites/jaemubox/src/app/globals.css` 참고).
2. `sites/passbook` 의 설정 파일(`package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`)을 `sites/<새 이름>/` 으로 복사하고 `package.json` 의 `name` 을 바꾼다.
3. 맨 위에서 `npm install` → 루트 `package.json` 에 `dev:<이름>`, `build:<이름>` 단축 명령을 추가한다.

## 폼 (신청서 → 이메일)

폼이 필요한 사이트는 [Web3Forms](https://web3forms.com) 로 접수 내용을 cokwcc@gmail.com 으로 받는다.
모든 사이트가 키 하나를 같이 쓰고, 폼마다 숨김 필드 `subject` 에 `[사이트명] 신청서 이름` 을 넣어 메일 제목으로 구분한다.

- 액세스 키: `f1e190f1-deb2-471d-8a5e-479412892ffc` (공개용 키라 코드에 들어가도 된다)

## 배포

사이트마다 Cloudflare Pages / Netlify / Vercel 프로젝트를 하나씩 만들고, 모두 이 저장소에 연결한다.
설치는 저장소 맨 위에서 해야 공유 패키지가 제대로 깔리므로 루트 폴더는 비워 둔다.

- 루트 폴더: (비움, 저장소 맨 위)
- 빌드 명령어: `npm run build:<사이트 이름>`
- 출력 폴더: `sites/<사이트 이름>/out`
- 빌드 감시 경로(Cloudflare Build watch paths): `sites/<사이트 이름>/*`, `package.json`, `package-lock.json`

`main` 브랜치에 push 하면 바뀐 사이트만 자동으로 다시 빌드·배포된다.
