export const APPLICANT_EVENT = "wolse-applicant";

export const APPLICANT_TYPES = [
  { id: "broker", label: "공인중개사" },
  { id: "owner", label: "임대인" },
  { id: "developer", label: "시행사·분양대행사" },
] as const;

export type ApplicantType = (typeof APPLICANT_TYPES)[number]["id"];

export function isApplicantType(value: string | null): value is ApplicantType {
  return APPLICANT_TYPES.some((item) => item.id === value);
}

export function openApply(type: ApplicantType) {
  const url = new URL(window.location.href);
  url.searchParams.set("type", type);
  url.hash = "apply";
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new CustomEvent(APPLICANT_EVENT, { detail: type }));
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
}
