"use client";

import { useState, type FormEvent } from "react";
import { FORM_SUBJECT, WEB3FORMS_ACCESS_KEY } from "@/lib/site";

const FIELDS = [
  { name: "성함(회사명)", label: "성함 (회사명)", required: true, placeholder: "홍길동 / 회사명" },
  { name: "이메일", label: "이메일", type: "email", required: true, placeholder: "회신 받으실 이메일" },
  { name: "연락처", label: "연락처", type: "tel", placeholder: "010-0000-0000" },
  { name: "서비스명", label: "서비스명", placeholder: "가칭이어도 괜찮습니다" },
  { name: "한줄 정의", label: "구현하고자 하는 서비스 한 줄 정의", placeholder: "예: 동네 헬스장 선불권을 관리하는 앱", wide: true },
  { name: "주요 기능", label: "꼭 필요한 기능 및 주요 동작", multiline: true, wide: true },
  { name: "참고 앱/웹", label: "참고하고 싶은 앱이나 웹사이트", wide: true },
  { name: "디자인 컨셉", label: "디자인 컨셉 (참고 앱이나 웹)", wide: true },
];

export default function ContactForm() {
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
          from_name: "코어셋 홈페이지",
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

  if (status === "done") {
    return (
      <div className="form-done" role="status">
        <p className="form-done__title">문의 내역이 전송되었습니다.</p>
        <p>1–2일 내 입력해 주신 이메일로 회신드리겠습니다. 감사합니다.</p>
        <button type="button" className="btn btn--line" onClick={() => setStatus("idle")}>
          새 문의 작성하기
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" />
      {FIELDS.map((field) => (
        <label key={field.name} className={`form__field${field.wide ? " form__field--wide" : ""}`}>
          <span className="form__label">
            {field.label}
            {field.required && <em> 필수</em>}
          </span>
          {field.multiline ? (
            <textarea name={field.name} rows={4} placeholder={field.placeholder} />
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </label>
      ))}
      {status === "error" && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--ink form__submit" disabled={status === "sending"}>
        {status === "sending" ? "보내는 중…" : "문의 보내기"}
      </button>
    </form>
  );
}
