"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useParticipantCount } from "@/lib/useParticipantCount";
const PLAY_STORE_HREF = "https://play.google.com/store/apps/details?id=com.app.badayaa&hl=ko";
const APP_STORE_HREF =
  "https://apps.apple.com/kr/app/%EB%B0%94%EB%8B%A4%EC%95%BC-%EB%A7%9E%EC%B6%A4-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EC%8B%A0%EC%B2%AD/id6769259830";
const PARTICIPATION_COUNT_KEY = "startup-test-participation-count";
const PARTICIPATION_COUNT_START = 3746;
const ANALYSIS_DURATION_MS = 8e3;
const BADAYA_APP_IMAGE = "/images/badaya-app.png";
const ANALYSIS_STEPS = ["시장성", "고객 적합도", "수익 구조", "마케팅 준비도", "자금 계획", "실행 우선순위"];
const SCORE_MAP: Record<string, number> = {
  A: 16,
  B: 13,
  C: 10,
  D: 7,
};
const QUESTIONS = [
  {
    id: 1,
    partKey: "item",
    partTitle: "창업 아이템 검증력",
    question: "창업하려는 아이템에 대해 실제 고객 반응을 확인해본 적이 있나요?",
    options: [
      { key: "A", text: "실제 고객에게 판매/상담/예약 등 반응을 확인해봤다" },
      { key: "B", text: "주변 지인이나 잠재고객에게 의견을 들어봤다" },
      { key: "C", text: "시장조사나 경쟁사 분석 정도는 해봤다" },
      { key: "D", text: "아직 내 생각과 감으로 판단하고 있다" },
    ],
  },
  {
    id: 2,
    partKey: "customer",
    partTitle: "고객 이해도",
    question: "내 상품이나 서비스를 가장 먼저 사줄 고객이 누구인지 설명할 수 있나요?",
    options: [
      { key: "A", text: "구체적인 고객층과 구매 이유를 설명할 수 있다" },
      { key: "B", text: "대략적인 고객층은 알고 있다" },
      { key: "C", text: "타깃은 있지만 아직 넓고 모호하다" },
      { key: "D", text: "누구나 고객이 될 수 있다고 생각한다" },
    ],
  },
  {
    id: 3,
    partKey: "profit",
    partTitle: "수익 구조 이해도",
    question: "창업 후 매출과 비용 구조를 계산해본 적이 있나요?",
    options: [
      { key: "A", text: "예상 매출, 원가, 고정비, 손익분기점을 계산해봤다" },
      { key: "B", text: "대략적인 비용과 매출은 계산해봤다" },
      { key: "C", text: "초기비용 정도만 생각해봤다" },
      { key: "D", text: "아직 구체적으로 계산하지 않았다" },
    ],
  },
  {
    id: 4,
    partKey: "action",
    partTitle: "실행 준비도",
    question: "창업을 위해 지금까지 실제로 해본 행동은 무엇인가요?",
    options: [
      { key: "A", text: "사업자등록, 장소, 제품, 판매채널 등 핵심 준비가 진행 중이다" },
      { key: "B", text: "교육, 조사, 상담 등 준비 행동을 하고 있다" },
      { key: "C", text: "정보만 모으고 있다" },
      { key: "D", text: "아직 생각만 하고 있다" },
    ],
  },
  {
    id: 5,
    partKey: "marketing",
    partTitle: "마케팅/판매 준비도",
    question: "창업 후 첫 고객을 어떻게 확보할지 계획이 있나요?",
    options: [
      { key: "A", text: "구체적인 채널과 실행계획이 있다" },
      { key: "B", text: "인스타, 블로그, 플레이스 등 해볼 채널은 정했다" },
      { key: "C", text: "홍보가 필요하다는 정도만 알고 있다" },
      { key: "D", text: "좋은 상품이면 알아서 올 거라고 생각한다" },
    ],
  },
  {
    id: 6,
    partKey: "funding",
    partTitle: "자금/지원혜택 활용력",
    question: "창업자금이나 정부지원사업, 소상공인 지원혜택을 확인해본 적이 있나요?",
    options: [
      { key: "A", text: "내 조건에 맞는 지원사업을 찾아보고 신청 가능성까지 검토했다" },
      { key: "B", text: "몇 번 찾아봤지만 복잡해서 신청까지는 못 갔다" },
      { key: "C", text: "들어본 적은 있지만 내게 해당되는지 모른다" },
      { key: "D", text: "창업지원은 나와 상관없는 일이라고 생각했다" },
    ],
  },
];
const RESULT_BANDS = [
  {
    min: 90,
    max: Number.POSITIVE_INFINITY,
    typeName: "준비된 창업가형",
    percentileText: "창업 성공 준비도 테스트 기준 상위 3% 유형입니다.",
    summaryLine: "창업준비생 상위 3%에 해당하는 유형입니다.",
    description:
      "아이템, 고객, 수익 구조, 실행 계획이 전반적으로 잘 잡혀 있습니다. 이제는 모든 것을 직접 준비하려 하기보다 시간을 줄이고, 활용할 수 있는 자원과 기회를 빠르게 연결하는 것이 중요합니다.",
  },
  {
    min: 82,
    max: 89,
    typeName: "실행 직전형",
    percentileText: "창업 성공 준비도 테스트 기준 상위 10% 유형입니다.",
    summaryLine: "창업준비생 상위 10%에 해당하는 유형입니다.",
    description:
      "창업을 실제로 실행할 준비가 꽤 잘 되어 있습니다. 다만 고객 검증, 마케팅, 자금 계획, 지원혜택 활용 중 일부를 더 구체화하면 시작 후 흔들릴 가능성을 줄일 수 있습니다.",
  },
  {
    min: 70,
    max: 81,
    typeName: "가능성 있는 준비형",
    percentileText: "창업 성공 준비도 테스트 기준 상위 30% 유형입니다.",
    summaryLine: "창업준비생 상위 30%에 해당하는 유형입니다.",
    description:
      "창업 의지와 기본 준비는 있지만 아직 감으로 판단하는 영역이 남아 있습니다. 시작 전에 고객, 숫자, 마케팅, 자금 계획을 조금만 더 구체화하면 창업 리스크를 줄일 수 있습니다.",
  },
  {
    min: 58,
    max: 69,
    typeName: "아이디어 보완형",
    percentileText: "창업 성공 준비도 테스트 기준 평균권 유형입니다.",
    summaryLine: "창업준비생 평균권에 해당하는 유형입니다.",
    description:
      "창업 아이디어는 있지만 실제 시장에서 통할지, 어떻게 팔지, 얼마를 벌고 버틸지에 대한 준비가 더 필요합니다. 지금 바로 창업을 밀어붙이기보다 작은 검증부터 시작하는 것이 좋습니다.",
  },
  {
    min: Number.NEGATIVE_INFINITY,
    max: 57,
    typeName: "감으로 시작할 위험형",
    percentileText: "창업 성공 준비도 테스트 기준 관리가 필요한 유형입니다.",
    summaryLine: "창업 전 보완이 필요한 유형입니다.",
    description:
      "아직은 창업을 감과 의지만으로 시작할 위험이 있습니다. 아이템 검증, 고객 정의, 비용 계산, 마케팅 계획, 자금/지원혜택 확인 중 가장 부족한 부분부터 차근차근 보완해야 합니다.",
  },
];
const DIAGNOSIS_MAP: Record<string, Record<string, string>> = {
  item: {
    A: "아이템을 실제 고객 반응으로 검증하고 있습니다. 이제는 반응이 좋았던 고객군과 가격대를 더 좁혀보면 좋습니다.",
    B: "주변 의견을 들어본 것은 좋은 출발입니다. 다만 지인 반응과 실제 구매 반응은 다를 수 있으니, 예약/문의/소액 판매처럼 돈을 낼 고객 반응을 확인해보세요.",
    C: "시장조사와 경쟁사 분석은 필요하지만, 실제 고객 반응까지 확인해야 창업 리스크가 줄어듭니다. 같은 아이템을 팔고 있는 곳의 후기와 불만부터 모아보세요.",
    D: "아이템이 좋다는 확신만으로 시작하면 위험할 수 있습니다. 지인 10명이 아니라 실제 돈을 낼 고객 10명에게 먼저 반응을 확인해보세요.",
  },
  customer: {
    A: "첫 고객이 누구인지 잘 알고 있습니다. 이 고객이 왜 구매하는지까지 문장으로 정리하면 마케팅과 사업계획서가 훨씬 쉬워집니다.",
    B: "고객층은 어느 정도 잡혀 있습니다. 이제는 나이/지역/상황/구매 이유까지 좁혀서 “처음 사줄 고객 한 명”을 구체적으로 그려보세요.",
    C: "타깃이 너무 넓으면 마케팅 메시지가 흐려질 수 있습니다. 모든 사람을 잡으려 하기보다 가장 먼저 반응할 고객군 하나부터 정하세요.",
    D: "“누구나 고객”은 실제로는 아무에게도 선명하지 않을 수 있습니다. 가장 먼저 사줄 고객 한 사람을 구체적으로 그려보세요.",
  },
  profit: {
    A: "매출과 비용 구조를 잘 보고 있습니다. 이제는 예상보다 매출이 30% 낮아져도 버틸 수 있는지 보수적으로 계산해보세요.",
    B: "대략적인 계산은 했지만 더 구체화할 필요가 있습니다. 월 고정비, 원가, 인건비, 광고비를 나눠서 손익분기점을 다시 계산해보세요.",
    C: "초기비용만 보면 시작 후 운영자금에서 막힐 수 있습니다. 오픈 후 3개월 동안 버틸 고정비와 최소 매출 목표를 함께 계산해보세요.",
    D: "창업 전 숫자를 보지 않으면 시작 후 버티기 어려울 수 있습니다. 초기비용, 월 고정비, 한 달 최소 매출 목표부터 계산해보세요.",
  },
  action: {
    A: "실행 준비가 빠르게 진행되고 있습니다. 이제는 오픈 전 체크리스트를 만들어 빠진 행정/서류/마케팅 준비를 점검하세요.",
    B: "준비 행동을 시작한 것은 좋습니다. 이제는 조사에서 멈추지 말고 견적 문의, 고객 인터뷰, 테스트 판매처럼 결과가 남는 행동으로 넘어가세요.",
    C: "정보만 모으다 보면 실행이 계속 미뤄질 수 있습니다. 이번 주에는 시장조사 글을 더 읽기보다 실제 고객 3명에게 아이템을 설명해보세요.",
    D: "아이디어만 오래 붙잡고 있으면 창업은 계속 미뤄질 수 있습니다. 이번 주에 시장조사, 고객 인터뷰, 견적 문의 중 하나만 실행해보세요.",
  },
  marketing: {
    A: "고객을 데려올 계획이 구체적입니다. 이제는 채널별로 첫 2주 동안 올릴 콘텐츠와 광고 테스트 비용을 정해보세요.",
    B: "채널을 정한 것은 좋은 시작입니다. 인스타/블로그/플레이스 중 하나를 골라 오픈 전 콘텐츠 10개를 미리 준비해보세요.",
    C: "홍보가 필요하다는 인식은 있지만 실행계획이 부족합니다. 첫 고객을 어디서 만날지 정하고, 그 채널에 맞는 첫 게시물부터 만들어보세요.",
    D: "좋은 상품이어도 고객이 모르면 팔리지 않습니다. 오픈 전부터 네이버 플레이스, 인스타그램, 블로그 중 하나는 반드시 준비해두세요.",
  },
  funding: {
    A: "창업자금과 지원혜택까지 챙기는 감각이 좋습니다. 이제는 공고를 찾는 것보다 내가 실제로 신청 가능한지, 어떤 서류가 필요한지, 어떤 문서를 작성해야 하는지 빠르게 확인하는 것이 중요합니다. 바다야를 활용하면 내 사업조건에 맞는 지원사업부터 공고별 필요서류와 신청서/사업계획서 작성 가이드까지 더 쉽게 준비할 수 있습니다.",
    B: "지원사업에 관심은 있지만 신청까지 이어지는 과정에서 막히는 유형입니다. 공고 원문은 복잡하고, 자격요건/필요서류/작성서류를 직접 확인해야 해서 포기하기 쉽습니다. 바다야는 내 사업조건에 맞는 공고를 선별하고, 공고별 실제 필요서류와 작성문서 가이드까지 정리해주기 때문에 신청 준비의 부담을 줄일 수 있습니다.",
    C: "받을 수 있는 창업지원 혜택을 놓치고 있을 가능성이 있습니다. 창업 초기에는 마케팅, 시설개선, 교육, 컨설팅, 온라인 전환 등 다양한 지원혜택이 있을 수 있지만, 내 조건에 맞는지 직접 확인하기 어렵습니다. 바다야에서 사업자 정보 기준으로 가능성 높은 지원사업을 먼저 확인해보면, 놓치고 있던 기회를 발견할 수 있습니다.",
    D: "창업지원은 남의 일이 아닐 수 있습니다. “나는 해당 안 되겠지”라고 생각하는 순간, 받을 수 있는 혜택도 함께 지나갈 수 있습니다. 바다야는 내 사업조건에 맞는 지원사업을 찾아주고, 공고별 필요서류와 신청서/사업계획서 작성 가이드까지 쉽게 준비할 수 있도록 도와줍니다. 창업을 준비 중이라면, 바다야에서 내 창업 지원혜택부터 확인해보는 것이 좋습니다.",
  },
};
const IMPROVEMENT_MAP: Record<string, { title: string; lines: string[] }> = {
  item: {
    title: "창업 아이템 검증력",
    lines: [
      "아이템이 좋다는 확신만으로 시작하면 실제 시장에서 반응이 다를 수 있습니다.",
      "창업 전에 최소한 실제 고객 10명에게 반응을 확인해보세요.",
      "가능하다면 예약, 문의, 소액 결제, 체험 신청처럼 행동으로 이어지는 반응을 보는 것이 좋습니다.",
      "말로만 “좋다”는 반응보다 실제 행동이 창업 성공 가능성을 더 정확하게 보여줍니다.",
    ],
  },
  customer: {
    title: "고객 이해도",
    lines: [
      "고객이 흐리면 상품, 가격, 마케팅 메시지가 모두 흐려집니다.",
      "먼저 “가장 먼저 사줄 고객 한 사람”을 정해보세요.",
      "나이, 지역, 직업, 상황, 불편함, 구매 이유를 구체적으로 적어보면 어떤 말로 홍보해야 할지 훨씬 선명해집니다.",
      "처음부터 모두를 잡으려 하기보다 가장 반응이 빠를 고객군 하나부터 시작하는 것이 좋습니다.",
    ],
  },
  profit: {
    title: "수익 구조 이해도",
    lines: [
      "창업은 매출보다 버틸 수 있는 숫자가 먼저입니다.",
      "초기비용, 월 고정비, 원가, 인건비, 광고비를 적고 한 달에 최소 얼마를 팔아야 버틸 수 있는지 계산해보세요.",
      "예상 매출이 30% 낮아져도 버틸 수 있는지 확인하면 시작 후 흔들릴 가능성을 줄일 수 있습니다.",
    ],
  },
  action: {
    title: "실행 준비도",
    lines: [
      "창업은 생각보다 작은 행동에서 빨라집니다.",
      "이번 주에 고객 인터뷰 3명, 경쟁 매장 방문 2곳, 견적 문의 1건 중 하나라도 실행해보세요.",
      "정보를 더 모으는 것보다 실제 행동 하나가 창업 가능성을 더 빠르게 확인해줍니다.",
    ],
  },
  marketing: {
    title: "마케팅/판매 준비도",
    lines: [
      "좋은 상품이어도 고객이 모르면 팔리지 않습니다.",
      "오픈 전부터 고객을 만날 채널 하나를 정하세요.",
      "오프라인 매장이라면 네이버 플레이스 정보/대표사진/영업시간부터 정리하고, 온라인 사업이라면 인스타그램이나 블로그에 오픈 전 콘텐츠 10개를 먼저 준비해보세요.",
      "첫 고객은 오픈 후 찾는 것이 아니라 오픈 전부터 만들어야 합니다.",
    ],
  },
  funding: {
    title: "자금/지원혜택 활용력",
    lines: [
      "창업을 준비할 때 자금 계획은 매우 중요합니다.",
      "하지만 많은 예비창업자가 창업자금, 정부지원사업, 소상공인 지원혜택을 제대로 확인하지 못한 채 자기 자금만으로 시작하려고 합니다.",
      "창업 초기에는 마케팅비, 시설개선, 교육, 컨설팅, 온라인 전환, 고용지원처럼 사업 준비에 도움이 되는 혜택이 있을 수 있습니다.",
      "문제는 공고마다 자격요건, 필요서류, 작성서류가 다르기 때문에 직접 찾고 확인하는 과정이 어렵다는 점입니다.",
      "바다야에서 내 사업조건에 맞는 창업 지원혜택을 먼저 확인해보세요.",
      "맞춤 공고 확인부터 실제 필요서류 체크, 신청서/사업계획서 작성 준비까지 더 쉽게 진행할 수 있습니다.",
    ],
  },
};
const LOWEST_PRIORITY = ["funding", "profit", "marketing", "item", "customer", "action"];
const formatScoreText = (score: number) => `${score}점`;
const getResultBand = (score: number) =>
  RESULT_BANDS.find((band) => score >= band.min && score <= band.max) || RESULT_BANDS[2];
const getLowestPartKey = (answers: string[]) => {
  const summary = QUESTIONS.map((question) => ({
    partKey: question.partKey,
    score: SCORE_MAP[answers[question.id - 1]],
  }));
  return summary.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return LOWEST_PRIORITY.indexOf(a.partKey) - LOWEST_PRIORITY.indexOf(b.partKey);
  })[0].partKey;
};
const StartupTest = () => {
  const [step, setStep] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(null));
  const [toastMessage, setToastMessage] = useState("");
  const [participationCount, incrementParticipationCount] = useParticipantCount(
    PARTICIPATION_COUNT_KEY,
    PARTICIPATION_COUNT_START,
  );
  const [loadingProgress, setLoadingProgress] = useState(0);
  useEffect(() => {
    if (!toastMessage) return void 0;
    const timer = window.setTimeout(() => setToastMessage(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);
  useEffect(() => {
    if (step !== "loading") return void 0;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / ANALYSIS_DURATION_MS) * 100));
      setLoadingProgress(nextProgress);
      if (elapsed >= ANALYSIS_DURATION_MS) {
        window.clearInterval(timer);
        setLoadingProgress(100);
        setStep("result");
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [step]);
  const currentQuestion = QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);
  const result = useMemo(() => {
    const hasAllAnswers = answers.every(Boolean);
    if (!hasAllAnswers) return null;
    const score = answers.reduce((total, answer) => total + SCORE_MAP[answer], 0);
    const band = getResultBand(score);
    const lowestPartKey = getLowestPartKey(answers);
    return {
      score,
      band,
      lowestPartKey,
      diagnostics: QUESTIONS.map((question, index) => ({
        partTitle: question.partTitle,
        partKey: question.partKey,
        choice: answers[index],
        diagnosis: DIAGNOSIS_MAP[question.partKey][answers[index]],
      })),
    };
  }, [answers]);
  const loadingStepIndex = Math.min(
    ANALYSIS_STEPS.length - 1,
    Math.floor((loadingProgress / 100) * ANALYSIS_STEPS.length),
  );
  const currentAnalysisStep = ANALYSIS_STEPS[loadingStepIndex] || ANALYSIS_STEPS[0];
  const startTest = () => {
    incrementParticipationCount();
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentIndex(0);
    setLoadingProgress(0);
    setStep("quiz");
  };
  const goPrev = () => {
    if (currentIndex === 0) {
      setStep("intro");
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };
  const restartTest = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setCurrentIndex(0);
    setLoadingProgress(0);
    setStep("intro");
  };
  const handleSelect = (choice: string) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = choice;
    setAnswers(nextAnswers);
    if (currentIndex === QUESTIONS.length - 1) {
      setLoadingProgress(0);
      setStep("loading");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };
  const getShareText = () => {
    if (!result) return "나의 창업 성공 가능성은 몇 점일까? / 창업 준비도 테스트";
    return `나의 창업 성공 가능성은 몇 점일까? / ${formatScoreText(result.score)} / ${result.band.typeName} / ${window.location.href}`;
  };
  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };
  const shareResult = async () => {
    const shareText = getShareText();
    if (navigator.share && result) {
      try {
        await navigator.share({
          title: "나의 창업 성공 가능성은 몇 점일까?",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
      }
    }
    try {
      await copyText(shareText);
      setToastMessage("결과가 복사되었습니다");
    } catch {
      setToastMessage("복사에 실패했습니다");
    }
  };
  const openBadayaAppStore = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("android") > -1) {
      window.location.href = PLAY_STORE_HREF;
      return;
    }
    if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) {
      window.location.href = APP_STORE_HREF;
      return;
    }
    window.alert("바다야 앱은 모바일 기기에서 다운로드 가능합니다.");
  };
  const wrapperStyle: CSSProperties = {
    minHeight: "100vh",
    background: "#ffffff",
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    wordBreak: "keep-all",
    color: "#11304f",
  };
  const shellStyle: CSSProperties = {
    maxWidth: 720,
    margin: "0 auto",
    padding: "24px 16px 72px",
  };
  const surfaceStyle: CSSProperties = {
    background: "#ffffff",
    border: "none",
    borderRadius: 28,
    boxShadow: "0 20px 50px rgba(40, 110, 210, 0.08)",
  };
  const secondaryButtonStyle: CSSProperties = {
    width: "100%",
    border: "none",
    borderRadius: 18,
    background: "#ffffff",
    color: "#1d4f91",
    fontSize: 16,
    fontWeight: 700,
    padding: "14px 20px",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(34, 116, 255, 0.08)",
  };
  const accentButtonStyle: CSSProperties = {
    width: "100%",
    border: "1px solid #1b72ff",
    borderRadius: 18,
    background: "linear-gradient(135deg, #1b72ff 0%, #41a6ff 100%)",
    color: "#ffffff",
    fontSize: 17,
    fontWeight: 800,
    padding: "14px 20px",
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(34, 116, 255, 0.28)",
  };
  const optionButtonStyle = (selected: boolean): CSSProperties => ({
    width: "100%",
    textAlign: "left",
    borderRadius: 22,
    border: "none",
    background: "#ffffff",
    color: "#173b68",
    padding: "15px 18px 15px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: selected ? "0 14px 28px rgba(78, 151, 255, 0.18)" : "0 10px 22px rgba(40, 110, 210, 0.06)",
  });
  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "8px 12px",
    background: "#ffffff",
    color: "#2463b7",
    fontSize: 13,
    fontWeight: 700,
    boxShadow: "0 8px 18px rgba(40, 110, 210, 0.08)",
  };
  const labelStyle: CSSProperties = {
    fontSize: 13,
    fontWeight: 700,
    color: "#4e7fc2",
    letterSpacing: "-0.01em",
  };
  return (
    <div style={wrapperStyle}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { min-height: 100%; }
        button, a { font-family: inherit; }
        .hover-lift:hover { transform: translateY(-1px); }
        .option-card:hover { transform: translateY(-2px); box-shadow: 0 16px 28px rgba(73, 137, 255, 0.14); }
        .analysis-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.32) 48%, rgba(255,255,255,0) 100%);
          animation: analysisShine 1.6s linear infinite;
        }
        .analysis-card {
          animation: analysisFloat 2.8s ease-in-out infinite;
        }
        @keyframes analysisShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes analysisFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @media (max-width: 640px) {
          .result-grid { grid-template-columns: 1fr !important; }
          .summary-grid { grid-template-columns: 1fr !important; }
          .button-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
      <div style={shellStyle}>
        {step === "intro" && (
          <div
            style={{
              marginBottom: 14,
              padding: "0 4px",
              fontSize: 15,
              fontWeight: 800,
              color: "#0d325f",
              letterSpacing: "-0.02em",
            }}
          >
            창업 성공 준비도 테스트 (6문항, 약1분)
          </div>
        )}
        {step === "intro" && (
          <section style={{ ...surfaceStyle, padding: "28px 22px 24px" }}>
            <div
              style={{
                padding: "22px 20px",
                borderRadius: 24,
                background: "#ffffff",
                border: "none",
                marginBottom: 18,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(21px, 4.2vw, 29px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                  color: "#0d325f",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                나의 창업 성공 가능성은 몇 점?
              </h1>
              <div
                style={{
                  marginTop: 18,
                  borderRadius: 24,
                  overflow: "hidden",
                  background: "#ffffff",
                }}
              >
                <img
                  src="/images/startup-intro.jpg"
                  alt="아이템, 고객, 수익, 마케팅, 자금 항목을 상징하는 세로형 막대 그래프 이미지"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            <p
              style={{
                margin: "0 0 12px",
                textAlign: "center",
                fontSize: 16,
                lineHeight: 1.7,
                color: "#315b8f",
              }}
            >
              현재 창업에 대한 나의 준비 상태를
              <br />
              확인해 보세요
            </p>
            <button type="button" style={accentButtonStyle} className="hover-lift" onClick={startTest}>
              창업 성공 가능성 테스트 시작
            </button>
            <div
              style={{
                marginTop: 14,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 6,
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(32px, 8vw, 46px)",
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#2a6dff",
                }}
              >
                {participationCount.toLocaleString("ko-KR")}
              </span>
              <span
                style={{
                  fontSize: "clamp(16px, 3.6vw, 22px)",
                  lineHeight: 1.3,
                  fontWeight: 800,
                  color: "#294f7d",
                  letterSpacing: "-0.02em",
                }}
              >
                명의 예비 창업자가 참여했어요
              </span>
            </div>
          </section>
        )}
        {step === "quiz" && (
          <section style={{ ...surfaceStyle, padding: "24px 20px" }}>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 12,
                }}
              >
                <span style={badgeStyle}>
                  {"진행률 "}
                  {progressPercent}%
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#4b76b1" }}>
                  {currentIndex + 1}
                  {" / "}
                  {QUESTIONS.length}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 10,
                  borderRadius: 999,
                  background: "#f7faff",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: "#2f7eff",
                    transition: "width 0.25s ease",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                borderRadius: 24,
                padding: "22px 18px",
                background: "#ffffff",
                border: "none",
                marginBottom: 18,
              }}
            >
              <div
                style={{ ...labelStyle, marginBottom: 10 }}
              >{`Q${currentQuestion.id} / ${currentQuestion.partTitle}`}</div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 5vw, 32px)",
                  lineHeight: 1.35,
                  color: "#14385f",
                  letterSpacing: "-0.03em",
                }}
              >
                {currentQuestion.question}
              </h2>
            </div>
            <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
              {currentQuestion.options.map((option) => {
                const selected = answers[currentIndex] === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    className="option-card"
                    style={optionButtonStyle(selected)}
                    onClick={() => handleSelect(option.key)}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: selected ? "#2e7cff" : "#edf4ff",
                          color: selected ? "#ffffff" : "#3266ad",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 15,
                        }}
                      >
                        {option.key}
                      </div>
                      <div style={{ fontSize: 16, lineHeight: 1.65, fontWeight: 600 }}>{option.text}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="button-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              <button type="button" style={secondaryButtonStyle} onClick={goPrev}>
                {currentIndex === 0 ? "시작 화면으로" : "이전 질문으로"}
              </button>
            </div>
          </section>
        )}
        {step === "loading" && (
          <section style={{ display: "grid", gap: 16 }}>
            <div style={{ ...surfaceStyle, padding: "26px 20px" }}>
              <div style={{ ...badgeStyle, marginBottom: 14 }}>결과 분석 중</div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 5vw, 32px)",
                  lineHeight: 1.35,
                  color: "#14385f",
                  letterSpacing: "-0.03em",
                }}
              >
                {currentAnalysisStep}를 분석하고 있어요
              </h2>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "#47698f",
                }}
              >
                입력한 응답을 바탕으로 창업 준비도와 우선 보완 포인트를 정리하고 있어요. 평균 8초 소요
              </p>
              <div style={{ marginTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#2b5f9d" }}>
                    {"현재 분석: "}
                    {currentAnalysisStep}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#2f7eff" }}>{loadingProgress}%</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 14,
                    borderRadius: 999,
                    background: "#eaf2ff",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="analysis-progress"
                    style={{
                      position: "relative",
                      width: `${loadingProgress}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #2f7eff 0%, #55b2ff 100%)",
                      transition: "width 0.08s linear",
                      overflow: "hidden",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ ...surfaceStyle, padding: "22px 18px" }}>
              <div
                className="analysis-card"
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  background: "#f5f9ff",
                  boxShadow: "0 18px 36px rgba(40, 110, 210, 0.10)",
                }}
              >
                <img
                  src={BADAYA_APP_IMAGE}
                  alt="사업자 지원 앱 화면 이미지"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div style={{ marginTop: 18 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "clamp(22px, 4.6vw, 28px)",
                    lineHeight: 1.4,
                    color: "#14385f",
                    letterSpacing: "-0.03em",
                  }}
                >
                  지원 혜택 탐색부터 신청 문서 작성까지 한 번에
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#47698f",
                  }}
                >
                  사업 조건에 맞는 지원 혜택을 찾아주고, 공고별 필요서류 체크리스트부터 나만의 AI로 신청서와
                  사업계획서까지 작성해 주는 사업자 지원 앱입니다.
                </p>
              </div>
            </div>
          </section>
        )}
        {step === "result" && result && (
          <section style={{ display: "grid", gap: 16 }}>
            <div style={{ ...surfaceStyle, padding: "26px 20px" }}>
              <div
                style={{
                  borderRadius: 24,
                  background: "#ffffff",
                  color: "#163e70",
                  padding: "24px 20px",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, opacity: 0.9, marginBottom: 8 }}>창업 준비 점수</div>
                <h1
                  style={{ margin: 0, fontSize: "clamp(30px, 6vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.04em" }}
                >
                  {formatScoreText(result.score)}
                </h1>
                <p style={{ margin: "14px 0 0", fontSize: 18, lineHeight: 1.7, fontWeight: 800 }}>
                  당신은 &quot;{result.band.typeName}
                  {'"으로 '}
                  {result.band.summaryLine}
                </p>
              </div>
              <div style={{ padding: "2px 2px 0" }}>
                <div style={{ ...labelStyle, marginBottom: 10 }}>나의 창업 준비 상태 요약</div>
                <p style={{ margin: 0, color: "#294f7d", fontSize: 16, lineHeight: 1.8 }}>{result.band.description}</p>
              </div>
            </div>
            <div style={{ ...surfaceStyle, padding: "22px 18px" }}>
              <div style={{ ...labelStyle, marginBottom: 14 }}>파트별 진단 결과</div>
              <div className="result-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {result.diagnostics.map((item) => (
                  <div
                    key={item.partKey}
                    style={{
                      borderRadius: 20,
                      border: "none",
                      background: "#ffffff",
                      padding: "16px 15px",
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#1a4d8c", marginBottom: 10 }}>
                      {item.partTitle}
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.75, color: "#47698f" }}>{item.diagnosis}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...surfaceStyle, padding: "22px 18px" }}>
              <div
                style={{
                  borderRadius: 22,
                  padding: "18px 16px",
                  background: "#ffffff",
                  border: "none",
                }}
              >
                <div style={{ ...labelStyle, marginBottom: 10 }}>가장 먼저 보완할 것</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#163e70", lineHeight: 1.35, marginBottom: 12 }}>
                  {IMPROVEMENT_MAP[result.lowestPartKey].title}
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {IMPROVEMENT_MAP[result.lowestPartKey].lines.map((line) => (
                    <p key={line} style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "#486b91" }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ ...surfaceStyle, padding: "18px" }}>
              <div
                className="button-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}
              >
                <button type="button" style={accentButtonStyle} onClick={restartTest}>
                  다시
                </button>
                <button type="button" style={accentButtonStyle} onClick={shareResult}>
                  공유
                </button>
              </div>
              <div
                style={{
                  borderRadius: 24,
                  border: "none",
                  background: "#ffffff",
                  color: "#163e70",
                  padding: "22px 18px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 18px",
                    fontSize: 16,
                    lineHeight: 1.6,
                    letterSpacing: "-0.02em",
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  창업자금, 내 돈 부터 쓰지 말고
                  <br />
                  받을 수 있는 혜택부터 확인하세요.
                </h3>
                <img
                  src="/images/badaya-gom.png"
                  alt="바다야 캐릭터 이미지"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    marginTop: 14,
                  }}
                />
                <button
                  type="button"
                  onClick={openBadayaAppStore}
                  style={{
                    ...accentButtonStyle,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "calc(100% + 36px)",
                    marginLeft: -18,
                    marginRight: -18,
                    marginTop: 14,
                  }}
                >
                  창업 지원 혜택 확인
                </button>
                <p
                  style={{
                    margin: "14px 0 0",
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#47698f",
                    textAlign: "center",
                  }}
                >
                  지원 혜택을 찾아주고, 공고별 필요서류 체크부터 신청서, 사업계획서 등<br />
                  문서 작성까지 도와주는 사업자를 위한 실전형 지원사업 신청 앱입니다.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 24,
            transform: "translateX(-50%)",
            background: "#ffffff",
            color: "#11304f",
            padding: "12px 16px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 12px 30px rgba(10, 31, 53, 0.22)",
            zIndex: 20,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};
export default StartupTest;
