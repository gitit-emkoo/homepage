"use client";

import { useState, type FormEvent } from "react";
import { FORM_SUBJECT, WEB3FORMS_ACCESS_KEY } from "@/lib/site";

export default function SupportForm() {
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
          subject: `${FORM_SUBJECT} ${data["성함"] ?? ""}`.trim(),
          from_name: "픽플레이 홈페이지",
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
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" />
        <label className="form__field">
          <span className="form__label">성함</span>
          <input name="성함" required autoComplete="name" />
        </label>
        <label className="form__field">
          <span className="form__label">이메일</span>
          <input name="이메일" type="email" required autoComplete="email" placeholder="답변 받으실 이메일" />
        </label>
        <label className="form__field">
          <span className="form__label">문의 내용</span>
          <textarea name="문의 내용" rows={6} required />
        </label>
        <label className="form__agree">
          <input type="checkbox" name="개인정보 수집·이용 동의" value="동의함" required />
          <span>자료 제공을 위한 개인정보 수집·이용 제공에 동의합니다.</span>
        </label>
        {status === "error" && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="form__submit" disabled={status === "sending"}>
          {status === "sending" ? "보내는 중…" : "문의하기"}
        </button>
      </form>

      {status === "done" && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="support-done">
          <div className="modal__box">
            <p id="support-done" className="modal__title">
              문의 전송이
              <br />
              완료되었습니다.
            </p>
            <p className="modal__body">
              작성해 주신 이메일 주소로
              <br />
              답변을 보내드릴 예정입니다.
            </p>
            <button type="button" className="form__submit" onClick={() => setStatus("idle")} autoFocus>
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
