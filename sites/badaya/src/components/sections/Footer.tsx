import Image from "next/image";
import { SNS_LINKS } from "@/lib/site";

const COMPANY_DETAILS = [
  { label: "대표", value: "손광현, 한장원" },
  { label: "사업자등록번호", value: "625-87-03656" },
  { label: "주소", value: "경기도 화성시 동탄구 동탄중심상가1길 36, 801-J183호" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__info">
          <p className="footer__company">바다야(주)</p>
          <dl className="footer__details">
            {COMPANY_DETAILS.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="footer__email">
            E-mail :&nbsp;<a href="mailto:contact@badaya.io.kr">contact@badaya.io.kr</a>
          </p>
        </div>
        <ul className="footer__sns">
          {SNS_LINKS.map((sns) => (
            <li key={sns.label}>
              <a href={sns.href} aria-label={sns.label}>
                <Image src={sns.icon} alt="" width={sns.size} height={sns.size} style={{ width: sns.size, height: sns.size }} />
              </a>
            </li>
          ))}
        </ul>
        <p className="footer__copyright">Copyright Made by 바다야 Co., Ltd.</p>
      </div>
    </footer>
  );
}
