import { BADAYA_URL } from "@/lib/site";

const COMPANY_DETAILS = [
  { label: "대표", value: "손광현, 한장원" },
  { label: "사업자등록번호", value: "625-87-03656" },
  { label: "주소", value: "경기도 화성시 동탄구 동탄중심상가1길 36, 801-J183호" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__company">
          <a href={BADAYA_URL}>바다야(주)</a>
        </p>
        <dl className="site-footer__details">
          {COMPANY_DETAILS.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="site-footer__note">
          진단 결과는 입력한 답변을 바탕으로 한 참고용 자료이며, 답변 내용은 서버에 저장되지 않습니다.
        </p>
        <p className="site-footer__copy">Copyright Made by 바다야 Co., Ltd.</p>
      </div>
    </footer>
  );
}
