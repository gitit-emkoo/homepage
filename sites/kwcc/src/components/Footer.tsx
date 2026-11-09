import { COMPANY, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {SITE_NAME}
      </span>
      <span>
        {COMPANY.address} · {COMPANY.bizNumber}
      </span>
    </footer>
  );
}
