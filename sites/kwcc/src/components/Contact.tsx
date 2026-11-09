"use client";

import { useState, type FormEvent } from "react";
import { COMPANY, FORM_SUBJECT, WEB3FORMS_ACCESS_KEY } from "@/lib/site";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: FORM_SUBJECT,
          from_name: "KWCC 홈페이지",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "전송하지 못했습니다.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "잠시 후 다시 시도해 주세요.");
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section__inner">
        <header className="section__head">
          <p className="section__kicker">03 — Contact</p>
          <h2 className="section__title">프로젝트 문의</h2>
          <p className="section__lead">
            간단한 소개만 남겨 주세요. {COMPANY.email} 로 회신드립니다.
          </p>
        </header>

        {status === "done" ? (
          <div className="form-done" role="status">
            <p className="form-done__title">문의가 전송되었습니다.</p>
            <p>1–2일 내 입력해 주신 이메일로 회신드리겠습니다.</p>
            <button type="button" className="btn btn--line" onClick={() => setStatus("idle")}>
              새 문의 작성하기
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <input type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" />
            <label className="form__field">
              <span className="form__label">
                성함 / 회사명 <em>필수</em>
              </span>
              <input name="성함(회사명)" required placeholder="홍길동 / 회사명" />
            </label>
            <label className="form__field">
              <span className="form__label">
                이메일 <em>필수</em>
              </span>
              <input name="이메일" type="email" required placeholder="회신 받으실 이메일" />
            </label>
            <label className="form__field">
              <span className="form__label">연락처</span>
              <input name="연락처" type="tel" placeholder="010-0000-0000" />
            </label>
            <label className="form__field">
              <span className="form__label">문의 내용</span>
              <textarea name="문의 내용" rows={4} placeholder="하고 싶은 일, 일정, 참고 링크 등" />
            </label>
            {status === "error" && (
              <p className="form__error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="form__submit" disabled={status === "sending"}>
              {status === "sending" ? "보내는 중…" : "문의 보내기"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
