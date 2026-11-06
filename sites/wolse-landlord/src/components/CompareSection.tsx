"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { CONTRACT_MONTHS, MARKET_RENT, STABLE_PLAN, formatMan, formatPercent, planAmounts, stableScenario, vacancyTotal } from "@/lib/rent";

const POINTS = [
  ["바로 계약", "공실 기간을 줄여 수입이 즉시 발생"],
  ["바닥이 있는 구조", "매출이 적어도 기본료는 보장"],
  ["업사이드", "장사가 잘되면 시세 이상까지 받을 수 있음"],
];

const CompareSection = () => {
  const seen = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stable = planAmounts(STABLE_PLAN);
  const scenario = stableScenario();
  const general = vacancyTotal(6);
  const rentFree = vacancyTotal(3);
  const basis = scenario.months
    .map((row) => `${formatMan(row.rent).replace(" 원", "")}×${row.months}`)
    .join(" + ");
  const salesText = scenario.months.map((row) => `${row.label} 월 ${formatMan(row.sales).replace(" 원", "")}`).join(" → ");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || seen.current) return;
        seen.current = true;
        track("compare_view");
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const rows = [
    {
      label: "조건",
      general: `6개월 공실 후 월 ${formatMan(MARKET_RENT)}`,
      rentFree: `3개월 무상 후 월 ${formatMan(MARKET_RENT)}`,
      stable: `기본료 ${formatMan(stable.base)} + 매출 ${formatPercent(stable.linkRate)} (상한 ${formatMan(stable.cap)})`,
    },
    {
      label: `${CONTRACT_MONTHS}개월 총수입`,
      general: formatMan(general),
      rentFree: formatMan(rentFree),
      stable: `약 ${formatMan(scenario.total)}`,
    },
    {
      label: "최저 보장",
      general: "–",
      rentFree: `${formatMan(rentFree)}(상승 없음)`,
      stable: `${formatMan(scenario.floorTotal)}(기본료 바닥)`,
    },
    {
      label: "성장 시",
      general: "고정",
      rentFree: "고정",
      stable: `매출 따라 상승(월 최대 ${formatMan(stable.cap)})`,
    },
  ];

  return (
    <section className="section compare" id="compare" ref={sectionRef}>
      <div className="section-heading centered">
        <span className="kicker">RENT-FREE VS WOLSE</span>
        <p className="compare-eyebrow">임대인 설득은 이 표 하나로</p>
        <h2>
          렌트프리는 깎아주면 끝.
          <br />
          월세스위치는 장사가 잘되면 함께 오릅니다.
        </h2>
      </div>
      <p className="compare-basis">예시 기준: 주변 시세 월 {formatMan(MARKET_RENT)}, 계약기간 {CONTRACT_MONTHS}개월</p>
      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>공실 6개월 후 일반계약</th>
              <th>렌트프리 3개월</th>
              <th>월세스위치 안정형</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                <td>{row.general}</td>
                <td>{row.rentFree}</td>
                <td>{row.stable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="compare-cards">
        {rows.map((row) => (
          <article key={row.label} className="compare-card">
            <h3>{row.label}</h3>
            <p>
              <b>공실 6개월 후 일반계약</b>
              <span>{row.general}</span>
            </p>
            <p>
              <b>렌트프리 3개월</b>
              <span>{row.rentFree}</span>
            </p>
            <p>
              <b>월세스위치 안정형</b>
              <span>{row.stable}</span>
            </p>
          </article>
        ))}
      </div>
      <p className="compare-note">임차인 매출 가정: {salesText} (월 {basis})</p>
      <p className="compare-disclaimer">
        위 수치는 이해를 돕기 위한 예시이며, 실제 임대료는 임차인 매출에 따라 기본료(하한)와 상한 사이에서 달라집니다.
      </p>
      <ul className="compare-points">
        {POINTS.map(([title, text]) => (
          <li key={title}>
            <b>{title}</b>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CompareSection;
