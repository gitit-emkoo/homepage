import Image from "next/image";
import { COMPANY } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Image className="footer__logo" src="/images/logo.png" alt="ReConnect" width={1400} height={300} />
        <dl className="footer__info">
          <div>
            <dt className="sr-only">회사명</dt>
            <dd>{COMPANY.name}</dd>
          </div>
          <div>
            <dt>사업자등록번호</dt>
            <dd>{COMPANY.bizNumber}</dd>
          </div>
          <div>
            <dt>주소</dt>
            <dd>{COMPANY.address}</dd>
          </div>
        </dl>
        <p className="footer__copy">© KWCC Co., Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
