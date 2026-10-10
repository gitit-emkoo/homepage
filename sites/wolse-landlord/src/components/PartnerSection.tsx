"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FORM_SUBJECT, WEB3FORMS_ACCESS_KEY } from "@/lib/site";

const EMPTY_FORM = { name: "", agency_name: "", phone: "", email: "", message: "" };

const PartnerSection = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: FORM_SUBJECT,
          from_name: "월세스위치 홈페이지",
          담당자명: form.name,
          중개사무소명: form.agency_name,
          연락처: form.phone,
          이메일: form.email,
          남기실말씀: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "신청을 처리하지 못했습니다.");
      setState("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : "잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  };
  return (
    <section className="partner" id="apply">
      <div className="partner-copy">
        <span className="kicker inverse">EARLY PARTNER PROGRAM</span>
        <h2>{" 30곳 한정 초기 파트너 평생 혜택"}</h2>
        <div className="offer-panel">
          <div className="offer-main-price">
            <span>2년간 구독료</span>
            <strong>0원</strong>
            <p>
              {"정가 월 5만원 × 24개월, "}
              <b>120만원 상당</b>
            </p>
          </div>
          <div className="offer-divider" />
          <div className="offer-lifetime">
            <span>2년 후에 계속 이용할 시</span>
            <b>
              {"평생 월 "}
              <em>2.5만원</em>으로 이용
            </b>
            <p>정가 월 5만원의 절반 · 신규 가입자보다 평생 반값</p>
          </div>
        </div>
      </div>
      <form className="apply-form" onSubmit={submit}>
        <div className="form-top">
          <div>
            <span className="form-eyebrow">PARTNER APPLICATION</span>
            <h3>초기 파트너 신청</h3>
          </div>
          <span className="required">* 필수 입력</span>
        </div>
        {state === "success" ? (
          <div className="success-box">
            <strong>신청이 접수되었습니다.</strong>
            <p>입력해 주신 연락처로 파트너 안내를 드리겠습니다.</p>
            <button type="button" onClick={() => setState("idle")}>
              새 신청 작성하기
            </button>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <label>
                담당자명*
                <input name="name" value={form.name} onChange={change} required placeholder="성함을 입력해 주세요" />
              </label>
              <label>
                중개사무소명*
                <input
                  name="agency_name"
                  value={form.agency_name}
                  onChange={change}
                  required
                  placeholder="중개사무소명을 입력해 주세요"
                />
              </label>
              <label>
                연락처*
                <input type="tel" name="phone" value={form.phone} onChange={change} required placeholder="010-0000-0000" />
              </label>
              <label>
                이메일
                <input type="email" name="email" value={form.email} onChange={change} placeholder="example@email.com" />
              </label>
            </div>
            <label className="full-label">
              남기실 말씀
              <textarea
                name="message"
                value={form.message}
                onChange={change}
                placeholder="궁금한 점이나 상담 희망 내용을 남겨 주세요."
              />
            </label>
            {state === "error" && <p className="form-error">{error}</p>}
            <button className="btn submit-btn" disabled={state === "loading"}>
              {state === "loading" ? "신청 접수 중..." : "초기 파트너 신청하기"} <span>→</span>
            </button>
          </>
        )}
      </form>
    </section>
  );
};
export default PartnerSection;
