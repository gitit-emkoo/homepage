import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "상담 문의",
  description: "구상 중인 서비스를 편하게 남겨 주세요. 1–2일 내 이메일로 회신드립니다.",
  alternates: { canonical: "/contact" },
};

const FLOW = ["접수", "문의 확인", "미팅 진행", "협업 계약"];

export default function ContactPage() {
  return (
    <section className="contact">
      <div className="wrap contact__inner">
        <div className="contact__info">
          <p className="label">상담 문의</p>
          <h1 className="intro__title">언제나 열려있습니다.</h1>
          <p className="contact__lead">
            구상 중인 내용으로 편하게 문의 주시면 빠르게 검토 후 연락드립니다. 입력해 주신 이메일로 1–2일 내
            회신드립니다.
          </p>
          <ol className="contact__flow">
            {FLOW.map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="contact__note">
            아래 항목을 모두 채우지 않아도 괜찮습니다. 아이디어 단계라면 한 줄 정의만으로도 충분히 이야기를 시작할 수
            있습니다.
          </p>
        </div>
        <div className="contact__form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
