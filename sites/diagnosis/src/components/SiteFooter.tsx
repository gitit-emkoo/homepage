const COMPANY_DETAILS = [
  { label: "대표", value: "Sonsoso" },
  { label: "사업자등록번호", value: "849-81-02606" },
  { label: "통신판매업신고", value: "제2023-화성동탄-1793호" },
  { label: "주소", value: "경기도 화성시 동탄대로 646-2 A-907" },
  { label: "전화번호", value: "0507-1351-4876" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__company">케이더블유씨씨 주식회사</p>
        <dl className="site-footer__details">
          {COMPANY_DETAILS.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          <div>
            <dt>이메일</dt>
            <dd>
              <a href="mailto:cokwcc@gmail.com">cokwcc@gmail.com</a>
            </dd>
          </div>
        </dl>
        <p className="site-footer__note">
          진단 결과는 입력한 답변을 바탕으로 한 참고용 자료이며, 답변 내용은 서버에 저장되지 않습니다.
        </p>
        <p className="site-footer__copy">© KWCC Co., Ltd.</p>
      </div>
    </footer>
  );
}
