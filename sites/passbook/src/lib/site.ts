export const SITE_URL = "https://www.passbook.today";
export const SITE_NAME = "PassBook";
export const SITE_DESCRIPTION = "고객 예약관리의 첫걸음은 패스북부터";

export const GTM_ID = "GTM-TG8B9Q42";
export const GA_MEASUREMENT_ID = "G-J7SYVLNVJS";
export const BEUSABLE_SRC = "//rum.beusable.net/load/b250716e125557u066";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.kimssam.kwcc&hl=ko&gl=KR&utm_source=apac_med";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/%ED%8C%A8%EC%8A%A4%EC%95%A4%EB%B6%81-pass-book-%EC%84%A0%EB%B6%88%EA%B6%8C-%ED%9A%9F%EC%88%98%EA%B6%8C-%EA%B4%80%EB%A6%AC/id6759764852";

export const CS_EMAIL = "cokwcc@gmail.com";

export const COMPANY_INFO = [
  "KWCC(주)",
  "사업자 등록번호 : 849-81-02606",
  "주소 : 경기도 화성시 동탄대로 646-2 A-907호",
  "전화번호 : 010-9162-7479",
  `cs center : ${CS_EMAIL}`,
] as const;

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Pass&Book (패스앤북)",
      alternateName: ["패스북", "선불권 관리 앱", "회차권 관리 시스템"],
      operatingSystem: "iOS, Android",
      applicationCategory: "BusinessApplication",
      description:
        "네일샵, 뷰티샵, 헤어샵, PT, 개인레슨 등 1인 샵을 위한 가장 쉬운 선불권 관리 앱. 카톡 예약은 사장님만 보지만, 패스북 기록은 고객도 신뢰합니다.",
      url: `${SITE_URL}/`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      creator: { "@type": "Organization", name: "KWCC Co., Ltd." },
      featureList: [
        "선불권 발행 및 잔여 횟수 자동 차감",
        "고객 직접 서명 및 즉시 알림 발송",
        "계약서, 청구서, 이용확인서 자동 생성",
        "1인 샵에 최적화된 심플한 UI",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "네일샵에서 왜 패스북을 써야 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "종이 장부나 카톡 기록은 분쟁의 소지가 있습니다. 패스북은 고객이 직접 서명하고 기록을 실시간으로 공유받기 때문에 고객 신뢰도가 수직 상승합니다.",
          },
        },
        {
          "@type": "Question",
          name: "무료로 사용할 수 있나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 현재 패스북은 출시 기념으로 핵심 기능을 무료로 체험할 수 있는 혜택을 제공하고 있습니다.",
          },
        },
      ],
    },
  ],
};
