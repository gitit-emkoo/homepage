/** 예시 기준 시세와 계약 기간. 비교표·계산 테이블이 함께 참조한다. */
export const MARKET_RENT = 2_000_000;
export const CONTRACT_MONTHS = 24;

export type RentPlan = {
  id: "A" | "B" | "C";
  name: string;
  /** 시세 대비 기본료 비율 */
  baseRatio: number;
  /** 매출 연동률 */
  linkRate: number;
};

export const RENT_PLANS: RentPlan[] = [
  { id: "A", name: "안정형", baseRatio: 0.7, linkRate: 0.05 },
  { id: "B", name: "균형형", baseRatio: 0.5, linkRate: 0.07 }, // TODO: 7% vs 7.5% 최종 확인
  { id: "C", name: "성장형", baseRatio: 0.3, linkRate: 0.11 },
];

export const STABLE_PLAN = RENT_PLANS[0];

/** 안정형 24개월 매출 가정 */
export const STABLE_SALES = [
  { label: "1~6개월", months: 6, sales: 5_000_000 },
  { label: "7~12개월", months: 6, sales: 10_000_000 },
  { label: "13~24개월", months: 12, sales: 15_000_000 },
];

export function planAmounts(plan: RentPlan, market = MARKET_RENT) {
  const base = Math.round(market * plan.baseRatio);
  const floor = base;
  const cap = 2 * market - base;
  return { base, floor, cap, linkRate: plan.linkRate };
}

export function monthlyRent(sales: number, plan: RentPlan, market = MARKET_RENT) {
  const { base, floor, cap, linkRate } = planAmounts(plan, market);
  return Math.min(cap, Math.max(floor, base + sales * linkRate));
}

export function stableScenario() {
  const months = STABLE_SALES.map((row) => ({
    ...row,
    rent: monthlyRent(row.sales, STABLE_PLAN),
  }));
  const total = months.reduce((sum, row) => sum + row.rent * row.months, 0);
  const floorTotal = planAmounts(STABLE_PLAN).floor * CONTRACT_MONTHS;
  return { months, total, floorTotal };
}

export function vacancyTotal(emptyMonths: number) {
  return MARKET_RENT * (CONTRACT_MONTHS - emptyMonths);
}

function withComma(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatMan(won: number) {
  const man = won / 10_000;
  const text = Number.isInteger(man) ? withComma(man) : withComma(Math.round(man * 10) / 10);
  return `${text}만 원`;
}

export function formatPercent(rate: number) {
  return `${Math.round(rate * 1000) / 10}%`.replace(/\.0%$/, "%");
}
