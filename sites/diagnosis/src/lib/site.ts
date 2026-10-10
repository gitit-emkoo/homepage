// 도메인이 정해지면 SITE_URL만 바꾸면 된다.
export const SITE_URL = "https://diagnosis.pages.dev";
export const SITE_NAME = "바다야 사업자 자가진단";
export const SITE_TITLE = "바다야 사업자 자가진단 - 내 사업, 지금 몇 점일까?";
export const SITE_DESCRIPTION =
  "사업운영 진단, 창업성공 가능성, 대표자 자질, 숨은 손해까지. 1~3분이면 끝나는 4가지 무료 진단으로 내 사업의 현재 상태와 먼저 챙길 것을 확인해 보세요.";

export const BADAYA_URL = "https://www.badaya.io.kr";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.app.badayaa&hl=ko";
export const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EB%B0%94%EB%8B%A4%EC%95%BC-%EB%A7%9E%EC%B6%A4-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EC%8B%A0%EC%B2%AD/id6769259830";

export type DiagnosisTest = {
  slug: "ops" | "startup" | "ceo" | "loss";
  /** 원본 Waveon 주소 */
  origin: string;
  title: string;
  question: string;
  description: string;
  duration: string;
  format: string;
  image: { src: string; width: number; height: number; alt: string };
};

export const TESTS: DiagnosisTest[] = [
  {
    slug: "ops",
    origin: "https://kwcc2020-99047.waveon.me/",
    title: "소상공인 사업운영 진단",
    question: "내 사업은 업계 평균 대비 어떤 상태일까?",
    description: "매출·임차료·인건비·운영시간을 입력하면 동종업계 기준과 비교해 먼저 손볼 비용을 짚어 드립니다.",
    duration: "3분",
    format: "숫자 입력형",
    image: { src: "/images/ops-intro.jpg", width: 1200, height: 800, alt: "매출과 비용 구조를 점검하는 카페 사장님" },
  },
  {
    slug: "startup",
    origin: "https://bdy2.waveon.me/",
    title: "창업성공 가능성 진단",
    question: "나의 창업 성공 가능성은 몇 점일까?",
    description:
      "아이템 검증, 고객 이해, 수익 구조, 실행·마케팅 준비, 자금 계획까지 6가지 질문으로 창업 준비도를 점검합니다.",
    duration: "1~2분",
    format: "6문항 선택형",
    image: {
      src: "/images/startup-intro.jpg",
      width: 1200,
      height: 800,
      alt: "창업을 준비하며 계획을 세우는 예비 창업자",
    },
  },
  {
    slug: "ceo",
    origin: "https://bdy.waveon.me/",
    title: "대표자 자질 테스트",
    question: "나는 대표로서 몇 점일까?",
    description: "사업 이해도, 마케팅, 운영 관리, 세무, 지원사업 활용, 성장 준비도로 대표 능력지수를 확인합니다.",
    duration: "1~2분",
    format: "6문항 선택형",
    image: { src: "/images/ceo-intro.jpg", width: 1024, height: 1024, alt: "사업을 운영하는 대표" },
  },
  {
    slug: "loss",
    origin: "https://bdy3.waveon.me/",
    title: "내 사업의 숨은 손해 진단",
    question: "내 사업의 숨은 손해는 얼마일까?",
    description: "매출 기회, 마케팅, 비용, 운영 시간, 세금 서류, 지원 혜택에서 놓치고 있는 손해를 찾아봅니다.",
    duration: "1~2분",
    format: "6문항 선택형",
    image: { src: "/images/loss-intro.jpg", width: 1200, height: 800, alt: "사업장의 숨은 손해를 점검하는 사장님" },
  },
];

export const getTest = (slug: DiagnosisTest["slug"]) => TESTS.find((test) => test.slug === slug)!;
