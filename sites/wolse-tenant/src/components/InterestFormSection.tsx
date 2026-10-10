"use client";

import { useState, type FormEvent } from "react";
import { FORM_SUBJECT, WEB3FORMS_ACCESS_KEY } from "@/lib/site";

const InterestFormSection = () => {
  const [email, setEmail] = useState("");
  const [interestRegion, setInterestRegion] = useState("");
  const [plannedBusiness, setPlannedBusiness] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: FORM_SUBJECT,
          from_name: "월세스위치 홈페이지",
          이메일: email,
          관심지역: interestRegion,
          예정업종: plannedBusiness,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "등록에 실패했습니다.");
      setStatus("success");
      setMessage("등록되었습니다. 조건에 맞는 매물이 나오면 가장 먼저 알려드릴게요.");
      setEmail("");
      setInterestRegion("");
      setPlannedBusiness("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "잠시 후 다시 시도해 주세요.");
    }
  };
  return (
    <section className="interest section" id="interest">
      <div className="content interest-layout">
        <div className="interest-copy">
          <p className="eyebrow">EARLY ACCESS</p>
          <h2 style={{ color: "#2F6BFF" }}>
            관심 지역 매물이
            <br />
            궁금하신가요?
          </h2>
          <p>이메일로 부담없이 빠르게 알려드립니다.</p>
        </div>
        <form className="interest-form" onSubmit={handleSubmit}>
          <label>
            {"이메일 "}
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </label>
          <label>
            {"관심 지역 "}
            <span>자유 입력 · 선택</span>
            <input
              value={interestRegion}
              onChange={(e) => setInterestRegion(e.target.value)}
              placeholder="예: 성수, 연남, 부산 전포"
            />
          </label>
          <label>
            {"예정 업종 "}
            <span>선택</span>
            <input
              value={plannedBusiness}
              onChange={(e) => setPlannedBusiness(e.target.value)}
              placeholder="예: 카페, 미용실"
            />
          </label>
          <button className="red-button submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "등록 중..." : "관심지역 매물 정보 받아보기"}
          </button>
          <p className={`form-message ${status}`} aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
};
export default InterestFormSection;
