"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { APPLICANT_EVENT, APPLICANT_TYPES, isApplicantType, type ApplicantType } from "@/lib/applicant";
import { track } from "@/lib/analytics";
import { FORM_SUBJECT, WEB3FORMS_ACCESS_KEY } from "@/lib/site";
import BrokerFaq from "./BrokerFaq";

const VACANCY_COUNTS = ["0개", "1~2개", "3~5개", "6~10개", "10개 이상"];
const VACANCY_AGES = ["3개월 미만", "3~6개월", "6~12개월", "12개월 이상"];

type FormState = {
  applicantType: ApplicantType;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  region: string;
  vacancyCount: string;
  vacancyAge: string;
  message: string;
  privacy: boolean;
};

const EMPTY_FORM: FormState = {
  applicantType: "broker",
  name: "",
  businessName: "",
  phone: "",
  email: "",
  region: "",
  vacancyCount: "",
  vacancyAge: "",
  message: "",
  privacy: false,
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function businessLabel(type: ApplicantType) {
  if (type === "owner") return "건물명(선택)";
  if (type === "developer") return "회사명*";
  return "중개사무소명*";
}

function submitLabel(type: ApplicantType) {
  if (type === "owner") return "매물 등록 상담 신청";
  if (type === "developer") return "단지 단위 상담 신청";
  return "초기 파트너 신청하기";
}

const PartnerSection = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (isApplicantType(type)) setForm((current) => ({ ...current, applicantType: type }));
    const onType = (event: Event) => {
      const next = (event as CustomEvent<ApplicantType>).detail;
      if (isApplicantType(next)) setForm((current) => ({ ...current, applicantType: next }));
    };
    window.addEventListener(APPLICANT_EVENT, onType);
    return () => window.removeEventListener(APPLICANT_EVENT, onType);
  }, []);

  const markStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start");
  };

  const change = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    markStart();
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, privacy: (e.target as HTMLInputElement).checked });
      return;
    }
    if (name === "phone") {
      setForm({ ...form, phone: formatPhone(value) });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^010-\d{4}-\d{4}$/.test(form.phone)) {
      setError("연락처는 010-0000-0000 형식으로 입력해 주세요.");
      setState("error");
      return;
    }
    if (!form.privacy) {
      setError("개인정보 수집·이용에 동의해 주세요.");
      setState("error");
      return;
    }
    setState("loading");
    setError("");
    const params = new URLSearchParams(window.location.search);
    const typeLabel = APPLICANT_TYPES.find((item) => item.id === form.applicantType)?.label ?? form.applicantType;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `${FORM_SUBJECT} · ${typeLabel}`,
          from_name: "월세스위치 홈페이지",
          신청자유형: typeLabel,
          담당자명: form.name,
          상호: form.businessName,
          연락처: form.phone,
          이메일: form.email,
          활동지역: form.region,
          공실매물수: form.vacancyCount,
          가장오래된공실: form.vacancyAge,
          남기실말씀: form.message,
          개인정보동의: "동의",
          utm_source: params.get("utm_source") ?? "",
          utm_medium: params.get("utm_medium") ?? "",
          utm_campaign: params.get("utm_campaign") ?? "",
          referrer: document.referrer,
          제출시각: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "신청을 처리하지 못했습니다.");
      track("form_submit", { applicant_type: form.applicantType, vacancy_count: form.vacancyCount });
      setState("success");
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? `${err.message} 잠시 후 다시 시도해 주세요.` : "신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  };

  const businessRequired = form.applicantType !== "owner";

  return (
    <>
      <section className="partner partner-offer" id="partner">
        <div className="partner-copy">
          <span className="kicker inverse">EARLY PARTNER PROGRAM</span>
          <h2>30곳 한정 초기 파트너 평생 혜택</h2>
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
          <p className="partner-extra">초기 파트너 기간에는 전담 매니저가 계약 조건 설계와 매월 정산 검수를 함께합니다.</p>
        </div>
      </section>
      <BrokerFaq />
      <section className="partner partner-apply" id="apply">
        <form className="apply-form" onSubmit={submit}>
          <div className="form-top">
            <div>
              <span className="form-eyebrow">PARTNER APPLICATION</span>
              <h3>상담 신청</h3>
            </div>
            <span className="required">* 필수 입력</span>
          </div>
          {state === "success" ? (
            <div className="success-box">
              <strong>신청이 접수되었습니다.</strong>
              <p>영업일 기준 1일 이내에 연락드리겠습니다.</p>
            </div>
          ) : (
            <>
              <fieldset className="type-field">
                <legend>신청자 유형*</legend>
                <div className="type-options">
                  {APPLICANT_TYPES.map((item) => (
                    <label key={item.id}>
                      <input
                        type="radio"
                        name="applicantType"
                        value={item.id}
                        checked={form.applicantType === item.id}
                        onChange={change}
                        required
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="form-grid">
                <label>
                  담당자명*
                  <input name="name" value={form.name} onChange={change} required placeholder="성함을 입력해 주세요" />
                </label>
                <label>
                  {businessLabel(form.applicantType)}
                  <input
                    name="businessName"
                    value={form.businessName}
                    onChange={change}
                    required={businessRequired}
                    placeholder={form.applicantType === "owner" ? "건물명을 입력해 주세요" : "상호를 입력해 주세요"}
                  />
                </label>
                <label>
                  연락처*
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={change}
                    required
                    inputMode="numeric"
                    pattern="010-[0-9]{4}-[0-9]{4}"
                    placeholder="010-0000-0000"
                  />
                </label>
                <label>
                  이메일
                  <input type="email" name="email" value={form.email} onChange={change} placeholder="example@email.com" />
                </label>
                <label>
                  활동·보유 지역*
                  <input name="region" value={form.region} onChange={change} required placeholder="예: 화성시 동탄2동" />
                </label>
                <label>
                  현재 보유·관리 중인 공실 매물 수*
                  <select name="vacancyCount" value={form.vacancyCount} onChange={change} required>
                    <option value="">선택해 주세요</option>
                    {VACANCY_COUNTS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="full-label">
                가장 오래된 공실 기간
                <select name="vacancyAge" value={form.vacancyAge} onChange={change}>
                  <option value="">선택해 주세요</option>
                  {VACANCY_AGES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="full-label">
                남기실 말씀
                <textarea name="message" value={form.message} onChange={change} placeholder="궁금한 점이나 상담 희망 내용을 남겨 주세요." />
              </label>
              <label className="privacy-check">
                <input type="checkbox" name="privacy" checked={form.privacy} onChange={change} required />
                <span>
                  개인정보 수집·이용에 동의합니다.*{" "}
                  <button type="button" onClick={() => setPrivacyOpen((open) => !open)}>
                    보기
                  </button>
                </span>
              </label>
              {privacyOpen && (
                <div className="privacy-detail">
                  <p>수집항목: 이름, 상호, 연락처, 이메일, 지역, 매물 정보</p>
                  <p>목적: 파트너 상담 및 서비스 안내</p>
                  <p>보유기간: 상담 종료 후 1년 또는 동의 철회 시까지</p>
                  <p>동의하지 않을 권리가 있으며, 거부 시 상담이 불가합니다.</p>
                </div>
              )}
              {state === "error" && <p className="form-error">{error}</p>}
              <button className="btn submit-btn" disabled={state === "loading"}>
                {state === "loading" ? "신청 접수 중..." : submitLabel(form.applicantType)} <span>→</span>
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default PartnerSection;
