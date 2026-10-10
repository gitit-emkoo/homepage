"use client";

import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import { useParticipantCount } from "@/lib/useParticipantCount";
const BADAYA_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.app.badayaa&hl=ko";
const BADAYA_APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EB%B0%94%EB%8B%A4%EC%95%BC-%EB%A7%9E%EC%B6%A4-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EC%8B%A0%EC%B2%AD/id6769259830";
const TEST_TITLE = "내 사업의 숨은 손해는 얼마일까?";
const TEST_DESCRIPTION =
  "매출 기회, 마케팅, 비용 관리, 운영 시간, 세금/서류, 지원혜택 활용력을 기준으로 내 사업에서 놓치고 있는 숨은 손해를 확인해보세요.";
const START_BUTTON_TEXT = "테스트 시작";
const INTRO_SAMPLE_IMAGE_URL = "/images/loss-intro.jpg";
const BADAYA_BG_IMAGE_URL = "/images/badaya-gom.png";
const ANALYSIS_PROMO_IMAGE_URL = "/images/badaya-app.png";
const ANALYSIS_DURATION_MS = 8e3;
const ANALYSIS_ITEMS = ["매출 기회", "마케팅 흐름", "비용 구조", "운영 시간", "세금 서류", "지원 혜택"];
const PARTICIPANT_COUNT_BASE = 4623;
const PARTICIPANT_COUNT_STORAGE_KEY = "hidden-loss-test-participant-count";
const getObjectParticle = (text: string) => {
  const lastChar = text.charCodeAt(text.length - 1) - 44032;
  if (lastChar < 0 || lastChar > 11171) {
    return "를";
  }
  return lastChar % 28 === 0 ? "를" : "을";
};
const optionScores: Record<string, number> = {
  A: 16,
  B: 13,
  C: 10,
  D: 7,
};
const questions = [
  {
    key: "sales",
    number: "Q1.",
    part: "매출 기회 손실",
    question: "내 사업에서 팔 수 있었는데 놓치고 있는 매출 기회를 확인하고 있나요?",
    options: [
      {
        key: "A",
        label: "고객 문의, 재방문, 추가구매 기회를 꾸준히 확인하고 있다",
        diagnosis:
          "매출 기회를 잘 확인하고 있습니다. 이제는 고객 문의, 재방문, 추가구매가 실제 매출로 이어진 경우를 따로 표시해 어떤 순간에 고객이 결제하는지 찾아보세요.",
      },
      {
        key: "B",
        label: "대략 보고 있지만 따로 기록하거나 분석하진 않는다",
        diagnosis:
          "매출 흐름은 보고 있지만 놓치는 기회가 있을 수 있습니다. 이번 주부터 문의가 왔지만 구매로 이어지지 않은 이유를 3개만 기록해보세요.",
      },
      {
        key: "C",
        label: "손님이 줄거나 문의가 줄면 그때서야 확인한다",
        diagnosis:
          "매출이 줄어든 뒤에야 확인하면 대응이 늦어질 수 있습니다. 매일 신규 문의 수, 재방문 고객 수, 구매 전환 수를 간단히 메모해보세요.",
      },
      {
        key: "D",
        label: "매출이 왜 오르거나 떨어지는지 거의 감으로 판단한다",
        diagnosis:
          "매출을 감으로만 보면 팔 수 있었던 기회를 놓칠 수 있습니다. 오늘부터 “문의는 있었지만 구매하지 않은 고객”을 따로 적고, 왜 안 샀는지 한 줄씩 기록해보세요.",
      },
    ],
  },
  {
    key: "marketing",
    number: "Q2.",
    part: "마케팅 손실",
    question: "내 사업을 고객에게 꾸준히 보여주는 마케팅 활동을 하고 있나요?",
    options: [
      {
        key: "A",
        label: "2개 이상 채널을 꾸준히 운영하고 반응도 확인한다",
        diagnosis:
          "마케팅 실행력이 좋습니다. 이제는 조회수보다 실제 문의/방문/구매로 이어진 콘텐츠를 표시해서 돈이 되는 콘텐츠 유형을 찾아보세요.",
      },
      {
        key: "B",
        label: "1개 이상 채널은 운영하지만 꾸준함이 부족하다",
        diagnosis:
          "채널은 있지만 꾸준함이 부족하면 고객 기억에서 쉽게 사라집니다. 이번 주부터 상품 소개 1개, 고객 후기 1개, 사장님 이야기 1개를 고정 루틴으로 올려보세요.",
      },
      {
        key: "C",
        label: "채널은 만들어두었지만 거의 방치하고 있다",
        diagnosis:
          "방치된 채널은 오히려 신뢰를 떨어뜨릴 수 있습니다. 새 콘텐츠가 어렵다면 기존 고객 후기, 메뉴 사진, 작업 전후 사진부터 다시 올려보세요.",
      },
      {
        key: "D",
        label: "별도 홍보 없이 손님이 알아서 오길 기대한다",
        diagnosis:
          "홍보 없이 고객이 알아서 오길 기다리면 숨은 손해가 커질 수 있습니다. 오늘 바로 네이버 플레이스 대표사진, 영업시간, 전화번호, 소개문부터 점검하세요.",
      },
    ],
  },
  {
    key: "costs",
    number: "Q3.",
    part: "고정비/비용 손실",
    question: "매달 반복되는 고정비와 불필요한 지출을 확인하고 있나요?",
    options: [
      {
        key: "A",
        label: "매달 고정비와 지출을 정리하고 줄일 항목을 확인한다",
        diagnosis:
          "비용 관리가 잘 되고 있습니다. 이제는 전월 대비 늘어난 항목을 표시하고, 왜 늘었는지 사유를 붙이면 비용 통제가 더 쉬워집니다.",
      },
      {
        key: "B",
        label: "큰 비용은 알고 있지만 세부 지출은 잘 보지 않는다",
        diagnosis:
          "큰 비용은 알고 있지만 작은 반복 지출이 쌓일 수 있습니다. 카드내역과 통장내역에서 매달 반복되는 자동결제/구독료/수수료를 따로 표시해보세요.",
      },
      {
        key: "C",
        label: "돈이 부족하다고 느낄 때만 지출을 확인한다",
        diagnosis:
          "돈이 부족할 때만 비용을 보면 이미 늦을 수 있습니다. 매주 10분만 정해 임대료, 인건비, 광고비, 재료비 흐름을 확인해보세요.",
      },
      {
        key: "D",
        label: "매달 얼마가 어디로 나가는지 정확히 모른다",
        diagnosis:
          "비용이 어디로 나가는지 모르면 남는 돈이 줄어드는 이유를 찾기 어렵습니다. 오늘부터 임대료, 인건비, 재료비, 광고비, 기타비용 5개 항목만 나눠 적어보세요.",
      },
    ],
  },
  {
    key: "time",
    number: "Q4.",
    part: "시간/운영 손실",
    question: "대표가 직접 하지 않아도 될 일에 시간을 많이 쓰고 있나요?",
    options: [
      {
        key: "A",
        label: "반복 업무를 정리하고 도구나 외부 도움을 활용한다",
        diagnosis:
          "운영 시간을 잘 관리하고 있습니다. 이제는 반복 업무 중 자동화하거나 위임할 수 있는 일을 찾아 대표가 매출과 성장에 쓸 시간을 더 확보해보세요.",
      },
      {
        key: "B",
        label: "일부는 줄이려고 하지만 아직 직접 처리하는 일이 많다",
        diagnosis:
          "줄이려는 노력은 있지만 아직 대표 시간이 많이 새고 있을 수 있습니다. 이번 주에 반복되는 업무 3개를 적고, 그중 하나만 템플릿이나 체크리스트로 바꿔보세요.",
      },
      {
        key: "C",
        label: "대부분 직접 처리해서 시간이 자주 부족하다",
        diagnosis:
          "대부분 직접 처리하면 중요한 의사결정 시간이 줄어듭니다. 하루 업무를 적어보고, 대표가 꼭 해야 하는 일과 맡길 수 있는 일을 구분해보세요.",
      },
      {
        key: "D",
        label: "하루 종일 바쁜데 무엇 때문에 바쁜지 잘 모르겠다",
        diagnosis:
          "바쁘기만 하고 이유를 모르면 시간 손실이 계속 쌓입니다. 오늘 하루를 1시간 단위로 기록해보세요. 가장 많이 반복되는 일이 첫 번째 개선 대상입니다.",
      },
    ],
  },
  {
    key: "documents",
    number: "Q5.",
    part: "세금/서류 손실",
    question: "사업에 필요한 서류나 증빙을 필요할 때 바로 꺼낼 수 있나요?",
    options: [
      {
        key: "A",
        label: "자주 쓰는 서류와 증빙을 정리해두고 바로 찾을 수 있다",
        diagnosis:
          "서류와 증빙을 잘 정리하고 있습니다. 이제는 자주 쓰는 서류의 유효기간과 발급처까지 함께 적어두면 신청이나 계약 때 더 빠르게 대응할 수 있습니다.",
      },
      {
        key: "B",
        label: "몇 가지는 정리했지만 필요할 때마다 다시 찾는 편이다",
        diagnosis:
          "일부는 정리되어 있지만 필요할 때마다 다시 찾는 시간이 생길 수 있습니다. 사업자등록증, 통장사본, 납세증명서, 중소기업확인서를 한 폴더에 모아보세요.",
      },
      {
        key: "C",
        label: "서류 이름은 알지만 어디서 발급하는지 자주 헷갈린다",
        diagnosis:
          "서류 발급 경로를 모르면 좋은 기회가 왔을 때 준비가 늦어질 수 있습니다. 홈택스, 정부24, 중소기업현황정보시스템을 즐겨찾기에 추가해두세요.",
      },
      {
        key: "D",
        label: "서류나 증빙은 필요할 때마다 급하게 주변에 물어본다",
        diagnosis:
          "서류를 급하게 찾는 일이 반복되면 신청이나 계약 과정에서 손해가 생길 수 있습니다. 먼저 “자주 제출하는 서류 목록”을 만들고, 발급처와 보관 위치를 적어두세요.",
      },
    ],
  },
  {
    key: "benefits",
    number: "Q6.",
    part: "지원혜택 기회손실",
    question: "내 사업이 받을 수 있는 지원사업이나 혜택을 주기적으로 확인하고 있나요?",
    options: [
      {
        key: "A",
        label: "정기적으로 찾아보고 조건이 맞으면 신청까지 검토한다",
        diagnosis:
          "지원혜택을 챙기는 감각이 좋습니다. 이제는 공고를 찾는 시간보다 내가 실제로 신청 가능한지, 필요한 서류가 무엇인지, 작성할 문서가 무엇인지 확인하는 시간을 줄여야 합니다. 바다야에서 공고별 필요서류와 신청서/사업계획서 초안을 빠르게 확인해보세요.",
      },
      {
        key: "B",
        label: "몇 번 찾아봤지만 신청 준비가 복잡해서 멈춘 적이 있다",
        diagnosis:
          "관심은 있지만 신청 준비에서 멈추는 경우가 있을 수 있습니다. 공고를 보면 먼저 지원대상, 신청기간, 제출서류, 작성서류 4가지만 확인하세요. 바다야를 쓰면 이 과정을 한 화면에서 정리할 수 있습니다.",
      },
      {
        key: "C",
        label: "들어본 적은 있지만 내 사업에 해당되는지 잘 모른다",
        diagnosis:
          "받을 수 있는 혜택을 놓치고 있을 가능성이 있습니다. 마케팅비, 시설개선비, 고용지원, 컨설팅 지원 중 내 사업에 필요한 항목을 하나만 정하고 바다야에서 맞춤 공고를 확인해보세요.",
      },
      {
        key: "D",
        label: "지원사업은 나와 상관없는 일이라고 생각했다",
        diagnosis:
          "지원사업을 내 일로 생각하지 않았다면 가장 큰 기회손실이 생기고 있을 수 있습니다. “나는 해당 안 되겠지”라고 넘기기 전에 사업자등록증 기준으로 받을 수 있는 혜택부터 확인해보세요. 바다야가 내 조건에 맞는 공고를 선별해드립니다.",
      },
    ],
  },
];
const resultRanges = [
  {
    min: 90,
    typeName: "손실 방어 고수형",
    percentText: "숨은 손해 관리지수 테스트 기준 상위 3% 유형입니다.",
    description:
      "매출, 비용, 시간, 서류, 지원혜택까지 비교적 잘 챙기고 있는 대표입니다. 이제는 더 열심히 하는 것보다 반복되는 일을 줄이고, 더 큰 기회를 빠르게 잡는 방향으로 운영 효율을 높이는 것이 중요합니다.",
  },
  {
    min: 82,
    typeName: "새는 돈을 잘 막는 대표",
    percentText: "숨은 손해 관리지수 테스트 기준 상위 10% 유형입니다.",
    description:
      "사업에서 새는 비용과 기회를 어느 정도 잘 관리하고 있습니다. 다만 마케팅, 서류, 지원혜택처럼 당장 눈에 보이지 않는 영역에서 놓치는 부분이 생길 수 있으니 한두 가지 루틴을 더 만들면 좋습니다.",
  },
  {
    min: 70,
    typeName: "놓치는 기회가 있는 현실형 대표",
    percentText: "숨은 손해 관리지수 테스트 기준 상위 30% 유형입니다.",
    description:
      "사업은 잘 운영하고 있지만 바쁜 일상 속에서 매출 기회, 마케팅, 비용 관리, 지원혜택 같은 영역이 뒤로 밀릴 수 있습니다. 가장 낮은 영역부터 하나씩 정리하면 숨은 손해를 줄일 수 있습니다.",
  },
  {
    min: 58,
    typeName: "숨은 손해 주의형",
    percentText: "숨은 손해 관리지수 테스트 기준 평균권 유형입니다.",
    description:
      "열심히 운영하고 있지만, 눈에 잘 보이지 않는 손해가 여러 곳에서 쌓이고 있을 수 있습니다. 매출을 더 올리는 것만큼 새는 비용, 새는 시간, 놓친 혜택을 줄이는 것도 중요합니다.",
  },
  {
    min: 0,
    typeName: "손해 누적 위험형",
    percentText: "숨은 손해 관리지수 테스트 기준 관리가 필요한 유형입니다.",
    description:
      "지금은 사업을 버티는 데 집중하느라 매출 기회, 비용, 시간, 서류, 지원혜택을 체계적으로 챙기기 어려운 상태일 수 있습니다. 모든 것을 한 번에 바꾸려 하지 말고, 가장 큰 손해가 생기는 영역 하나부터 정리하는 것이 좋습니다.",
  },
];
const lowestPriority = ["benefits", "costs", "marketing", "sales", "time", "documents"];
const firstActionMap: Record<string, { title: string; body: string }> = {
  sales: {
    title: "가장 먼저 줄일 손해: 매출 기회 손실",
    body: "고객이 있었는데 구매로 이어지지 않았다면 이미 숨은 손해가 생긴 것입니다.\n이번 주부터 문의는 있었지만 결제하지 않은 고객 5명을 떠올려보세요.\n그들이 망설인 이유를 가격, 설명 부족, 신뢰 부족, 필요성 부족, 타이밍 문제 중 하나로 표시해보세요.\n반복되는 이유가 보이면 상품 설명, 가격 구성, 후기 노출, 상담 멘트를 바로 개선할 수 있습니다.",
  },
  marketing: {
    title: "가장 먼저 줄일 손해: 마케팅 손실",
    body: "좋은 상품이나 서비스를 갖고 있어도 고객에게 꾸준히 보이지 않으면 선택받기 어렵습니다.\n이번 주에 바로 올릴 수 있는 콘텐츠 3개부터 정해보세요.\n\n1. 고객이 좋아했던 후기 1개\n2. 상품 또는 서비스 사진 1개\n3. 사장님이 직접 설명하는 짧은 이야기 1개\n이 3가지만 반복해도 “운영 중인 사업”이라는 신뢰가 생기고, 검색/방문/문의로 이어질 가능성이 높아집니다.",
  },
  costs: {
    title: "가장 먼저 줄일 손해: 고정비/비용 손실",
    body: "매출이 늘어도 비용이 같이 새면 남는 돈은 줄어듭니다.\n오늘 카드내역과 통장내역에서 매달 반복되는 지출을 표시해보세요.\n자동결제, 구독료, 광고비, 수수료, 배달 관련 비용, 재료비 중 줄일 수 있는 항목이 있는지 확인하세요.\n줄일 항목을 찾지 못하더라도 비용 구조가 보이기 시작하면 다음 의사결정이 훨씬 빨라집니다.",
  },
  time: {
    title: "가장 먼저 줄일 손해: 시간/운영 손실",
    body: "대표 시간이 계속 새면 중요한 일에 집중하기 어렵습니다.\n오늘 하루 동안 한 일을 1시간 단위로 적어보세요.\n그중 반복되는 업무, 누가 해도 되는 업무, 매출과 직접 연결되지 않는 업무를 표시하세요.\n가장 많이 반복되는 일 하나를 템플릿, 체크리스트, 자동화 도구로 바꾸는 것이 첫 번째 개선입니다.",
  },
  documents: {
    title: "가장 먼저 줄일 손해: 세금/서류 손실",
    body: "서류를 필요할 때마다 찾으면 신청, 계약, 지원사업 준비 과정에서 시간이 오래 걸립니다.\n먼저 사업자등록증, 통장사본, 국세납세증명서, 지방세납세증명서, 중소기업확인서처럼 자주 쓰는 서류를 한 폴더에 정리해보세요.\n서류 준비가 빨라지면 좋은 기회가 왔을 때 바로 움직일 수 있습니다.",
  },
  benefits: {
    title: "가장 먼저 줄일 손해: 지원혜택 기회손실",
    body: "받을 수 있는 혜택을 모르고 지나치는 것도 사업의 숨은 손해가 될 수 있습니다.\n마케팅비, 시설개선비, 고용지원, 컨설팅, 온라인 전환처럼 사업 운영에 도움이 되는 혜택이 있을 수 있습니다.\n하지만 공고마다 자격요건, 필요서류, 작성서류가 다르기 때문에 직접 찾고 확인하는 과정이 어렵습니다.\n바다야에서 내 사업조건에 맞는 지원혜택을 먼저 확인해보세요.\n맞춤 공고 확인부터 실제 필요서류 체크, 신청서/사업계획서 초안 작성까지 더 쉽게 준비할 수 있습니다.",
  },
};
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#16324f",
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    padding: "20px 16px 56px",
    wordBreak: "keep-all",
  },
  shell: {
    maxWidth: 960,
    margin: "0 auto",
    display: "grid",
    gap: 18,
  },
  heroCard: {
    borderRadius: 0,
    padding: "24px 0",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },
  topBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#eef5ff",
    color: "#2a6ee7",
    fontSize: 13,
    fontWeight: 800,
  },
  heroTitle: {
    margin: "14px 0 0",
    fontSize: "clamp(28px, 6vw, 46px)",
    lineHeight: 1.14,
    letterSpacing: "-0.04em",
    color: "#1f74ff",
    fontWeight: 800,
    textAlign: "center",
  },
  heroDescription: {
    margin: "14px 0 0",
    fontSize: 15,
    lineHeight: 1.8,
    color: "#516c88",
    textAlign: "center",
  },
  introImageWrap: {
    marginTop: 20,
    borderRadius: 24,
    overflow: "hidden",
    border: "none",
    boxShadow: "none",
  },
  introImage: {
    width: "100%",
    display: "block",
    objectFit: "cover",
  },
  participantCounter: {
    marginTop: 16,
    textAlign: "center",
  },
  participantCounterNumber: {
    display: "inline-block",
    margin: 0,
    fontSize: "clamp(34px, 8vw, 52px)",
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: "-0.05em",
    color: "#1f74ff",
  },
  participantCounterText: {
    margin: "8px 0 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#4d6684",
    fontWeight: 700,
  },
  buttonRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
    marginTop: 20,
  },
  primaryButton: {
    width: "100%",
    border: "none",
    borderRadius: 18,
    padding: "18px 20px",
    background: "linear-gradient(135deg, #2b8bff 0%, #1f74ff 55%, #1258cf 100%)",
    color: "#ffffff",
    fontSize: 17,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(31, 116, 255, 0.28)",
  },
  secondaryButton: {
    width: "100%",
    borderRadius: 18,
    padding: "16px 18px",
    background: "#ffffff",
    color: "#1f4d82",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid #cfe1ff",
  },
  questionCard: {
    borderRadius: 0,
    padding: "22px 0",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  questionCount: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: "#6080a4",
    fontWeight: 800,
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    background: "#e6efff",
    overflow: "hidden",
    marginTop: 16,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #5aa8ff 0%, #1f74ff 100%)",
    transition: "width 220ms ease",
  },
  questionHint: {
    margin: "22px 0 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#5c7899",
    fontWeight: 700,
  },
  questionTitle: {
    margin: "10px 0 0",
    fontSize: "clamp(22px, 4.5vw, 32px)",
    lineHeight: 1.38,
    letterSpacing: "-0.03em",
    color: "#102846",
  },
  choices: {
    display: "grid",
    gap: 12,
    marginTop: 22,
  },
  choiceButton: {
    width: "100%",
    textAlign: "left",
    borderRadius: 22,
    padding: "18px 16px",
    background: "#f8fbff",
    border: "1px solid #d9e9ff",
    cursor: "pointer",
    color: "#143455",
    transition: "transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease",
  },
  choiceButtonActive: {
    background: "#eef5ff",
    borderColor: "#91bcff",
    boxShadow: "0 12px 24px rgba(31, 116, 255, 0.10)",
  },
  choiceKey: {
    minWidth: 36,
    width: 36,
    height: 36,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e8f2ff",
    color: "#2b69d9",
    fontWeight: 800,
    fontSize: 15,
    flexShrink: 0,
  },
  choiceKeyActive: {
    background: "#1f74ff",
    color: "#ffffff",
  },
  choiceLabel: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.68,
    fontWeight: 700,
  },
  navRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
    marginTop: 18,
  },
  analysisCard: {
    borderRadius: 0,
    padding: "24px 0",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },
  analysisTitle: {
    margin: "16px 0 0",
    fontSize: "clamp(25px, 5vw, 38px)",
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    color: "#102846",
  },
  analysisSubtitle: {
    margin: "12px 0 0",
    fontSize: 15,
    lineHeight: 1.8,
    color: "#56718f",
  },
  analysisPercent: {
    margin: "22px 0 10px",
    fontSize: 15,
    fontWeight: 800,
    color: "#1f74ff",
    textAlign: "right",
  },
  analysisTrack: {
    width: "100%",
    height: 16,
    borderRadius: 999,
    background: "#e6efff",
    overflow: "hidden",
    boxShadow: "inset 0 2px 8px rgba(31, 116, 255, 0.08)",
  },
  analysisFill: {
    position: "relative",
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #79bfff 0%, #1f74ff 55%, #0d56c8 100%)",
    transition: "width 100ms linear",
    overflow: "hidden",
  },
  analysisShine: {
    position: "absolute",
    top: 0,
    left: "-35%",
    width: "30%",
    height: "100%",
    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.62) 48%, rgba(255,255,255,0) 100%)",
    animation: "progressShine 1.7s linear infinite",
  },
  analysisStatusRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    fontSize: 13,
    lineHeight: 1.5,
    fontWeight: 700,
    color: "#6781a1",
  },
  analysisPromoCard: {
    marginTop: 24,
    borderRadius: 0,
    padding: "16px 0",
    background: "transparent",
    border: "none",
    boxShadow: "none",
    animation: "floatingCard 3.2s ease-in-out infinite",
  },
  analysisPromoImage: {
    width: "100%",
    display: "block",
    borderRadius: 20,
    objectFit: "cover",
    boxShadow: "none",
  },
  analysisPromoTitle: {
    margin: "16px 0 0",
    fontSize: 19,
    lineHeight: 1.5,
    color: "#12304d",
    fontWeight: 800,
    textAlign: "center",
  },
  analysisPromoDescription: {
    margin: "10px 0 0",
    fontSize: 15,
    lineHeight: 1.8,
    color: "#4f6b89",
    textAlign: "center",
  },
  resultWrap: {
    display: "grid",
    gap: 18,
  },
  resultCard: {
    borderRadius: 0,
    padding: "24px 0",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },
  scoreBox: {
    borderRadius: 0,
    background: "transparent",
    border: "none",
    padding: "22px 0",
    textAlign: "center",
  },
  scoreTitle: {
    margin: 0,
    fontSize: "clamp(26px, 5.8vw, 40px)",
    lineHeight: 1.18,
    letterSpacing: "-0.04em",
    color: "#0d4fa8",
    fontWeight: 900,
  },
  resultType: {
    margin: "14px 0 0",
    fontSize: 20,
    lineHeight: 1.5,
    color: "#17385c",
    fontWeight: 800,
  },
  resultPercent: {
    margin: "10px 0 0",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#1f74ff",
    fontWeight: 800,
  },
  resultDescription: {
    margin: "12px 0 0",
    fontSize: 15,
    lineHeight: 1.85,
    color: "#4f6b89",
  },
  sectionBox: {
    borderRadius: 0,
    background: "transparent",
    border: "none",
    padding: "18px 0",
    marginTop: 18,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#163b63",
    fontWeight: 800,
  },
  diagnosisList: {
    display: "grid",
    gap: 12,
    marginTop: 14,
  },
  diagnosisCard: {
    borderRadius: 18,
    padding: "16px 14px",
    background: "#ffffff",
    border: "1px solid #dce8ff",
  },
  diagnosisPart: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.5,
    color: "#17385c",
    fontWeight: 800,
  },
  diagnosisText: {
    margin: "10px 0 0",
    fontSize: 15,
    lineHeight: 1.85,
    color: "#4d6684",
  },
  firstActionCard: {
    borderRadius: 0,
    background: "transparent",
    border: "none",
    padding: "18px 0",
    marginTop: 16,
  },
  firstActionTitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.5,
    color: "#123a68",
    fontWeight: 800,
  },
  firstActionText: {
    margin: "12px 0 0",
    fontSize: 15,
    lineHeight: 1.9,
    color: "#35557c",
    whiteSpace: "pre-line",
  },
  resultButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginTop: 18,
  },
  ctaCard: {
    borderRadius: 0,
    padding: "22px 0",
    background: "transparent",
    border: "none",
    boxShadow: "none",
  },
  ctaTitle: {
    margin: 0,
    fontSize: "clamp(22px, 4.8vw, 30px)",
    lineHeight: 1.35,
    letterSpacing: "-0.03em",
    color: "#102846",
    fontWeight: 900,
  },
  ctaDescription: {
    margin: "14px 0 0",
    fontSize: 15,
    lineHeight: 1.85,
    color: "#516c88",
    whiteSpace: "pre-line",
  },
  ctaImage: {
    display: "block",
    width: "100%",
    maxWidth: 360,
    margin: "18px auto 0",
    borderRadius: 24,
  },
  ctaLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 18,
    padding: "16px 20px",
    borderRadius: 18,
    background: "linear-gradient(135deg, #2b8bff 0%, #1f74ff 55%, #1258cf 100%)",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 16,
    boxShadow: "0 14px 28px rgba(31, 116, 255, 0.24)",
  },
  toast: {
    position: "fixed",
    left: "50%",
    bottom: 22,
    transform: "translateX(-50%)",
    background: "#12304d",
    color: "#ffffff",
    padding: "12px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    boxShadow: "0 10px 24px rgba(18, 48, 77, 0.26)",
    zIndex: 40,
  },
};
function LossTest() {
  const [step, setStep] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [participantCount, incrementParticipantCount] = useParticipantCount(
    PARTICIPANT_COUNT_STORAGE_KEY,
    PARTICIPANT_COUNT_BASE,
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, currentIndex]);
  useEffect(() => {
    if (!toastMessage) return void 0;
    const timer = window.setTimeout(() => setToastMessage(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);
  useEffect(() => {
    if (step !== "analysis") return void 0;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / ANALYSIS_DURATION_MS) * 100));
      setAnalysisProgress(nextProgress);
      if (elapsed >= ANALYSIS_DURATION_MS) {
        window.clearInterval(timer);
        setStep("result");
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [step]);
  const currentQuestion = questions[currentIndex];
  const questionProgress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const analysisItem =
    ANALYSIS_ITEMS[Math.min(ANALYSIS_ITEMS.length - 1, Math.floor((analysisProgress / 100) * ANALYSIS_ITEMS.length))] ||
    ANALYSIS_ITEMS[0];
  const analysisTitle = `${analysisItem}${getObjectParticle(analysisItem)} 분석하고 있어요`;
  const totalScore = useMemo(() => {
    return answers.reduce((sum, answer) => sum + optionScores[answer], 0);
  }, [answers]);
  const resultInfo = useMemo(() => {
    return resultRanges.find((range) => totalScore >= range.min) || resultRanges[resultRanges.length - 1];
  }, [totalScore]);
  const detailedResults = useMemo(() => {
    return questions.map((question, index) => {
      const selectedKey = answers[index];
      const selectedOption = question.options.find((option) => option.key === selectedKey);
      return {
        key: question.key,
        part: question.part,
        score: selectedKey ? optionScores[selectedKey] : 0,
        diagnosis: selectedOption?.diagnosis || "",
      };
    });
  }, [answers]);
  const firstAction = useMemo(() => {
    if (answers.length !== questions.length) return null;
    const minScore = Math.min(...detailedResults.map((item) => item.score));
    const lowestParts = detailedResults.filter((item) => item.score === minScore).map((item) => item.key);
    const selectedKey = lowestPriority.find((key) => lowestParts.includes(key)) || lowestParts[0];
    return selectedKey ? firstActionMap[selectedKey] : null;
  }, [answers.length, detailedResults]);
  const shareText = `${TEST_TITLE} / 숨은 손해 관리지수 ${totalScore}점 / ${resultInfo.typeName}`;
  const startTest = () => {
    incrementParticipantCount();
    setAnswers([]);
    setCurrentIndex(0);
    setAnalysisProgress(0);
    setStep("quiz");
  };
  const restartTest = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setAnalysisProgress(0);
    setStep("intro");
  };
  const goPrev = () => {
    if (step !== "quiz") return;
    if (currentIndex === 0) {
      setStep("intro");
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };
  const selectOption = (optionKey: string) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = optionKey;
    setAnswers(nextAnswers);
    if (currentIndex === questions.length - 1) {
      setAnalysisProgress(0);
      setStep("analysis");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (!copied) {
      throw new Error("copy failed");
    }
  };
  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: TEST_TITLE,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (error) {
        if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
          return;
        }
      }
    }
    try {
      await copyToClipboard(`${shareText}
${window.location.href}`);
      setToastMessage("결과가 복사되었습니다");
    } catch {
      setToastMessage("복사에 실패했습니다");
    }
  };
  const handleBadayaCtaClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("android") > -1) {
      window.location.href = BADAYA_PLAY_STORE_URL;
      return;
    }
    if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) {
      window.location.href = BADAYA_APP_STORE_URL;
      return;
    }
    alert("바다야 앱은 모바일 기기에서 다운로드 가능합니다.");
  };
  return (
    <div style={styles.page}>
      <style>{`
        @keyframes progressShine {
          0% { transform: translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(440%); opacity: 0; }
        }

        @keyframes floatingCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <div style={styles.shell}>
        {step === "intro" && (
          <section style={styles.heroCard}>
            <div style={styles.topBadge}>6문항 / 약 1분 / 행동 중심 결과</div>
            <h1 style={styles.heroTitle}>{TEST_TITLE}</h1>
            <p style={styles.heroDescription}>{TEST_DESCRIPTION}</p>
            <div style={styles.introImageWrap}>
              <img
                src={INTRO_SAMPLE_IMAGE_URL}
                alt="사업의 숨은 손해를 점검하는 대표 이미지"
                style={styles.introImage}
              />
            </div>
            <div style={styles.participantCounter}>
              <p style={styles.participantCounterNumber}>{participantCount.toLocaleString("ko-KR")}</p>
              <p style={styles.participantCounterText}>명의 사용자들이 테스트에 참여했어요</p>
            </div>
            <div style={styles.buttonRow}>
              <button type="button" onClick={startTest} style={styles.primaryButton}>
                {START_BUTTON_TEXT}
              </button>
            </div>
          </section>
        )}
        {step === "quiz" && currentQuestion && (
          <section style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <div style={styles.topBadge}>
                {currentQuestion.number} {currentQuestion.part}
              </div>
              <p style={styles.questionCount}>
                {currentIndex + 1}
                {" / "}
                {questions.length}
              </p>
            </div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${questionProgress}%` }} />
            </div>
            <p style={styles.questionHint}>선택하면 다음 질문으로 이어집니다</p>
            <h2 style={styles.questionTitle}>{currentQuestion.question}</h2>
            <div style={styles.choices}>
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentIndex] === option.key;
                return (
                  <button
                    key={`${currentQuestion.key}-${option.key}`}
                    type="button"
                    onClick={() => selectOption(option.key)}
                    style={{
                      ...styles.choiceButton,
                      ...(isSelected ? styles.choiceButtonActive : {}),
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ ...styles.choiceKey, ...(isSelected ? styles.choiceKeyActive : {}) }}>
                        {option.key}
                      </div>
                      <p style={styles.choiceLabel}>{option.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={styles.navRow}>
              <button type="button" onClick={goPrev} style={styles.secondaryButton}>
                이전
              </button>
            </div>
          </section>
        )}
        {step === "analysis" && (
          <section style={styles.analysisCard}>
            <div style={styles.topBadge}>응답 분석 중</div>
            <h2 style={styles.analysisTitle}>{analysisTitle}</h2>
            <p style={styles.analysisSubtitle}>입력한 응답을 바탕으로 대표자 점수를 분석하고 있어요. 평균 8초 소요</p>
            <p style={styles.analysisPercent}>{analysisProgress}%</p>
            <div style={styles.analysisTrack}>
              <div style={{ ...styles.analysisFill, width: `${analysisProgress}%` }}>
                <div style={styles.analysisShine} />
              </div>
            </div>
            <div style={styles.analysisStatusRow}>
              <span>분석 진행 중</span>
              <span>{analysisItem}</span>
            </div>
            <div style={styles.analysisPromoCard}>
              <img src={ANALYSIS_PROMO_IMAGE_URL} alt="사업자 지원 앱 화면 이미지" style={styles.analysisPromoImage} />
              <h3 style={styles.analysisPromoTitle}>지원 혜택 탐색부터 신청 문서 작성까지 한 번에</h3>
              <p style={styles.analysisPromoDescription}>
                사업 조건에 맞는 지원 혜택을 찾아주고, 공고별 필요서류 체크리스트부터 나만의 AI로 신청서와
                사업계획서까지 작성해 주는 사업자 지원 앱입니다.
              </p>
            </div>
          </section>
        )}
        {step === "result" && (
          <div style={styles.resultWrap}>
            <section style={styles.resultCard}>
              <div style={styles.topBadge}>결과 요약</div>
              <div style={styles.scoreBox}>
                <h2 style={styles.scoreTitle}>
                  {"숨은 손해 관리지수 "}
                  {totalScore}점
                </h2>
                <p style={styles.resultType}>당신은 ‘{resultInfo.typeName}’입니다.</p>
                <p style={styles.resultPercent}>{resultInfo.percentText}</p>
                <p style={styles.resultDescription}>{resultInfo.description}</p>
              </div>
              <div style={styles.sectionBox}>
                <h3 style={styles.sectionTitle}>파트별 진단</h3>
                <div style={styles.diagnosisList}>
                  {detailedResults.map((item) => (
                    <div key={item.key} style={styles.diagnosisCard}>
                      <p style={styles.diagnosisPart}>{item.part}</p>
                      <p style={styles.diagnosisText}>{item.diagnosis}</p>
                    </div>
                  ))}
                </div>
              </div>
              {firstAction && (
                <div style={styles.firstActionCard}>
                  <h3 style={styles.firstActionTitle}>{firstAction.title}</h3>
                  <p style={styles.firstActionText}>{firstAction.body}</p>
                </div>
              )}
              <div style={styles.resultButtons}>
                <button type="button" onClick={restartTest} style={styles.secondaryButton}>
                  다시하기
                </button>
                <button type="button" onClick={shareResult} style={styles.primaryButton}>
                  결과 공유하기
                </button>
              </div>
            </section>
            <section style={styles.ctaCard}>
              <h3 style={styles.ctaTitle}>마케팅비/시설비/컨설팅비, 전부 내 돈으로만 쓰고 있나요?</h3>
              <p style={styles.ctaDescription}>
                {
                  "바다야는 내 사업조건에 맞는 지원사업을 찾고,\n공고별 필요서류와 신청서/사업계획서 초안까지\n쉽게 준비할 수 있게 도와드립니다."
                }
              </p>
              <img src={BADAYA_BG_IMAGE_URL} alt="지원 혜택 안내 이미지" style={styles.ctaImage} />
              <a href={BADAYA_PLAY_STORE_URL} onClick={handleBadayaCtaClick} style={styles.ctaLink}>
                내 지원혜택 확인하기
              </a>
            </section>
          </div>
        )}
      </div>
      {toastMessage && (
        <div aria-live="polite" style={styles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
export default LossTest;
