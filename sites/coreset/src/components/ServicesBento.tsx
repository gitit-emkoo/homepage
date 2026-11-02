const SERVICES = [
  {
    key: "build",
    tone: "dark",
    title: "앱 · 웹 제작",
    lead: "검증에 필요한 범위만 설계하는 MVP 앱·웹 개발",
    items: ["MVP 앱 (Android / iOS)", "웹 서비스 · 관리자", "소개형 홈페이지 · 쇼핑몰", "업무용 맞춤 툴"],
  },
  {
    key: "marketing",
    tone: "light",
    title: "마케팅 대행",
    lead: "이미지·영상을 만들고 온라인 광고까지 운영합니다",
    items: ["브랜드·프로모션 이미지", "숏폼 · 광고 영상", "메타 · 구글 등 온라인 광고", "성과 리포트 · 운영"],
  },
  {
    key: "ai",
    tone: "light",
    title: "AI 영상 · 이미지",
    lead: "AI로 빠르게 제작하고, 브랜드에 맞게 다듬습니다",
    items: ["AI 이미지 생성 · 보정", "AI 영상 · 모션", "콘셉트 보드 · 시안", "대량 · 반복 제작"],
  },
] as const;

export default function ServicesBento() {
  return (
    <div className="svc-bento">
      {SERVICES.map((service) => (
        <article key={service.key} className={`svc-bento__card svc-bento__card--${service.tone}`}>
          <p className="svc-bento__key">{service.key}</p>
          <h3>{service.title}</h3>
          <p className="svc-bento__lead">{service.lead}</p>
          <ul>
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
