"use client";

import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from "react";
import { useParticipantCount } from "@/lib/useParticipantCount";
const PARTICIPANT_COUNT_KEY = "badaya-business-health-participant-count";
const PARTICIPANT_COUNT_BASE = 13072;
const BADAYA_ANDROID_URL = "https://play.google.com/store/apps/details?id=com.app.badayaa&hl=ko";
const BADAYA_IOS_URL =
  "https://apps.apple.com/kr/app/%EB%B0%94%EB%8B%A4%EC%95%BC-%EB%A7%9E%EC%B6%A4-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EC%8B%A0%EC%B2%AD/id6769259830";
const BADAYA_IMAGE_URL = "/images/badaya-gom.png";
const ANALYSIS_APP_IMAGE_URL = "/images/badaya-app.png";
const ANALYSIS_DURATION = 8e3;
const ANALYSIS_STATUS_LABELS = ["동종업계 평균 대비 분석중", "매출과 비용 분석중", "운영 패턴 분석중"];
const INDUSTRY_OPTIONS = [
  "음식점/카페",
  "미용/뷰티",
  "소매/잡화",
  "온라인 쇼핑몰",
  "학원/교육",
  "전문서비스",
  "제조/공방",
  "스타트업/IT서비스",
];
const PERIOD_OPTIONS = ["6개월 미만", "6개월~1년", "1년~3년", "3년 이상"];
type Benchmark = Record<"rent" | "payroll" | "material" | "marketing" | "hours" | "surplus", number[]>;
const benchmarks: Record<string, Benchmark> = {
  "음식점/카페": {
    rent: [8, 12, 18],
    payroll: [18, 28, 38],
    material: [30, 40, 50],
    marketing: [1, 5],
    hours: [220, 280],
    surplus: [18, 10, 3],
  },
  "미용/뷰티": {
    rent: [10, 15, 22],
    payroll: [25, 35, 45],
    material: [8, 15, 25],
    marketing: [1, 6],
    hours: [190, 250],
    surplus: [25, 15, 7],
  },
  "소매/잡화": {
    rent: [8, 13, 20],
    payroll: [10, 18, 28],
    material: [50, 65, 75],
    marketing: [1, 5],
    hours: [200, 270],
    surplus: [15, 8, 2],
  },
  "온라인 쇼핑몰": {
    rent: [2, 5, 10],
    payroll: [8, 15, 25],
    material: [45, 60, 75],
    marketing: [3, 15],
    hours: [180, 240],
    surplus: [15, 8, 2],
  },
  "학원/교육": {
    rent: [10, 15, 22],
    payroll: [30, 45, 60],
    material: [3, 8, 15],
    marketing: [2, 8],
    hours: [160, 230],
    surplus: [25, 15, 8],
  },
  전문서비스: {
    rent: [6, 10, 16],
    payroll: [20, 35, 50],
    material: [5, 12, 20],
    marketing: [2, 8],
    hours: [170, 240],
    surplus: [30, 18, 8],
  },
  "제조/공방": {
    rent: [5, 10, 16],
    payroll: [18, 30, 45],
    material: [35, 50, 65],
    marketing: [1, 6],
    hours: [200, 270],
    surplus: [18, 10, 4],
  },
  "스타트업/IT서비스": {
    rent: [2, 6, 12],
    payroll: [40, 60, 80],
    material: [0, 5, 15],
    marketing: [3, 20],
    hours: [180, 260],
    surplus: [10, 0, -10],
  },
};
const resultTypes = [
  {
    min: 90,
    typeName: "안정적 운영 구조 중",
    percentText: "동종업계 기준 상위 3% 수준입니다.",
    description:
      "입력한 사업 구조는 비용 부담과 운영 효율이 비교적 안정적인 편입니다. 이제는 더 많이 일하기보다 반복 업무를 줄이고, 마케팅 효율과 성장 기회를 더 정교하게 관리하는 것이 중요합니다.",
  },
  {
    min: 82,
    typeName: "균형 잡힌 관리 중",
    percentText: "동종업계 기준 상위 10% 수준입니다.",
    description:
      "사업의 주요 비용과 운영 흐름이 크게 무너지지 않은 상태입니다. 다만 한두 가지 항목에서 숨은 부담이 생길 수 있으니, 가장 낮게 나온 영역을 먼저 점검하면 더 안정적인 구조로 갈 수 있습니다.",
  },
  {
    min: 70,
    typeName: "숨은 부담 관찰 중",
    percentText: "동종업계 기준 상위 30% 수준입니다.",
    description:
      "사업은 굴러가고 있지만 임차료, 인건비, 마케팅, 운영시간 중 일부에서 부담이 쌓일 수 있습니다. 매출을 더 올리는 것만큼 새는 비용과 시간을 줄이는 것도 중요합니다.",
  },
  {
    min: 58,
    typeName: "손익구조 점검 중",
    percentText: "동종업계 기준 평균권 수준입니다.",
    description:
      "현재 입력값 기준으로 보면 여러 영역에서 비용 부담이나 운영 비효율이 생길 가능성이 있습니다. 바로 매출 확대만 고민하기보다 고정비, 인건비, 운영시간, 마케팅 효율을 순서대로 점검해야 합니다.",
  },
  {
    min: 0,
    typeName: "구조 개선 진행 중",
    percentText: "동종업계 기준 관리가 필요한 상태입니다.",
    description:
      "현재 사업 구조는 매출이 발생하더라도 남는 돈과 대표 시간이 부족해질 가능성이 있습니다. 모든 것을 한 번에 바꾸기보다 가장 부담이 큰 항목 하나부터 줄이는 방식으로 접근하는 것이 좋습니다.",
  },
];
const industryComments: Record<string, string> = {
  "음식점/카페":
    "음식점/카페는 임차료, 재료비, 인건비가 동시에 부담되는 경우가 많습니다. 현재 입력값에서는 세 가지 비용 중 어떤 항목이 가장 크게 매출을 압박하는지 먼저 보는 것이 중요합니다.",
  "미용/뷰티":
    "미용/뷰티 업종은 대표의 예약시간, 재방문, 객단가가 중요합니다. 매출뿐 아니라 운영시간 대비 매출과 고객 재방문 구조를 함께 확인해야 합니다.",
  "소매/잡화":
    "소매/잡화 업종은 재고와 매입비 부담이 커질 수 있습니다. 매출이 있어도 매입비와 재고 회전이 맞지 않으면 남는 돈이 줄어들 수 있습니다.",
  "온라인 쇼핑몰":
    "온라인 쇼핑몰은 광고비, 매입비, 플랫폼 수수료, 배송/CS 부담이 중요합니다. 마케팅비를 쓰고 있다면 어떤 채널이 실제 구매로 이어지는지 반드시 확인해야 합니다.",
  "학원/교육":
    "학원/교육 업종은 인건비, 강의 시간, 정원 대비 수강생 수가 중요합니다. 운영시간이 길어도 수강생 확보와 재등록이 약하면 효율이 떨어질 수 있습니다.",
  전문서비스:
    "전문서비스 업종은 대표 시간당 매출과 상담 전환율이 중요합니다. 대표가 직접 투입되는 시간이 많다면 상담/제안/계약 전환 과정을 함께 봐야 합니다.",
  "제조/공방":
    "제조/공방 업종은 재료비, 작업시간, 설비, 납품처가 중요합니다. 매출이 있어도 제작시간과 원가가 높으면 남는 돈이 줄어들 수 있습니다.",
  "스타트업/IT서비스":
    "스타트업/IT서비스는 인건비, 개발기간, 매출화 속도, 외부 지원 활용이 중요합니다. 당장 매출보다 버틸 수 있는 기간과 지원사업 활용 여부를 함께 봐야 합니다.",
};
const firstCheckPriority = ["surplus", "rent", "payroll", "material", "marketing", "hours"];
const firstCheckMap: Record<string, { title: string; body: string }> = {
  surplus: {
    title: "가장 먼저 점검할 것: 남는 돈 구조",
    body: "매출이 있어도 남는 돈이 부족하면 사업은 계속 바빠지기만 할 수 있습니다.\n오늘 바로 월 매출에서 임차료, 인건비, 매입비, 마케팅비를 뺀 금액을 확인해보세요.\n그다음 가장 큰 비용 항목 하나를 골라 이번 달에 줄일 수 있는 방법을 정해야 합니다.\n할인보다 먼저 원가, 운영시간, 광고비, 고정비를 확인하는 것이 좋습니다.",
  },
  rent: {
    title: "가장 먼저 점검할 것: 임차료 부담",
    body: "임차료는 매달 고정으로 빠져나가기 때문에 매출이 흔들릴 때 가장 먼저 부담으로 다가옵니다.\n현재 임차료가 매출의 몇 퍼센트인지 확인하고, 임차료를 안정적으로 감당하려면 월 매출이 얼마 이상이어야 하는지 역산해보세요.\n당장 이전이 어렵다면 객단가 상승, 예약제, 온라인 판매, 비수기 프로모션처럼 공간 효율을 높이는 방법을 먼저 검토해보는 것이 좋습니다.",
  },
  payroll: {
    title: "가장 먼저 점검할 것: 인건비 부담",
    body: "인건비는 줄이는 것보다 효율을 보는 것이 먼저입니다.\n직원이 투입되는 시간대별 매출을 나눠보고, 바쁜 시간대와 한가한 시간대의 업무를 구분해보세요.\n매출이 낮은 시간대에는 근무시간 조정, 예약 유도, 단순업무 자동화부터 검토하는 것이 좋습니다.",
  },
  material: {
    title: "가장 먼저 점검할 것: 원가/매입비 부담",
    body: "많이 팔아도 원가가 높으면 남는 돈은 줄어듭니다.\n가장 많이 팔리는 상품 3개를 골라 판매가, 매입가, 포장비, 수수료를 다시 계산해보세요.\n원가율이 높은 상품은 가격 조정, 구성 변경, 세트 판매, 대체 매입처 확인이 필요합니다.",
  },
  marketing: {
    title: "가장 먼저 점검할 것: 마케팅 효율",
    body: "마케팅비가 너무 적으면 고객에게 보일 기회를 놓치고, 너무 많으면 비용이 새는 구조가 됩니다.\n이번 달부터 신규 고객에게 “어디서 보고 오셨나요?”를 꼭 물어보세요.\n인스타그램, 블로그, 네이버 플레이스, 지인소개, 광고 중 실제 방문이나 구매로 이어진 채널을 기록하면 다음 달 광고비를 어디에 써야 할지 보이기 시작합니다.",
  },
  hours: {
    title: "가장 먼저 점검할 것: 대표 시간 효율",
    body: "대표가 오래 일한다고 사업이 더 건강해지는 것은 아닙니다.\n월 운영시간과 시간당 매출을 확인해보세요.\n매출이 낮은 시간대에는 무작정 영업을 유지하기보다 예약 관리, 고객 후기 확보, 콘텐츠 제작, 재고 정리처럼 다음 매출을 만드는 업무를 배치하는 것이 좋습니다.",
  },
};
const baseChecklist = [
  "매달 반복되는 고정비 표시하기",
  "가장 많이 팔리는 상품 3개의 원가 다시 계산하기",
  "신규 고객에게 “어디서 보고 오셨나요?” 물어보기",
  "영업시간별 매출 차이 확인하기",
  "사업자 서류 한 폴더에 모아두기",
  "받을 수 있는 지원혜택 확인하기",
];
const checklistPriorityByReview: Record<string, string> = {
  surplus: "매달 반복되는 고정비 표시하기",
  rent: "매달 반복되는 고정비 표시하기",
  payroll: "영업시간별 매출 차이 확인하기",
  material: "가장 많이 팔리는 상품 3개의 원가 다시 계산하기",
  marketing: "신규 고객에게 “어디서 보고 오셨나요?” 물어보기",
  hours: "영업시간별 매출 차이 확인하기",
};
const initialForm = {
  industry: "",
  region: "",
  period: "",
  revenue: "",
  rent: "",
  employees: "",
  payroll: "",
  material: "",
  hoursPerDay: "",
  daysPerWeek: "",
  marketing: "",
};
type Form = typeof initialForm;
type FormKey = keyof Form;
type FieldOptions = {
  type?: string;
  placeholder?: string;
  help?: string;
  min?: number;
  max?: number;
  step?: string;
  fieldClassName?: string;
  inputClassName?: string;
};
const pageStyles = `
  .health-page {
    min-height: 100vh;
    background: #ffffff;
    color: #13233d;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    word-break: keep-all;
  }
  .health-page * {
    box-sizing: border-box;
    word-break: keep-all;
  }
  .health-shell {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 12px 16px 72px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(41, 95, 255, 0.08);
    color: #295fff;
    font-weight: 700;
  }
  .hero-card,
  .surface-card {
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
  .hero-card {
    padding: 28px 22px;
    margin-bottom: 18px;
    background: #ffffff;
  }
  .hero-title {
    margin: 10px 0 10px;
    font-size: 29px;
    line-height: 1.3;
    letter-spacing: -0.03em;
    color: #295fff;
    font-weight: 800;
    text-align: center;
  }
  .hero-subtitle {
    margin: 0;
    font-size: 18px;
    line-height: 1.5;
    color: #295fff;
    font-weight: 800;
  }
  .hero-body {
    margin: 0;
    font-size: 16px;
    line-height: 1.8;
    color: #3f4e6c;
    text-align: center;
  }
  .hero-visual {
    margin-top: 22px;
    border-radius: 24px;
    overflow: hidden;
    background: #f5f7fb;
  }
  .hero-image {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
  .note-box {
    margin-top: 18px;
    padding: 16px 18px;
    border-radius: 20px;
    background: #f4f1eb;
    border: none;
    color: #53617b;
    font-size: 14px;
    line-height: 1.7;
    white-space: pre-line;
  }
  .steps-grid,
  .summary-grid,
  .metrics-grid,
  .review-grid,
  .input-grid,
  .highlight-grid,
  .cta-grid {
    display: grid;
    gap: 14px;
  }
  .steps-grid,
  .highlight-grid,
  .cta-grid,
  .summary-grid,
  .metrics-grid,
  .review-grid,
  .input-grid {
    grid-template-columns: 1fr;
  }
  .mini-card {
    padding: 18px;
    border-radius: 22px;
    background: #ffffff;
    border: none;
    box-shadow: 0 10px 24px rgba(20, 24, 34, 0.04);
  }
  .mini-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .mini-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #295fff;
    font-size: 22px;
    font-weight: 900;
    line-height: 1;
    flex-shrink: 0;
  }
  .mini-title {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: #13233d;
  }
  .mini-desc {
    margin: 0;
    color: #52617c;
    font-size: 15px;
    line-height: 1.7;
  }
  .participant-proof {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-top: 22px;
    text-align: center;
  }
  .participant-count {
    color: #2f6fff;
    font-size: 48px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.04em;
  }
  .participant-copy {
    color: #24508c;
    font-size: 16px;
    line-height: 1.4;
    font-weight: 700;
  }
  .button-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 22px;
  }
  .button-row.inline {
    margin-top: 0;
  }
  .primary-btn,
  .secondary-btn,
  .ghost-btn,
  .link-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 54px;
    padding: 14px 18px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    font-weight: 800;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  }
  .primary-btn:hover,
  .secondary-btn:hover,
  .ghost-btn:hover,
  .link-btn:hover {
    transform: translateY(-1px);
  }
  .primary-btn {
    background: #295fff;
    color: #ffffff;
    box-shadow: 0 14px 28px rgba(41, 95, 255, 0.24);
  }
  .secondary-btn {
    background: #eaf1ff;
    color: #295fff;
  }
  .ghost-btn {
    background: transparent;
    color: #587099;
    border: 1px solid #d8e4ff;
  }
  .link-btn {
    background: #19a7ff;
    color: #ffffff;
    box-shadow: 0 14px 28px rgba(25, 167, 255, 0.22);
  }
  .surface-card {
    padding: 22px 18px;
    margin-bottom: 16px;
  }
  .section-title {
    margin: 0 0 6px;
    font-size: 24px;
    line-height: 1.3;
    letter-spacing: -0.03em;
  }
  .section-copy {
    margin: 0;
    color: #54627d;
    line-height: 1.7;
    font-size: 15px;
  }
  .section-head {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
  }
  .section-kicker {
    color: #295fff;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .field-group.wide-field {
    width: 100%;
  }
  .field-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 15px;
    font-weight: 800;
    color: #1a2944;
  }
  .field-help {
    margin: -2px 0 0;
    color: #62708a;
    font-size: 13px;
    line-height: 1.6;
  }
  .field-input,
  .field-select {
    width: 100%;
    min-height: 43px;
    border-radius: 16px;
    border: 1px solid #d6e2ff;
    background: #fbfcff;
    padding: 10px 16px;
    font-size: 16px;
    color: #13233d;
    outline: none;
  }
  .field-input.wide-compact-control,
  .field-select.wide-compact-control {
    min-height: 43px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .field-input:focus,
  .field-select:focus {
    border-color: #295fff;
    box-shadow: 0 0 0 4px rgba(41, 95, 255, 0.12);
    background: #ffffff;
  }
  .error-text {
    margin: 0;
    color: #db3154;
    font-size: 13px;
    line-height: 1.5;
    font-weight: 700;
  }
  .error-banner {
    margin-bottom: 16px;
    padding: 14px 16px;
    border-radius: 18px;
    background: #fff3f5;
    color: #ca3351;
    border: 1px solid #ffd3dc;
    font-size: 14px;
    line-height: 1.6;
    font-weight: 700;
  }
  .result-hero {
    display: grid;
    gap: 16px;
  }
  .score-box {
    padding: 22px;
    border-radius: 24px;
    background: linear-gradient(180deg, #295fff 0%, #1f4bdd 100%);
    color: #ffffff;
  }
  .score-label {
    margin: 0 0 8px;
    font-size: 14px;
    opacity: 0.9;
  }
  .score-value {
    margin: 0;
    font-size: 40px;
    line-height: 1.1;
    letter-spacing: -0.04em;
    font-weight: 900;
  }
  .result-type {
    margin: 10px 0 6px;
    font-size: 26px;
    line-height: 1.3;
    letter-spacing: -0.03em;
  }
  .result-subtext {
    margin: 0;
    line-height: 1.75;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.88);
  }
  .summary-item,
  .metric-card,
  .review-card,
  .check-card,
  .cta-card {
    padding: 18px;
    border-radius: 22px;
    background: #ffffff;
    border: none;
    box-shadow: 0 10px 24px rgba(20, 24, 34, 0.04);
  }
  .summary-item {
    background: #f7faff;
  }
  .summary-label {
    margin: 0 0 8px;
    color: #6880a6;
    font-size: 13px;
    font-weight: 700;
  }
  .summary-value {
    margin: 0;
    color: #17253f;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.5;
  }
  .metric-top,
  .review-top,
  .cta-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .metric-title,
  .review-title,
  .cta-title {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: #13233d;
    line-height: 1.4;
  }
  .metric-value {
    margin: 12px 0 6px;
    font-size: 30px;
    line-height: 1.2;
    letter-spacing: -0.04em;
    font-weight: 900;
    color: #13233d;
  }
  .metric-helper,
  .review-ref,
  .check-body,
  .cta-body {
    margin: 0;
    color: #5a6884;
    font-size: 14px;
    line-height: 1.7;
  }
  .cta-body {
    white-space: pre-line;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border-radius: 0;
    font-size: 12px;
    font-weight: 800;
    white-space: nowrap;
    flex-shrink: 0;
    background: transparent;
  }
  .badge.good {
    color: #178655;
  }
  .badge.observe {
    color: #295fff;
  }
  .badge.caution {
    color: #c88200;
  }
  .badge.risk {
    color: #d93657;
  }
  .badge.neutral {
    color: #5f708f;
  }
  .review-body {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.85;
    color: #223350;
  }
  .result-note {
    margin-top: 14px;
    padding: 14px 16px;
    border-radius: 18px;
    background: #f6f8fc;
    color: #5b6882;
    font-size: 14px;
    line-height: 1.7;
  }
  .list-box {
    display: grid;
    gap: 12px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .list-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 14px 16px;
    border-radius: 18px;
    background: #f8fbff;
    border: none;
    color: #243552;
    line-height: 1.7;
    font-size: 15px;
    font-weight: 700;
  }
  .list-index {
    width: 28px;
    height: 28px;
    border-radius: 10px;
    background: #eaf1ff;
    color: #295fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .cta-card {
    background: #f7fbff;
  }
  .cta-visual {
    margin: 22px 0 8px;
    display: flex;
    justify-content: center;
  }
  .cta-visual img {
    display: block;
    width: min(100%, 460px);
    height: auto;
  }
  .cta-body {
    margin-top: 10px;
  }
  .analysis-stage {
    display: grid;
    gap: 16px;
  }
  .analysis-main-card,
  .analysis-promo-card {
    padding: 20px;
    border-radius: 26px;
    border: 1px solid #e4edff;
    background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
    box-shadow: 0 16px 40px rgba(41, 95, 255, 0.08);
    animation: floatCard 3.4s ease-in-out infinite;
  }
  .analysis-main-card {
    animation-delay: -0.4s;
  }
  .analysis-title {
    margin: 0;
    font-size: 30px;
    line-height: 1.3;
    letter-spacing: -0.04em;
    color: #13233d;
  }
  .analysis-copy {
    margin: 10px 0 0;
    color: #5b6a86;
    font-size: 15px;
    line-height: 1.75;
  }
  .analysis-progress-card {
    margin-top: 20px;
    padding: 16px;
    border-radius: 22px;
    background: #ffffff;
    border: 1px solid #e8efff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  .analysis-progress-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }
  .analysis-progress-label {
    margin: 0;
    font-size: 17px;
    font-weight: 800;
    color: #295fff;
  }
  .analysis-progress-value {
    color: #13233d;
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.03em;
  }
  .analysis-progress-track {
    position: relative;
    width: 100%;
    height: 16px;
    overflow: hidden;
    border-radius: 999px;
    background: #dfe9ff;
  }
  .analysis-progress-bar {
    position: relative;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #295fff 0%, #4ea6ff 100%);
    box-shadow: 0 10px 24px rgba(41, 95, 255, 0.28);
    overflow: hidden;
    transition: width 0.18s linear;
  }
  .analysis-progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: -35%;
    width: 35%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(255, 255, 255, 0) 100%);
    animation: progressShine 1.8s linear infinite;
  }
  .analysis-status-list {
    display: grid;
    gap: 10px;
    margin-top: 16px;
  }
  .analysis-status-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 16px;
    background: #f6f9ff;
    border: 1px solid transparent;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .analysis-status-item.active {
    border-color: #cfe0ff;
    background: #edf4ff;
    transform: translateY(-1px);
  }
  .analysis-status-item.done {
    background: #f4f8ff;
  }
  .analysis-status-text {
    color: #31415f;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.55;
  }
  .analysis-status-badge {
    flex-shrink: 0;
    color: #6f7f9c;
    font-size: 12px;
    font-weight: 800;
  }
  .analysis-status-item.active .analysis-status-badge {
    color: #295fff;
  }
  .analysis-status-item.done .analysis-status-badge {
    color: #178655;
  }
  .analysis-promo-image-wrap {
    overflow: hidden;
    border-radius: 22px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(17, 34, 68, 0.06);
  }
  .analysis-promo-image-wrap img {
    display: block;
    width: 100%;
    height: auto;
  }
  .analysis-promo-body {
    margin-top: 18px;
  }
  .analysis-promo-title {
    margin: 0;
    font-size: 22px;
    line-height: 1.4;
    letter-spacing: -0.03em;
    color: #13233d;
  }
  .analysis-promo-copy {
    margin: 10px 0 0;
    color: #55637e;
    font-size: 15px;
    line-height: 1.8;
  }
  .footer-copy {
    margin-top: 16px;
    color: #6e7b93;
    font-size: 13px;
    line-height: 1.6;
    text-align: center;
  }
  @keyframes progressShine {
    0% {
      left: -35%;
    }
    100% {
      left: 115%;
    }
  }
  @keyframes floatCard {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 22px;
    transform: translateX(-50%);
    min-width: 220px;
    max-width: calc(100vw - 32px);
    padding: 14px 18px;
    border-radius: 16px;
    background: rgba(19, 35, 61, 0.92);
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    box-shadow: 0 16px 30px rgba(8, 18, 38, 0.24);
    z-index: 50;
  }
  @media (min-width: 768px) {
    .health-shell {
      padding: 16px 24px 88px;
    }
    .hero-card,
    .surface-card {
      padding: 28px;
    }
    .hero-card {
      padding: 34px;
    }
    .hero-title {
      font-size: 29px;
      max-width: 760px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-body {
      font-size: 17px;
      max-width: 760px;
      margin-left: auto;
      margin-right: auto;
    }
    .steps-grid,
    .summary-grid,
    .metrics-grid,
    .highlight-grid,
    .cta-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .input-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .field-group.wide-field {
      width: 100%;
    }
    .review-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .participant-count {
      font-size: 56px;
    }
    .participant-copy {
      font-size: 17px;
    }
    .button-row {
      flex-direction: row;
    }
    .primary-btn,
    .secondary-btn,
    .ghost-btn,
    .link-btn {
      width: auto;
      min-width: 180px;
    }
    .result-hero {
      grid-template-columns: 1.1fr 1fr;
      align-items: stretch;
    }
    .analysis-stage {
      grid-template-columns: 1.1fr 0.9fr;
      align-items: start;
    }
    .analysis-main-card,
    .analysis-promo-card {
      padding: 24px;
    }
    .analysis-title {
      font-size: 34px;
    }
    .analysis-status-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .summary-grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .metrics-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .review-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
const parseOptionalNumber = (value: string) => {
  if (value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
const formatDecimal = (value: number) =>
  new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
const formatMoney = (value: number) =>
  new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(value);
const formatPercent = (value: number) => `${formatDecimal(value)}%`;
const formatHours = (value: number) => `${formatDecimal(value)}시간`;
const formatManwon = (value: number) => `${formatMoney(value)}만원`;
const formatHourlySales = (value: number) => `${formatDecimal(value)}만원/시간`;
const evaluateCostRatio = (key: string, ratio: number, thresholds: number[]) => {
  const [good, observe, caution] = thresholds;
  if (ratio <= good) {
    return {
      key,
      score: 16,
      label: "양호",
      tone: "good",
      referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이하 / 관찰 ${formatPercent(observe)} 이하 / 주의 ${formatPercent(caution)} 이하`,
    };
  }
  if (ratio <= observe) {
    return {
      key,
      score: 13,
      label: "관찰",
      tone: "observe",
      referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이하 / 관찰 ${formatPercent(observe)} 이하 / 주의 ${formatPercent(caution)} 이하`,
    };
  }
  if (ratio <= caution) {
    return {
      key,
      score: 10,
      label: "주의",
      tone: "caution",
      referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이하 / 관찰 ${formatPercent(observe)} 이하 / 주의 ${formatPercent(caution)} 이하`,
    };
  }
  return {
    key,
    score: 7,
    label: "위험",
    tone: "risk",
    referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이하 / 관찰 ${formatPercent(observe)} 이하 / 주의 ${formatPercent(caution)} 이하`,
  };
};
const evaluateSurplusRate = (ratio: number, thresholds: number[]) => {
  const [good, observe, caution] = thresholds;
  if (ratio >= good) {
    return {
      key: "surplus",
      score: 16,
      label: "양호",
      tone: "good",
      referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이상 / 관찰 ${formatPercent(observe)} 이상 / 주의 ${formatPercent(caution)} 이상`,
    };
  }
  if (ratio >= observe) {
    return {
      key: "surplus",
      score: 13,
      label: "관찰",
      tone: "observe",
      referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이상 / 관찰 ${formatPercent(observe)} 이상 / 주의 ${formatPercent(caution)} 이상`,
    };
  }
  if (ratio >= caution) {
    return {
      key: "surplus",
      score: 10,
      label: "주의",
      tone: "caution",
      referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이상 / 관찰 ${formatPercent(observe)} 이상 / 주의 ${formatPercent(caution)} 이상`,
    };
  }
  return {
    key: "surplus",
    score: 7,
    label: "위험",
    tone: "risk",
    referenceText: `업종 참고 기준 / 양호 ${formatPercent(good)} 이상 / 관찰 ${formatPercent(observe)} 이상 / 주의 ${formatPercent(caution)} 이상`,
  };
};
const evaluateHours = (value: number, thresholds: number[]) => {
  const [fit, high] = thresholds;
  if (value <= fit) {
    return {
      key: "hours",
      score: 16,
      label: "양호",
      tone: "good",
      referenceText: `업종 참고 기준 / 적정 ${formatHours(fit)} 이하 / 관찰 ${formatHours(high)} 이하 / 주의 ${formatHours(high + 50)} 이하`,
    };
  }
  if (value <= high) {
    return {
      key: "hours",
      score: 13,
      label: "관찰",
      tone: "observe",
      referenceText: `업종 참고 기준 / 적정 ${formatHours(fit)} 이하 / 관찰 ${formatHours(high)} 이하 / 주의 ${formatHours(high + 50)} 이하`,
    };
  }
  if (value <= high + 50) {
    return {
      key: "hours",
      score: 10,
      label: "주의",
      tone: "caution",
      referenceText: `업종 참고 기준 / 적정 ${formatHours(fit)} 이하 / 관찰 ${formatHours(high)} 이하 / 주의 ${formatHours(high + 50)} 이하`,
    };
  }
  return {
    key: "hours",
    score: 7,
    label: "위험",
    tone: "risk",
    referenceText: `업종 참고 기준 / 적정 ${formatHours(fit)} 이하 / 관찰 ${formatHours(high)} 이하 / 주의 ${formatHours(high + 50)} 이하`,
  };
};
const evaluateMarketing = (ratio: number, thresholds: number[]) => {
  const [low, high] = thresholds;
  const referenceText = `업종 참고 기준 / 권장 ${formatPercent(low)}~${formatPercent(high)}`;
  if (ratio === 0) {
    return {
      key: "marketing",
      score: 7,
      label: "홍보 공백",
      tone: "risk",
      referenceText,
    };
  }
  if (ratio < low) {
    return {
      key: "marketing",
      score: 10,
      label: "투자 부족",
      tone: "caution",
      referenceText,
    };
  }
  if (ratio <= high) {
    return {
      key: "marketing",
      score: 16,
      label: "적정",
      tone: "good",
      referenceText,
    };
  }
  if (ratio <= high * 1.8) {
    return {
      key: "marketing",
      score: 13,
      label: "효율 점검",
      tone: "observe",
      referenceText,
    };
  }
  return {
    key: "marketing",
    score: 7,
    label: "과다 위험",
    tone: "risk",
    referenceText,
  };
};
const evaluateMaterialMissing = () => ({
  key: "material",
  score: 10,
  label: "입력 없음",
  tone: "neutral",
  valueText: "입력 없음",
  referenceText: "원가/매입비 입력 없음 / 이번 결과에서는 참고 점수로 반영했습니다.",
  diagnosis:
    "매입비/재료비를 입력하지 않아 원가 부담을 정확히 보기 어렵습니다. 다음 진단에서는 월 매입비나 재료비를 함께 입력하면 더 의미 있는 결과를 받을 수 있습니다.",
});
const getOverallType = (score: number) =>
  resultTypes.find((item) => score >= item.min) || resultTypes[resultTypes.length - 1];
const getLowestReviewKey = (reviews: Record<string, { score: number }>) => {
  return [...firstCheckPriority].sort((a, b) => {
    const scoreDiff = reviews[a].score - reviews[b].score;
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    return firstCheckPriority.indexOf(a) - firstCheckPriority.indexOf(b);
  })[0];
};
const reorderChecklist = (key: string) => {
  const priorityItem = checklistPriorityByReview[key];
  return [priorityItem, ...baseChecklist.filter((item) => item !== priorityItem)];
};
const buildResult = (form: Form) => {
  const industry = form.industry;
  const benchmark = benchmarks[industry];
  const revenue = Number(form.revenue);
  const rent = Number(form.rent);
  const employees = Number(form.employees);
  const payroll = Number(form.payroll);
  const material = parseOptionalNumber(form.material);
  const hoursPerDay = Number(form.hoursPerDay);
  const daysPerWeek = Number(form.daysPerWeek);
  const marketing = Number(form.marketing);
  const monthlyHours = hoursPerDay * daysPerWeek * 4.345;
  const rentRate = (rent / revenue) * 100;
  const payrollRate = (payroll / revenue) * 100;
  const materialRate = material === null ? null : (material / revenue) * 100;
  const marketingRate = (marketing / revenue) * 100;
  const hourlyRevenue = revenue / monthlyHours;
  const simpleSurplus = revenue - rent - payroll - (material ?? 0) - marketing;
  const simpleSurplusRate = (simpleSurplus / revenue) * 100;
  const rentEvalBase = evaluateCostRatio("rent", rentRate, benchmark.rent);
  const payrollEvalBase = evaluateCostRatio("payroll", payrollRate, benchmark.payroll);
  const hoursEvalBase = evaluateHours(monthlyHours, benchmark.hours);
  const marketingEvalBase = evaluateMarketing(marketingRate, benchmark.marketing);
  const surplusEvalBase = evaluateSurplusRate(simpleSurplusRate, benchmark.surplus);
  const rentTargetRevenue = benchmark.rent[0] === 0 ? revenue : (rent / benchmark.rent[0]) * 100;
  const rentDiagnosisMap: Record<string, string> = {
    양호: "월 임차료는 현재 매출 대비 부담이 낮은 편입니다. 이 상태를 유지한다면 임차료보다 마케팅 효율이나 객단가 개선에 더 집중해도 좋습니다.",
    관찰: "임차료가 아주 위험한 수준은 아니지만 매출이 흔들리면 부담으로 커질 수 있습니다. 다음 달 목표 매출을 임차료 기준으로 역산해보고, 비수기에도 버틸 수 있는지 확인해보세요.",
    주의: "임차료 부담이 높은 편입니다. 현재 임차료를 안정적으로 감당하려면 월 매출을 얼마나 만들어야 하는지 계산해보세요. 임차료를 업종 기준 양호구간까지 낮추려면 필요한 목표 매출을 함께 확인해보는 것이 좋습니다.",
    위험: "임차료가 매출을 강하게 압박하는 구조일 수 있습니다. 가격, 객단가, 운영시간, 상권 노출, 온라인 매출 보완 중 하나를 빠르게 점검해야 합니다. 현재 임차료 기준 목표 매출을 반드시 확인해보세요.",
  };
  const payrollDiagnosisMap: Record<string, string> = {
    양호: "인건비 부담은 비교적 안정적인 편입니다. 이제는 직원 투입 시간이 매출 증가나 대표 시간 절감으로 이어지는지 확인하면 좋습니다.",
    관찰: "인건비가 관리 가능한 수준이지만 시간대별 매출에 따라 부담이 커질 수 있습니다. 바쁜 시간대와 한가한 시간대를 나눠 인력 배치를 확인해보세요.",
    주의: "인건비 부담이 높아질 수 있는 구조입니다. 직원 수를 줄이라는 뜻이 아니라, 직원이 투입되는 시간대가 실제 매출이나 운영 효율로 이어지는지 확인해야 합니다.",
    위험: "인건비가 매출 대비 강한 압박 요인일 수 있습니다. 이번 주 매출을 시간대별로 나누고, 매출이 낮은 시간대의 근무 배치부터 점검해보세요.",
  };
  const materialDiagnosisMap: Record<string, string> = {
    양호: "매입비/재료비 부담은 비교적 안정적인 편입니다. 이 상태라면 원가보다 판매가격, 묶음상품, 재구매율을 더 보완해볼 수 있습니다.",
    관찰: "매입비/재료비가 관리 가능한 수준이지만 조금만 올라가도 남는 돈이 줄어들 수 있습니다. 주요 상품 5개의 원가율을 따로 계산해보세요.",
    주의: "매입비/재료비 부담이 높은 편입니다. 판매량이 많아도 원가가 높으면 남는 돈이 줄어듭니다. 가장 많이 팔리는 상품 3개의 원가와 마진을 다시 계산해보세요.",
    위험: "매입비/재료비가 매출을 크게 압박하고 있을 수 있습니다. 원가율이 높은 상품은 가격 조정, 구성 변경, 대체 매입처 확인이 필요합니다.",
  };
  const hoursDiagnosisMap: Record<string, string> = {
    양호: "운영시간은 과도하지 않은 편입니다. 이제는 시간당 매출을 높이기 위해 객단가, 예약률, 재방문율을 함께 봐야 합니다.",
    관찰: "운영시간이 조금 긴 편일 수 있습니다. 하루 중 실제 매출이 잘 나오는 시간대와 그렇지 않은 시간대를 나눠보세요.",
    주의: "운영시간 부담이 높은 편입니다. 오래 일하는 것과 사업이 잘되는 것은 다릅니다. 시간당 매출을 확인하고 매출이 낮은 시간대에는 콘텐츠 제작, 예약 관리, 고객관리 업무를 배치해보세요.",
    위험: "대표 시간이 많이 투입되는 고강도 구조일 수 있습니다. 하루 업무를 1시간 단위로 적고, 대표가 꼭 해야 하는 일과 맡길 수 있는 일을 분리해보세요.",
  };
  const marketingDiagnosisMap: Record<string, string> = {
    적정: "마케팅 투자율은 참고 기준상 적정 구간에 있습니다. 이제는 얼마를 쓰는지보다 어떤 채널이 실제 문의/방문/구매로 이어지는지 추적해야 합니다.",
    "투자 부족":
      "마케팅비가 낮아 고객 유입 기회를 놓치고 있을 수 있습니다. 큰 광고비를 쓰기보다 네이버 플레이스, 인스타그램, 블로그 중 하나를 골라 2주간 콘텐츠를 꾸준히 올려보세요.",
    "홍보 공백":
      "마케팅비가 0원이면 비용은 아낄 수 있지만 고객에게 보일 기회도 줄어듭니다. 오늘 바로 네이버 플레이스 대표사진, 영업시간, 소개문부터 정리해보세요.",
    "효율 점검":
      "마케팅비를 쓰고 있지만 효율 확인이 필요합니다. 신규 고객에게 “어디서 보고 오셨나요?”를 꼭 물어보고 채널별 유입을 기록해보세요.",
    "과다 위험":
      "마케팅비가 매출 대비 과도할 수 있습니다. 광고를 늘리기보다 문의당 비용, 방문당 비용, 구매당 비용을 계산해 어떤 채널이 실제 매출로 이어지는지 확인하세요.",
  };
  const surplusDiagnosisMap: Record<string, string> = {
    양호: "입력값 기준으로 비용을 제외한 여유가 비교적 있는 편입니다. 다만 실제 순이익은 세금, 수수료, 공과금, 대출이자 등을 반영해야 하므로 별도 확인이 필요합니다.",
    관찰: "입력값 기준으로 남는 구조는 있지만, 비용이 조금만 늘어도 여유가 줄어들 수 있습니다. 다음 달에는 고정비와 변동비를 나눠서 확인해보세요.",
    주의: "입력값 기준으로 남는 돈이 충분하지 않을 수 있습니다. 매출 확대보다 먼저 임차료, 인건비, 매입비, 마케팅비 중 가장 큰 부담 항목을 줄이는 방법을 찾아야 합니다.",
    위험: "입력값 기준으로 남는 돈이 거의 없거나 부족할 수 있습니다. 현재 구조에서는 매출이 있어도 대표가 가져가는 돈이 줄어들 가능성이 큽니다. 가장 큰 비용 항목 하나를 먼저 줄이는 계획이 필요합니다.",
  };
  const rentReview = {
    ...rentEvalBase,
    valueText: formatPercent(rentRate),
    diagnosis:
      `${formatManwon(revenue)} 매출 기준 / 월 임차료 ${formatManwon(rent)} / 임차료 부담률 ${formatPercent(rentRate)}입니다 / ${rentDiagnosisMap[rentEvalBase.label]}` +
      (rentEvalBase.label === "주의" || rentEvalBase.label === "위험"
        ? ` / 임차료를 업종 참고 양호구간인 ${formatPercent(benchmark.rent[0])} 이하로 맞추려면 월 매출이 약 ${formatManwon(rentTargetRevenue)} 이상 필요합니다.`
        : ""),
  };
  const payrollReview = {
    ...payrollEvalBase,
    valueText: formatPercent(payrollRate),
    diagnosis: `${employees}명 기준 / 월 인건비 ${formatManwon(payroll)} / 인건비 부담률 ${formatPercent(payrollRate)}입니다 / ${payrollDiagnosisMap[payrollEvalBase.label]}`,
  };
  const materialReview =
    materialRate === null
      ? {
          ...evaluateMaterialMissing(),
          diagnosis: `월평균 매출 ${formatManwon(revenue)} 기준 / 매입비/재료비 입력 없음 / ${evaluateMaterialMissing().diagnosis}`,
        }
      : {
          ...evaluateCostRatio("material", materialRate, benchmark.material),
          valueText: formatPercent(materialRate),
          diagnosis: `${formatManwon(revenue)} 매출 기준 / 월 매입비/재료비 ${formatManwon(material ?? 0)} / 매입/재료비 부담률 ${formatPercent(materialRate)}입니다 / ${materialDiagnosisMap[evaluateCostRatio("material", materialRate, benchmark.material).label]}`,
        };
  const hoursReview = {
    ...hoursEvalBase,
    valueText: formatHours(monthlyHours),
    diagnosis: `하루 평균 ${formatDecimal(hoursPerDay)}시간 / 주 ${formatDecimal(daysPerWeek)}일 운영 기준 / 월 운영시간은 ${formatHours(monthlyHours)}입니다 / 대표 시간당 매출은 ${formatHourlySales(hourlyRevenue)}입니다 / ${hoursDiagnosisMap[hoursEvalBase.label]}`,
  };
  const marketingReview = {
    ...marketingEvalBase,
    valueText: formatPercent(marketingRate),
    diagnosis: `${formatManwon(revenue)} 매출 기준 / 월 마케팅비 ${formatManwon(marketing)} / 마케팅 투자율 ${formatPercent(marketingRate)}입니다 / ${marketingDiagnosisMap[marketingEvalBase.label]}`,
  };
  const materialPhrase = material === null ? "" : ` / 매입비 ${formatManwon(material)}`;
  const surplusReview = {
    ...surplusEvalBase,
    valueText: formatPercent(simpleSurplusRate),
    diagnosis: `월평균 매출 ${formatManwon(revenue)}에서 / 임차료 ${formatManwon(rent)} / 인건비 ${formatManwon(payroll)}${materialPhrase} / 마케팅비 ${formatManwon(marketing)}를 제외한 간이 잔여금은 ${formatManwon(simpleSurplus)} / 간이 잔여율은 ${formatPercent(simpleSurplusRate)}입니다 / ${surplusDiagnosisMap[surplusEvalBase.label]} / 간이 잔여금은 실제 순이익이 아닌 참고 지표입니다.`,
  };
  const reviews: Record<
    string,
    { score: number; label: string; tone: string; referenceText: string; diagnosis: string }
  > = {
    rent: rentReview,
    payroll: payrollReview,
    material: materialReview,
    hours: hoursReview,
    marketing: marketingReview,
    surplus: surplusReview,
  };
  const score = Object.values(reviews).reduce((sum, item) => sum + item.score, 0);
  const overall = getOverallType(score);
  const firstCheckKey = getLowestReviewKey(reviews);
  const summary = [
    { label: "업종", value: industry },
    { label: "지역", value: form.region.trim() || "미입력" },
    { label: "월평균 매출", value: formatManwon(revenue) },
    { label: "월 임차료", value: formatManwon(rent) },
    { label: "직원 수", value: `${formatMoney(employees)}명` },
    { label: "월 인건비", value: formatManwon(payroll) },
    { label: "월 매입비/재료비", value: material === null ? "입력 없음" : formatManwon(material) },
    { label: "월 마케팅비", value: formatManwon(marketing) },
    { label: "월 운영시간", value: formatHours(monthlyHours) },
    { label: "사업 운영 기간", value: form.period || "미선택" },
  ];
  const metrics = [
    {
      title: "임차료 부담률",
      value: formatPercent(rentRate),
      badge: rentReview.label,
      tone: rentReview.tone,
      helper: rentReview.referenceText,
    },
    {
      title: "인건비 부담률",
      value: formatPercent(payrollRate),
      badge: payrollReview.label,
      tone: payrollReview.tone,
      helper: payrollReview.referenceText,
    },
    {
      title: "매입/재료비 부담률",
      value: materialRate === null ? "입력 없음" : formatPercent(materialRate),
      badge: materialReview.label,
      tone: materialReview.tone,
      helper: materialReview.referenceText,
    },
    {
      title: "대표 시간당 매출",
      value: formatHourlySales(hourlyRevenue),
      badge: hoursReview.label,
      tone: hoursReview.tone,
      helper: `운영시간 기준 / 월 운영시간 ${formatHours(monthlyHours)}`,
    },
    {
      title: "마케팅 투자율",
      value: formatPercent(marketingRate),
      badge: marketingReview.label,
      tone: marketingReview.tone,
      helper: marketingReview.referenceText,
    },
    {
      title: "간이 잔여율",
      value: formatPercent(simpleSurplusRate),
      badge: surplusReview.label,
      tone: surplusReview.tone,
      helper: `간이 잔여금 ${formatManwon(simpleSurplus)} / 실제 순이익이 아닌 참고 지표`,
    },
  ];
  return {
    industry,
    region: form.region.trim(),
    period: form.period,
    score,
    typeName: overall.typeName,
    percentText: overall.percentText,
    description: overall.description,
    monthlyHours,
    hourlyRevenue,
    rentRate,
    payrollRate,
    materialRate,
    marketingRate,
    simpleSurplus,
    simpleSurplusRate,
    summary,
    metrics,
    reviews,
    firstCheck: {
      key: firstCheckKey,
      title: firstCheckMap[firstCheckKey].title,
      body: firstCheckMap[firstCheckKey].body,
    },
    checklist: reorderChecklist(firstCheckKey),
    industryComment: industryComments[industry],
  };
};
const validateForm = (form: Form) => {
  const errors: Partial<Record<FormKey, string>> = {};
  const requiredFields: FormKey[] = [
    "industry",
    "revenue",
    "rent",
    "employees",
    "payroll",
    "hoursPerDay",
    "daysPerWeek",
    "marketing",
  ];
  requiredFields.forEach((field) => {
    if (form[field] === "") {
      errors[field] = "필수 입력 항목입니다.";
    }
  });
  const numericFields: FormKey[] = [
    "revenue",
    "rent",
    "employees",
    "payroll",
    "material",
    "hoursPerDay",
    "daysPerWeek",
    "marketing",
  ];
  numericFields.forEach((field) => {
    if (form[field] === "") {
      return;
    }
    const value = Number(form[field]);
    if (!Number.isFinite(value)) {
      errors[field] = "숫자로 입력해주세요.";
      return;
    }
    if (value < 0) {
      errors[field] = "음수는 입력할 수 없습니다.";
    }
  });
  if (form.revenue !== "" && Number(form.revenue) < 1) {
    errors.revenue = "월평균 매출은 1 이상이어야 합니다.";
  }
  if (form.daysPerWeek !== "") {
    const days = Number(form.daysPerWeek);
    if (days < 1 || days > 7) {
      errors.daysPerWeek = "주간 운영일수는 1부터 7 사이로 입력해주세요.";
    }
  }
  if (form.hoursPerDay !== "") {
    const hours = Number(form.hoursPerDay);
    if (hours < 1 || hours > 24) {
      errors.hoursPerDay = "하루 평균 운영시간은 1부터 24 사이로 입력해주세요.";
    }
  }
  return errors;
};
const OpsTest = () => {
  const [step, setStep] = useState("intro");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<ReturnType<typeof buildResult> | null>(null);
  const [toast, setToast] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [participantCount, incrementParticipantCount] = useParticipantCount(
    PARTICIPANT_COUNT_KEY,
    PARTICIPANT_COUNT_BASE,
  );
  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  useEffect(() => {
    if (step !== "loading" || !result) {
      return;
    }
    const startTime = performance.now();
    let animationFrame = 0;
    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / ANALYSIS_DURATION, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 1.15);
      setAnalysisProgress(Math.round(easedProgress * 100));
      if (rawProgress < 1) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };
    animationFrame = window.requestAnimationFrame(animateProgress);
    const finishTimer = window.setTimeout(() => {
      setAnalysisProgress(100);
      setStep("result");
    }, ANALYSIS_DURATION);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(finishTimer);
    };
  }, [step, result]);
  const shareText = useMemo(() => {
    if (!result) {
      return "";
    }
    return `내 사업 건강진단 결과: ${result.typeName}
사업 건강지수 ${result.score}점
내 사업은 지금 잘 굴러가고 있을까? 당신도 확인해보세요.`;
  }, [result]);
  const formattedParticipantCount = useMemo(() => participantCount.toLocaleString("ko-KR"), [participantCount]);
  const handleFieldChange = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setSubmitError("");
  };
  const handleIntroStart = () => {
    incrementParticipantCount();
    setStep("form");
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("필수값과 입력 범위를 확인한 뒤 다시 진단해주세요.");
      return;
    }
    const nextResult = buildResult(form);
    setResult(nextResult);
    setAnalysisProgress(0);
    setStep("loading");
  };
  const handleBadayaCtaClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("android") > -1) {
      window.location.href = BADAYA_ANDROID_URL;
      return;
    }
    if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) {
      window.location.href = BADAYA_IOS_URL;
      return;
    }
    window.alert("바다야 앱은 모바일 기기에서 다운로드 가능합니다.");
  };
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const handleShare = async () => {
    if (!result || !shareText) {
      return;
    }
    try {
      if (navigator.share) {
        await navigator.share({
          title: "내 사업 건강진단 결과",
          text: shareText,
          url: window.location.href,
        });
        return;
      }
      await copyToClipboard(shareText);
      setToast("결과가 복사되었습니다");
    } catch {
      try {
        await copyToClipboard(shareText);
        setToast("결과가 복사되었습니다");
      } catch {
        setToast("공유를 완료하지 못했습니다");
      }
    }
  };
  const analysisStageIndex = analysisProgress < 34 ? 0 : analysisProgress < 67 ? 1 : 2;
  const analysisStageLabel = ANALYSIS_STATUS_LABELS[analysisStageIndex];
  const renderField = (key: FormKey, label: string, options?: FieldOptions) => {
    return (
      <div className={`field-group${options?.fieldClassName ? ` ${options.fieldClassName}` : ""}`}>
        <label className="field-label" htmlFor={key}>
          <span>{label}</span>
        </label>
        {options?.help ? <p className="field-help">{options.help}</p> : null}
        <input
          id={key}
          className={`field-input${options?.inputClassName ? ` ${options.inputClassName}` : ""}`}
          type={options?.type || "text"}
          inputMode={options?.type === "number" ? "decimal" : void 0}
          placeholder={options?.placeholder}
          min={options?.min}
          max={options?.max}
          step={options?.step || "0.1"}
          value={form[key]}
          onChange={(event) => handleFieldChange(key, event.target.value)}
        />
        {errors[key] ? <p className="error-text">{errors[key]}</p> : null}
      </div>
    );
  };
  return (
    <div className="health-page">
      <style>{pageStyles}</style>
      <div className="health-shell">
        {step === "intro" ? (
          <>
            <section className="hero-card">
              <h1 className="hero-title">소상공인 사업장 운영진단</h1>
              <p className="hero-body">동종업계 대비 부족한 점을 확인하고 개선 할 수 있습니다.</p>
              <div className="hero-visual">
                <img
                  className="hero-image"
                  src="/images/ops-intro.jpg"
                  alt="매출과 비용 구조를 점검하며 고민하는 소상공인 사장님"
                />
              </div>
              <div className="steps-grid" style={{ marginTop: 20 }}>
                <div className="mini-card">
                  <div className="mini-head">
                    <span className="mini-label">✓</span>
                    <h2 className="mini-title">운영 실적 입력</h2>
                  </div>
                  <p className="mini-desc">
                    월 매출 / 임차료 / 직원 수 / 월 인건비 / 운영시간 / 운영일수 / 월 마케팅비용을 입력합니다.
                  </p>
                </div>
                <div className="mini-card">
                  <div className="mini-head">
                    <span className="mini-label">✓</span>
                    <h2 className="mini-title">업종 대비 내 상태 분석</h2>
                  </div>
                  <p className="mini-desc">
                    입력한 숫자를 기준으로 임차료, 인건비, 원가, 운영시간, 마케팅 부담을 업종 참고 구간과 비교해
                    살펴봅니다.
                  </p>
                </div>
                <div className="mini-card">
                  <div className="mini-head">
                    <span className="mini-label">✓</span>
                    <h2 className="mini-title">바로 개선할 점 확인</h2>
                  </div>
                  <p className="mini-desc">
                    지금 구조에서 먼저 점검할 항목과 바로 실행해볼 수 있는 체크리스트를 함께 확인할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="participant-proof" aria-live="polite">
                <div className="participant-count">{formattedParticipantCount}</div>
                <div className="participant-copy">명의 사장님이 참여했습니다</div>
              </div>
              <div className="button-row">
                <button className="primary-btn" type="button" onClick={handleIntroStart}>
                  내 사업 진단하기
                </button>
              </div>
            </section>
          </>
        ) : null}
        {step === "form" ? (
          <>
            <section className="surface-card">
              <p className="section-copy" style={{ marginBottom: 18, color: "#2563eb" }}>
                TIP. 3개월 평균을 떠올리며 입력하시면 보다 정확한 진단 결과를 기대할 수 있습니다.
              </p>
              {submitError ? <div className="error-banner">{submitError}</div> : null}
              <form onSubmit={handleSubmit}>
                <div className="surface-card" style={{ marginBottom: 16, padding: 18 }}>
                  <div className="input-grid">
                    <div className="field-group wide-field">
                      <label className="field-label" htmlFor="industry">
                        <span>업종 선택</span>
                      </label>
                      <select
                        id="industry"
                        className="field-select wide-compact-control"
                        value={form.industry}
                        onChange={(event) => handleFieldChange("industry", event.target.value)}
                      >
                        <option value="">업종을 선택해주세요</option>
                        {INDUSTRY_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.industry ? <p className="error-text">{errors.industry}</p> : null}
                    </div>
                    {renderField("region", "지역 입력", {
                      placeholder: "예: 서울 / 경기 / 부산",
                      fieldClassName: "wide-field",
                      inputClassName: "wide-compact-control",
                    })}
                    <div className="field-group wide-field">
                      <label className="field-label" htmlFor="period">
                        <span>사업 운영 기간</span>
                      </label>
                      <select
                        id="period"
                        className="field-select wide-compact-control"
                        value={form.period}
                        onChange={(event) => handleFieldChange("period", event.target.value)}
                      >
                        <option value="">운영 기간을 선택해주세요</option>
                        {PERIOD_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="surface-card" style={{ marginBottom: 16, padding: 18 }}>
                  <div className="input-grid">
                    {renderField("revenue", "월평균 매출", {
                      type: "number",
                      placeholder: "예: 3000",
                      help: "만원 단위 / 필수",
                      min: 1,
                    })}
                    {renderField("rent", "월 임차료", {
                      type: "number",
                      placeholder: "예: 250",
                      help: "만원 단위 / 필수",
                      min: 0,
                    })}
                    {renderField("employees", "직원 수", {
                      type: "number",
                      placeholder: "예: 2",
                      help: "대표 본인은 제외 / 필수",
                      min: 0,
                    })}
                    {renderField("payroll", "월 인건비", {
                      type: "number",
                      placeholder: "예: 500",
                      help: "직원 급여/알바비 기준 / 대표 인건비 제외 / 필수",
                      min: 0,
                    })}
                    {renderField("material", "월 매입비/재료비", {
                      type: "number",
                      placeholder: "모르면 비워도 괜찮습니다",
                      help: "선택 입력 / 비워두면 결과에 “원가/매입비 입력 없음”으로 표시됩니다.",
                      min: 0,
                    })}
                    {renderField("marketing", "월 마케팅비", {
                      type: "number",
                      placeholder: "예: 80",
                      help: "광고비 / 홍보비 / 콘텐츠 제작비 포함 / 필수",
                      min: 0,
                    })}
                  </div>
                </div>
                <div className="surface-card" style={{ marginBottom: 20, padding: 18 }}>
                  <div className="section-head" style={{ marginBottom: 14 }}>
                    <span className="section-kicker">운영 패턴</span>
                    <h3 className="section-title" style={{ fontSize: 20, marginBottom: 0 }}>
                      운영시간을 입력해주세요
                    </h3>
                    <p className="section-copy">
                      하루 평균 운영시간은 1부터 24 사이 / 주간 운영일수는 1부터 7 사이만 입력 가능합니다.
                    </p>
                  </div>
                  <div className="input-grid">
                    {renderField("hoursPerDay", "하루 평균 운영시간", {
                      type: "number",
                      placeholder: "예: 10",
                      help: "필수",
                      min: 1,
                      max: 24,
                    })}
                    {renderField("daysPerWeek", "주간 운영일수", {
                      type: "number",
                      placeholder: "예: 6",
                      help: "주 6일이면 6 입력 / 필수",
                      min: 1,
                      max: 7,
                    })}
                  </div>
                </div>
                <div className="button-row">
                  <button className="ghost-btn" type="button" onClick={() => setStep("intro")}>
                    시작 화면으로
                  </button>
                  <button className="primary-btn" type="submit">
                    결과 보기
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : null}
        {step === "loading" && result ? (
          <>
            <section className="surface-card">
              <div className="analysis-stage">
                <div className="analysis-main-card">
                  <div className="section-head" style={{ marginBottom: 0 }}>
                    <span className="section-kicker">분석 진행 중</span>
                    <h1 className="analysis-title">사업운영 점수를 분석하고 있어요</h1>
                    <p className="analysis-copy">입력한 지표를 바탕으로 바다야 AI가 분석하고 있어요. 평균 8초 소요</p>
                  </div>
                  <div className="analysis-progress-card">
                    <div className="analysis-progress-head">
                      <p className="analysis-progress-label">{analysisStageLabel}</p>
                      <span className="analysis-progress-value">{analysisProgress}%</span>
                    </div>
                    <div className="analysis-progress-track" aria-hidden="true">
                      <div className="analysis-progress-bar" style={{ width: `${analysisProgress}%` }} />
                    </div>
                    <div className="analysis-status-list">
                      {ANALYSIS_STATUS_LABELS.map((label, index) => {
                        const isDone = index < analysisStageIndex;
                        const isActive = index === analysisStageIndex;
                        return (
                          <div
                            key={label}
                            className={`analysis-status-item${isDone ? " done" : ""}${isActive ? " active" : ""}`}
                          >
                            <span className="analysis-status-text">{label}</span>
                            <span className="analysis-status-badge">
                              {isDone ? "완료" : isActive ? "진행중" : "대기"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="analysis-promo-card">
                  <div className="analysis-promo-image-wrap">
                    <img src={ANALYSIS_APP_IMAGE_URL} alt="사업자 지원 앱 화면 이미지" />
                  </div>
                  <div className="analysis-promo-body">
                    <h2 className="analysis-promo-title">지원 혜택 탐색부터 신청 문서 작성까지 한 번에</h2>
                    <p className="analysis-promo-copy">
                      사업 조건에 맞는 지원 혜택을 찾아주고, 공고별 필요서류 체크리스트부터 나만의 AI로 신청서와
                      사업계획서까지 작성해 주는 사업자 지원 앱입니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
        {step === "result" && result ? (
          <>
            <section className="surface-card">
              <div className="result-hero">
                <div className="score-box">
                  <p className="score-label">운영점수</p>
                  <p className="score-value">{result.score}점</p>
                  <h1 className="result-type">{result.typeName}</h1>
                  <p className="result-subtext">{result.percentText}</p>
                </div>
                <div className="mini-card" style={{ border: "none", background: "#f7faff" }}>
                  <h2 className="mini-title" style={{ fontSize: 22 }}>
                    지금 구조에서 먼저 볼 핵심
                  </h2>
                  <p className="mini-desc" style={{ marginBottom: 12 }}>
                    {result.description}
                  </p>
                  <p className="mini-desc">
                    {result.region ? `${result.region} 기준 / ` : ""}
                    {result.period ? `${result.period} 운영 / ` : ""}업종별 참고 기준으로 살펴본 결과입니다.
                  </p>
                </div>
              </div>
            </section>
            <section className="surface-card">
              <div className="section-head">
                <span className="section-kicker">운영 지표</span>
                <h2 className="section-title">내가 넣은 숫자 한눈에 보기</h2>
                <p className="section-copy">결과는 아래 입력값을 기준으로 계산되었습니다.</p>
              </div>
              <div className="summary-grid">
                {result.summary.map((item) => (
                  <div key={item.label} className="summary-item">
                    <p className="summary-label">{item.label}</p>
                    <p className="summary-value">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="surface-card">
              <div className="section-head">
                <span className="section-kicker">운영 분석</span>
                <h2 className="section-title">숫자로 보는 운영구조</h2>
                <p className="section-copy">모든 비율은 소수점 첫째 자리까지 표시했습니다.</p>
              </div>
              <div className="metrics-grid">
                {result.metrics.map((metric) => (
                  <div key={metric.title} className="metric-card">
                    <div className="metric-top">
                      <h3 className="metric-title">{metric.title}</h3>
                      <span className={`badge ${metric.tone}`}>{metric.badge}</span>
                    </div>
                    <p className="metric-value">{metric.value}</p>
                    <p className="metric-helper">{metric.helper}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="surface-card">
              <div className="section-head">
                <span className="section-kicker">업종 별 진단 결과</span>
                <h2 className="section-title">
                  {result.industry}
                  {" 기준으로 볼 때"}
                </h2>
                <p className="section-copy">{result.industryComment}</p>
              </div>
            </section>
            <section className="surface-card">
              <div className="section-head">
                <span className="section-kicker">항목 별 진단결과</span>
                <h2 className="section-title">숫자를 문장으로 풀어보면</h2>
                <p className="section-copy">
                  입력한 실제 숫자와 계산된 비율을 반영해 바로 실행할 수 있는 관점으로 정리했습니다.
                </p>
              </div>
              <div className="review-grid">
                {["rent", "payroll", "material", "hours", "marketing", "surplus"].map((key) => {
                  const review = result.reviews[key];
                  const titleMap: Record<string, string> = {
                    rent: "임차료 부담률",
                    payroll: "인건비 부담률",
                    material: "매입/재료비 부담률",
                    hours: "운영시간 부담",
                    marketing: "마케팅 투자율",
                    surplus: "간이 잔여율",
                  };
                  return (
                    <article key={key} className="review-card">
                      <div className="review-top">
                        <h3 className="review-title">{titleMap[key]}</h3>
                        <span className={`badge ${review.tone}`}>{review.label}</span>
                      </div>
                      <p className="review-ref">{review.referenceText}</p>
                      <p className="review-body">{review.diagnosis}</p>
                    </article>
                  );
                })}
              </div>
            </section>
            <section className="surface-card">
              <div className="section-head">
                <span className="section-kicker">우선순위</span>
                <h2 className="section-title">가장 먼저 점검할 것</h2>
                <p className="section-copy">
                  6개 항목 중 가장 낮게 나온 영역을 먼저 올리는 것이 전체 구조를 바꾸는 데 도움이 됩니다.
                </p>
              </div>
              <div className="check-card">
                <div className="review-top">
                  <h3 className="review-title">{result.firstCheck.title}</h3>
                  <span className={`badge ${result.reviews[result.firstCheck.key].tone}`}>
                    {result.reviews[result.firstCheck.key].label}
                  </span>
                </div>
                <p className="check-body" style={{ marginTop: 12, whiteSpace: "pre-line" }}>
                  {result.firstCheck.body}
                </p>
              </div>
            </section>
            <section className="surface-card">
              <div className="section-head">
                <span className="section-kicker">바로 실행이 필요한 체크리스트</span>
                <h2 className="section-title">이것만 해도 확실히 달라집니다.</h2>
              </div>
              <ol className="list-box">
                {result.checklist.map((item, index) => (
                  <li key={item} className="list-item">
                    <span className="list-index">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section className="surface-card">
              <div className="button-row inline">
                <button className="secondary-btn" type="button" onClick={() => setStep("form")}>
                  다시하기
                </button>
                <button className="primary-btn" type="button" onClick={handleShare}>
                  결과 공유하기
                </button>
              </div>
            </section>
            <section className="surface-card">
              <div className="cta-card">
                <div className="cta-top">
                  <div>
                    <h2 className="cta-title">사업 운영비, 전부 내 돈으로만 해결하고 있나요?</h2>
                  </div>
                </div>
                <p className="cta-body">
                  마케팅비, 시설개선, 고용지원, 컨설팅, 온라인 전환처럼 사업 운영에 도움이 되는 지원혜택이 있을 수
                  있습니다. 바다야는 내 사업조건에 맞는 지원사업을 찾고, 공고별 필요서류와 신청서/사업계획서 작성까지
                  쉽게 준비할 수 있게 도와드립니다.
                </p>
                <div className="cta-visual" aria-hidden="true">
                  <img src={BADAYA_IMAGE_URL} alt="" />
                </div>
                <div className="button-row">
                  <a className="link-btn" href={BADAYA_ANDROID_URL} onClick={handleBadayaCtaClick}>
                    내 지원혜택 확인하기
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : null}
        <p className="footer-copy">
          사장님이 숫자를 빠르게 점검하고 바로 움직일 수 있도록 만든 참고용 사업 건강진단입니다.
        </p>
      </div>
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
};
export default OpsTest;
