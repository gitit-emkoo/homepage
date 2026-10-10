"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useParticipantCount } from "@/lib/useParticipantCount";
const BADAYA_ANDROID_HREF = "https://play.google.com/store/apps/details?id=com.app.badayaa&hl=ko";
const BADAYA_IOS_HREF =
  "https://apps.apple.com/kr/app/%EB%B0%94%EB%8B%A4%EC%95%BC-%EB%A7%9E%EC%B6%A4-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EC%8B%A0%EC%B2%AD/id6769259830";
const TEST_TITLE = "나는 대표로서 몇 점일까?";
const TEST_SUBTITLE = "사업을 운영하는 대표로서\n능력 지수와 성장 준비도를 확인해 보세요";
const START_BUTTON_TEXT = "대표자 운영 점수 테스트";
const INTRO_SAMPLE_IMAGE_URL = "/images/ceo-intro.jpg";
const BADAYA_BG_IMAGE_URL = "/images/badaya-gom.png";
const ANALYSIS_PROMO_IMAGE_URL = "/images/badaya-app.png";
const PARTICIPANT_COUNT_BASE = 3247;
const PARTICIPANT_COUNT_STORAGE_KEY = "badaya-participant-count";
const ANALYSIS_DURATION_MS = 8e3;
const ANALYSIS_ITEMS = ["사업 이해도", "마케팅 실행력", "운영 관리력", "세무 기본기", "지원사업 활용력", "성장 준비도"];
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
const resultRanges = [
  {
    min: 90,
    typeName: "준비된 성장형 대표",
    percentText: "3%",
    description:
      "사업 방향, 실행력, 운영 관리, 성장 준비가 전반적으로 잘 잡혀 있습니다. 이제는 더 많은 일을 직접 하려 하기보다, 시간을 줄이고 기회를 빠르게 잡는 것이 중요합니다.",
  },
  {
    min: 82,
    typeName: "실행력 좋은 대표",
    percentText: "10%",
    description:
      "사업을 움직이는 실행력이 좋고 기본기도 탄탄한 편입니다. 다만 일부 영역에서 반복적으로 놓치는 부분을 보완하면 더 안정적으로 성장할 수 있습니다.",
  },
  {
    min: 70,
    typeName: "현실형 운영 대표",
    percentText: "30%",
    description:
      "사업을 잘 운영하고 있지만 바쁜 일상 속에서 마케팅, 서류, 지원혜택, 성장계획처럼 당장 급해 보이지 않는 영역을 놓칠 수 있습니다.",
  },
  {
    min: 58,
    typeName: "바쁘지만 놓치는 게 많은 대표",
    percentText: "50%",
    description:
      "매일 열심히 사업을 운영하고 있지만, 대표가 챙겨야 할 중요한 영역들이 뒤로 밀리고 있을 수 있습니다. 작은 루틴부터 정리하면 사업 관리력이 크게 올라갑니다.",
  },
  {
    min: 0,
    typeName: "혼자 버티는 대표",
    percentText: "70%",
    description:
      "지금은 혼자 많은 일을 감당하느라 사업관리와 성장 기회를 챙기기 어려운 상태일 수 있습니다. 모든 걸 한 번에 바꾸기보다 가장 막히는 영역 하나부터 정리하는 것이 좋습니다.",
  },
];
const lowestPriority = ["marketing", "benefits", "documents", "operations", "growth", "business"];
const firstActionMap: Record<string, { title: string; body: string }> = {
  business: {
    title: "가장 먼저 챙길 것: 사업 이해도",
    body: "사업을 잘 설명하지 못하면 마케팅, 고객응대, 지원사업 신청서 작성까지 모두 흐려질 수 있습니다.\n오늘 바로 “내가 파는 것 / 고객이 원하는 것 / 우리를 선택해야 하는 이유”를 각각 한 줄씩 적어보세요.\n이 3문장이 정리되면 소개글, 광고 문구, 신청서 작성이 훨씬 쉬워집니다.",
  },
  marketing: {
    title: "가장 먼저 챙길 것: 마케팅 실행력",
    body: "좋은 상품이나 서비스를 갖고 있어도 고객에게 꾸준히 보여주지 않으면 선택받기 어렵습니다.\n이번 주에 바로 올릴 수 있는 콘텐츠 3개부터 정해보세요.\n1. 고객이 좋아했던 후기 1개\n2. 상품 또는 서비스 사진 1개\n3. 사장님이 직접 설명하는 짧은 이야기 1개\n이 3가지만 반복해도 “운영 중인 사업”이라는 신뢰가 생기고, 검색·방문·문의로 이어질 가능성이 높아집니다.",
  },
  operations: {
    title: "가장 먼저 챙길 것: 운영 관리력",
    body: "사업 운영은 감으로만 보면 늦게 흔들립니다.\n오늘부터 매출, 임대료, 인건비, 광고비 4가지만 메모장이나 엑셀에 적어보세요.\n한 달만 기록해도 어디서 돈이 새는지, 어떤 비용을 줄여야 하는지 보이기 시작합니다.",
  },
  documents: {
    title: "가장 먼저 챙길 것: 세금·서류 기본기",
    body: "서류를 필요할 때마다 찾으면 신청, 계약, 지원사업 준비 과정에서 시간이 오래 걸립니다.\n먼저 사업자등록증, 통장사본, 국세납세증명서, 지방세납세증명서, 중소기업확인서처럼 자주 쓰는 서류를 한 폴더에 정리해보세요.\n서류 준비가 빨라지면 좋은 기회가 왔을 때 바로 움직일 수 있습니다.",
  },
  benefits: {
    title: "가장 먼저 챙길 것: 지원혜택 활용력",
    body: "지원사업은 나와 상관없는 일이라고 생각하는 순간, 받을 수 있는 혜택도 함께 지나갈 수 있습니다.\n마케팅비, 시설개선, 고용지원, 컨설팅, 온라인 전환처럼 사업 운영에 도움이 되는 혜택이 있을 수 있습니다.\n바다야에서 사업자등록증 기준으로 내 사업조건에 맞는 지원혜택부터 확인해보세요.",
  },
  growth: {
    title: "가장 먼저 챙길 것: 성장 준비도",
    body: "사업을 키우고 싶다면 먼저 목표를 작게 쪼개야 합니다.\n이번 달 목표를 “신규 고객 10명 만들기”, “네이버 플레이스 사진 5장 새로 등록”, “광고비 10만 원 테스트”처럼 숫자로 정해보세요.\n작고 측정 가능한 목표가 있어야 다음 행동이 분명해집니다.",
  },
};
const questions = [
  {
    key: "business",
    number: "Q1.",
    part: "사업 이해도",
    question: "우리 사업의 강점과 차별점을 한 문장으로 설명할 수 있나요?",
    options: [
      {
        key: "A",
        label: "명확하게 말할 수 있고, 고객에게도 자주 설명한다",
        diagnosis:
          "사업의 핵심을 잘 이해하고 있습니다. 이 강점을 “고객이 왜 우리를 선택해야 하는가?”라는 한 문장으로 만들어 프로필, 소개글, 신청서에 반복해서 사용해보세요.",
      },
      {
        key: "B",
        label: "대략 말할 수 있지만 문장으로 정리되진 않았다",
        diagnosis:
          "사업 방향은 잡혀 있지만 표현이 조금 흐릴 수 있습니다. 고객 후기 5개를 모아 반복해서 나오는 단어를 찾아보세요. 그 단어가 실제 고객이 느끼는 강점일 가능성이 높습니다.",
      },
      {
        key: "C",
        label: "생각은 해봤지만 아직 모호하다",
        diagnosis:
          "사업의 장점은 있지만 아직 정리가 부족합니다. “우리 고객은 누구인가 / 고객이 불편한 점은 무엇인가 / 우리는 어떻게 해결하는가” 이 3문장부터 적어보세요.",
      },
      {
        key: "D",
        label: "잘 모르겠고, 그냥 열심히 운영 중이다",
        diagnosis:
          "지금은 감으로 운영하는 상태에 가깝습니다. 오늘 바로 종이에 “내가 파는 것, 사는 사람, 선택받는 이유”를 각각 한 줄씩 써보세요.",
      },
    ],
  },
  {
    key: "marketing",
    number: "Q2.",
    part: "마케팅 실행력",
    question: "현재 사업 홍보를 위해 꾸준히 운영 중인 채널이 있나요?",
    options: [
      {
        key: "A",
        label: "2개 이상 꾸준히 운영하고 성과도 확인한다",
        diagnosis:
          "마케팅 실행력이 좋습니다. 이제는 조회수보다 실제 문의·방문·구매로 이어진 게시물을 따로 표시해 어떤 콘텐츠가 매출에 가까운지 확인해보세요.",
      },
      {
        key: "B",
        label: "1개 이상 운영하지만 꾸준함은 부족하다",
        diagnosis:
          "채널은 운영 중이지만 꾸준함이 부족할 수 있습니다. 이번 주부터 게시물 3개만 고정해보세요. 상품 소개 1개, 고객 후기 1개, 사장님 이야기 1개면 충분합니다.",
      },
      {
        key: "C",
        label: "만들어두긴 했지만 거의 관리하지 못한다",
        diagnosis:
          "채널이 있어도 방치되면 신뢰를 만들기 어렵습니다. 새 콘텐츠를 만들기 어렵다면 기존 고객 후기, 메뉴 사진, 작업 전후 사진부터 다시 올려보세요.",
      },
      {
        key: "D",
        label: "별도 마케팅 채널이 없다",
        diagnosis:
          "마케팅 기반이 약한 상태입니다. 오늘 바로 네이버 플레이스 정보, 대표사진, 영업시간, 전화번호부터 점검하세요. 오프라인 사업자는 이것만 정리해도 기본 노출력이 달라집니다.",
      },
    ],
  },
  {
    key: "operations",
    number: "Q3.",
    part: "운영 관리력",
    question: "매달 매출, 고정비, 주요 비용 흐름을 확인하고 있나요?",
    options: [
      {
        key: "A",
        label: "매달 정리하고, 다음 달 계획에도 반영한다",
        diagnosis:
          "운영 숫자를 잘 보고 있습니다. 매달 매출, 재료비, 인건비, 임대료, 광고비를 한 줄 표로 기록하고 전월 대비 늘어난 비용부터 확인해보세요.",
      },
      {
        key: "B",
        label: "대략적인 흐름은 알고 있다",
        diagnosis:
          "큰 흐름은 알고 있지만 세부 비용이 흐려질 수 있습니다. 카드내역과 통장내역에서 매달 반복되는 고정비만 따로 표시하세요. 줄일 수 있는 비용이 바로 보입니다.",
      },
      {
        key: "C",
        label: "돈이 부족하거나 문제가 생기면 그때 확인한다",
        diagnosis:
          "문제가 생긴 뒤 확인하면 대응이 늦어질 수 있습니다. 매주 일요일 10분만 정해 이번 주 매출과 지출을 적어보세요. 정확하지 않아도 흐름을 보는 게 먼저입니다.",
      },
      {
        key: "D",
        label: "거의 확인하지 못한다",
        diagnosis:
          "운영 숫자가 보이지 않으면 사업 판단이 어려워집니다. 오늘부터 매출, 임대료, 인건비, 광고비 4가지만 메모장에 적어도 첫 관리가 시작됩니다.",
      },
    ],
  },
  {
    key: "documents",
    number: "Q4.",
    part: "세금·서류 기본기",
    question: "사업자에게 필요한 기본 서류나 신고 업무를 직접 확인해본 적이 있나요?",
    options: [
      {
        key: "A",
        label: "필요한 서류와 신고 흐름을 대부분 알고 있다",
        diagnosis:
          "기본 행정 서류와 신고 흐름을 잘 챙기고 있습니다. 자주 쓰는 서류는 ‘사업자 서류함’ 폴더를 만들어 사업자등록증, 통장사본, 납세증명서, 중소기업확인서를 한곳에 모아두세요.",
      },
      {
        key: "B",
        label: "몇 가지는 직접 해봤지만 아직 헷갈린다",
        diagnosis:
          "기본기는 있지만 필요할 때마다 찾느라 시간이 걸릴 수 있습니다. 홈택스, 정부24, 중소기업현황정보시스템 즐겨찾기를 만들어두면 서류 발급 시간이 줄어듭니다.",
      },
      {
        key: "C",
        label: "이름은 들어봤지만 직접 준비는 어렵다",
        diagnosis:
          "서류 이름은 알지만 직접 준비가 부담될 수 있습니다. 먼저 사업자등록증명, 국세납세증명서, 지방세납세증명서 3가지만 발급 경로를 익혀두세요.",
      },
      {
        key: "D",
        label: "거의 모르고 필요할 때마다 주변에 묻는다",
        diagnosis:
          "서류와 신고 업무가 사업의 병목이 될 수 있습니다. “내가 자주 제출해야 하는 서류 목록”부터 만들어보세요. 이름만 알아도 신청 과정에서 덜 막힙니다.",
      },
    ],
  },
  {
    key: "benefits",
    number: "Q5.",
    part: "지원혜택 활용력",
    question: "최근 1년 안에 내 사업이 받을 수 있는 지원사업이나 혜택을 찾아본 적이 있나요?",
    options: [
      {
        key: "A",
        label: "정기적으로 찾아보고, 조건이 맞으면 신청까지 검토한다",
        diagnosis:
          "지원혜택을 챙기는 감각이 좋습니다. 이제는 공고를 찾는 시간보다 실제 필요서류와 작성서류를 확인하는 시간을 줄여야 합니다. 바다야에서 공고별 체크리스트와 문서 작성 가이드를 빠르게 확인해보세요.",
      },
      {
        key: "B",
        label: "몇 번 찾아봤지만 신청까지 이어지진 않았다",
        diagnosis:
          "관심은 있지만 신청까지 이어지는 힘이 부족할 수 있습니다. 공고를 보면 먼저 “지원대상, 신청기간, 제출서류, 작성서류” 4가지만 확인하세요. 바다야를 쓰면 이 과정을 한 화면에서 정리할 수 있습니다.",
      },
      {
        key: "C",
        label: "들어본 적은 있지만 직접 찾아보진 않았다",
        diagnosis:
          "받을 수 있는 혜택을 놓치고 있을 가능성이 있습니다. 마케팅비, 시설개선비, 고용지원, 컨설팅 지원 중 내 사업에 필요한 항목을 하나만 정하고 바다야에서 맞춤 공고를 확인해보세요.",
      },
      {
        key: "D",
        label: "내 사업과는 상관없는 일이라고 생각했다",
        diagnosis:
          "지원사업을 내 일로 생각하지 않았다면 가장 큰 기회를 놓치고 있을 수 있습니다. “나는 해당 안 되겠지”라고 넘기기 전에 사업자등록증 기준으로 받을 수 있는 혜택부터 확인해보세요. 바다야가 내 조건에 맞는 공고를 선별해드립니다.",
      },
    ],
  },
  {
    key: "growth",
    number: "Q6.",
    part: "성장 준비도",
    question: "앞으로 6개월~1년 안에 사업을 키우기 위한 구체적인 계획이 있나요?",
    options: [
      {
        key: "A",
        label: "목표와 실행계획, 필요한 비용까지 정리되어 있다",
        diagnosis:
          "성장 계획이 구체적입니다. 목표를 월 단위 실행표로 쪼개세요. 예를 들어 1개월차 홍보채널 정비, 2개월차 광고 테스트, 3개월차 재방문 고객 확보처럼 나누면 실행률이 올라갑니다.",
      },
      {
        key: "B",
        label: "목표는 있지만 구체적인 실행계획은 부족하다",
        diagnosis:
          "목표는 있지만 실행계획이 부족할 수 있습니다. 성장 목표를 “매출, 고객, 비용, 인력” 중 하나로 좁히세요. 한 번에 다 키우려 하면 실행이 흐려집니다.",
      },
      {
        key: "C",
        label: "키우고 싶지만 무엇부터 해야 할지 모르겠다",
        diagnosis:
          "성장 의지는 있지만 우선순위가 부족합니다. 가장 급한 영역은 숫자로 고르세요. 고객이 부족하면 마케팅, 대기시간이 길면 인력, 품질이 흔들리면 장비·시설이 먼저입니다.",
      },
      {
        key: "D",
        label: "당장 버티는 것이 우선이라 계획을 세우지 못했다",
        diagnosis:
          "지금은 생존에 집중하는 단계일 수 있습니다. 큰 목표보다 이번 달에 해결할 문제 하나만 정하세요. 예를 들어 “신규 고객 10명 만들기”처럼 작고 측정 가능한 목표가 좋습니다.",
      },
    ],
  },
];
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f4f9ff 0%, #eaf4ff 35%, #f8fbff 100%)",
    color: "#12304d",
    fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    padding: "20px 16px 56px",
    wordBreak: "keep-all",
  },
  shell: {
    maxWidth: 960,
    margin: "0 auto",
  },
  heroCard: {
    borderRadius: 28,
    padding: "24px 20px",
    background: "#ffffff",
    border: "1px solid rgba(101, 155, 255, 0.18)",
    boxShadow: "0 18px 50px rgba(27, 85, 164, 0.10)",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    background: "#ecf4ff",
    color: "#2b69d9",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 14,
  },
  title: {
    margin: 0,
    fontSize: "clamp(21px, 4.2vw, 38px)",
    lineHeight: 1.18,
    color: "#1f74ff",
    letterSpacing: "-0.03em",
  },
  subtitle: {
    margin: "14px 0 0",
    fontSize: "clamp(14px, 3.1vw, 17px)",
    lineHeight: 1.7,
    color: "#4d6684",
    whiteSpace: "pre-line",
  },
  participantCounter: {
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  participantCounterText: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.5,
    fontWeight: 700,
    color: "#35557c",
  },
  participantCounterNumber: {
    fontSize: "clamp(28px, 7vw, 40px)",
    lineHeight: 1,
    fontWeight: 900,
    color: "#1f74ff",
    letterSpacing: "-0.04em",
    marginRight: 4,
    verticalAlign: "middle",
  },
  analysisCard: {
    borderRadius: 28,
    padding: "24px 18px",
    background: "#ffffff",
    border: "1px solid rgba(101, 155, 255, 0.18)",
    boxShadow: "0 18px 50px rgba(27, 85, 164, 0.10)",
  },
  analysisBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 12px",
    borderRadius: 999,
    background: "#ecf4ff",
    color: "#2b69d9",
    fontSize: 13,
    fontWeight: 700,
  },
  analysisTitle: {
    margin: "16px 0 0",
    fontSize: "clamp(24px, 5vw, 34px)",
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    color: "#12304d",
  },
  analysisSubtitle: {
    margin: "12px 0 0",
    fontSize: 15,
    lineHeight: 1.8,
    color: "#5b7695",
  },
  analysisPercent: {
    margin: "20px 0 10px",
    fontSize: 15,
    fontWeight: 800,
    color: "#1f74ff",
    textAlign: "right",
  },
  analysisTrack: {
    width: "100%",
    height: 16,
    borderRadius: 999,
    background: "#e8f1ff",
    overflow: "hidden",
    boxShadow: "inset 0 2px 6px rgba(31, 116, 255, 0.08)",
  },
  analysisFill: {
    position: "relative",
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #6cb4ff 0%, #1f74ff 55%, #0d57c9 100%)",
    transition: "width 120ms linear",
    overflow: "hidden",
  },
  analysisShine: {
    position: "absolute",
    top: 0,
    left: "-35%",
    width: "32%",
    height: "100%",
    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.52) 50%, rgba(255,255,255,0) 100%)",
    animation: "progressShine 1.8s linear infinite",
  },
  analysisStatusRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginTop: 12,
    color: "#5f7c9c",
    fontSize: 13,
    fontWeight: 700,
  },
  analysisPromoCard: {
    marginTop: 24,
    borderRadius: 24,
    padding: "16px",
    background: "#f8fbff",
    border: "1px solid #dbe9ff",
    boxShadow: "0 16px 36px rgba(27, 85, 164, 0.10)",
    animation: "floatingCard 3.2s ease-in-out infinite",
    transformOrigin: "center center",
  },
  analysisPromoImage: {
    width: "100%",
    display: "block",
    borderRadius: 20,
    objectFit: "cover",
    boxShadow: "0 14px 30px rgba(27, 85, 164, 0.10)",
  },
  analysisPromoTitle: {
    margin: "16px 0 0",
    fontSize: 18,
    lineHeight: 1.45,
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
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 12,
    marginTop: 22,
  },
  miniCard: {
    borderRadius: 18,
    padding: "16px 14px",
    background: "#f7fbff",
    border: "1px solid #dceaff",
  },
  miniTitle: {
    margin: 0,
    fontSize: 13,
    color: "#6780a0",
    fontWeight: 700,
  },
  miniValue: {
    margin: "7px 0 0",
    fontSize: 17,
    color: "#17385d",
    fontWeight: 800,
  },
  primaryButton: {
    width: "100%",
    border: "none",
    borderRadius: 18,
    padding: "18px 20px",
    background: "#1f74ff",
    color: "#ffffff",
    fontSize: 17,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(31, 116, 255, 0.28)",
  },
  secondaryButton: {
    width: "100%",
    borderRadius: 18,
    padding: "16px 20px",
    background: "#ffffff",
    color: "#215089",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    border: "1px solid #cfe1ff",
  },
  sectionCard: {
    borderRadius: 26,
    padding: "22px 18px",
    background: "#ffffff",
    border: "1px solid rgba(101, 155, 255, 0.18)",
    boxShadow: "0 14px 38px rgba(27, 85, 164, 0.08)",
    marginTop: 18,
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    background: "#e7f0ff",
    overflow: "hidden",
    marginTop: 14,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #4aa3ff 0%, #1f74ff 100%)",
    transition: "width 220ms ease",
  },
  optionButton: {
    width: "100%",
    textAlign: "left",
    borderRadius: 20,
    padding: "18px 16px",
    background: "#f8fbff",
    border: "1px solid #d7e8ff",
    cursor: "pointer",
    color: "#133657",
  },
  resultCard: {
    borderRadius: 28,
    padding: "24px 20px",
    background: "#ffffff",
    border: "1px solid rgba(101, 155, 255, 0.18)",
    boxShadow: "0 18px 46px rgba(27, 85, 164, 0.10)",
  },
  scoreBox: {
    borderRadius: 22,
    background: "#f2f8ff",
    border: "1px solid #d4e6ff",
    padding: "22px 18px",
    textAlign: "center",
  },
  ctaCard: {
    marginTop: 18,
    padding: "4px 0 0",
    color: "#12304d",
  },
  ctaImage: {
    display: "block",
    width: "100%",
    maxWidth: 360,
    margin: "16px auto 0",
    borderRadius: 24,
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
function CeoTest() {
  const [phase, setPhase] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [participantCount, incrementParticipantCount] = useParticipantCount(
    PARTICIPANT_COUNT_STORAGE_KEY,
    PARTICIPANT_COUNT_BASE,
  );
  const [analysisProgress, setAnalysisProgress] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase, currentIndex]);
  useEffect(() => {
    if (!toastMessage) return void 0;
    const timer = window.setTimeout(() => setToastMessage(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);
  useEffect(() => {
    if (phase !== "analysis") return void 0;
    const startTime = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / ANALYSIS_DURATION_MS) * 100));
      setAnalysisProgress(nextProgress);
      if (elapsed >= ANALYSIS_DURATION_MS) {
        window.clearInterval(timer);
        setPhase("result");
      }
    }, 80);
    return () => window.clearInterval(timer);
  }, [phase]);
  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const analysisItem =
    ANALYSIS_ITEMS[Math.min(ANALYSIS_ITEMS.length - 1, Math.floor((analysisProgress / 100) * ANALYSIS_ITEMS.length))];
  const analysisTitle = `${analysisItem}${getObjectParticle(analysisItem)} 분석하고 있어요`;
  const totalScore = useMemo(() => {
    return answers.reduce((sum, key) => sum + optionScores[key], 0);
  }, [answers]);
  const resultInfo = useMemo(() => {
    return resultRanges.find((item) => totalScore >= item.min) || resultRanges[resultRanges.length - 1];
  }, [totalScore]);
  const detailedResults = useMemo(() => {
    return questions.map((question, index) => {
      const selectedKey = answers[index];
      const selectedOption = question.options.find((option) => option.key === selectedKey);
      return {
        key: question.key,
        part: question.part,
        selectedKey,
        score: selectedKey ? optionScores[selectedKey] : 0,
        diagnosis: selectedOption?.diagnosis || "",
      };
    });
  }, [answers]);
  const firstAction = useMemo(() => {
    if (answers.length !== questions.length) return null;
    const entries = detailedResults.map((item) => ({ key: item.key, score: item.score }));
    const minScore = Math.min(...entries.map((entry) => entry.score));
    const lowestKeys = entries.filter((entry) => entry.score === minScore).map((entry) => entry.key);
    const selectedLowest = lowestPriority.find((key) => lowestKeys.includes(key)) || lowestKeys[0];
    return firstActionMap[selectedLowest];
  }, [answers.length, detailedResults]);
  const startTest = () => {
    incrementParticipantCount();
    setAnalysisProgress(0);
    setPhase("quiz");
    setCurrentIndex(0);
    setAnswers([]);
  };
  const restartTest = () => {
    setAnalysisProgress(0);
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers([]);
  };
  const goPrev = () => {
    if (currentIndex === 0) {
      setPhase("intro");
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
      setPhase("analysis");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };
  const shareText = `나는 대표로서 몇 점일까? 결과: 대표 능력지수 ${totalScore}점, ${resultInfo.typeName}`;
  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}
${window.location.href}`);
      setToastMessage("결과가 복사되었습니다");
    } catch {
      setToastMessage("복사에 실패했습니다");
    }
  };
  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "대표 능력지수 테스트",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (error) {
        if ((error as Error)?.name === "AbortError") {
          return;
        }
      }
    }
    await copyShareText();
  };
  const handleBenefitCheck = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("android")) {
      window.location.href = BADAYA_ANDROID_HREF;
      return;
    }
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
      window.location.href = BADAYA_IOS_HREF;
      return;
    }
    window.alert("바다야 앱은 모바일 기기에서 다운로드 가능합니다.");
  };
  return (
    <div style={styles.page}>
      <style>{`
        @keyframes progressShine {
          0% { transform: translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(420%); opacity: 0; }
        }

        @keyframes floatingCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <div style={styles.shell}>
        {phase === "intro" && (
          <div style={styles.heroCard}>
            <div style={styles.badge}>대표자 자질 테스트 · 1~2분 소요</div>
            <h1 style={styles.title}>{TEST_TITLE}</h1>
            <p style={styles.subtitle}>{TEST_SUBTITLE}</p>
            <div style={{ marginTop: 22 }}>
              <img
                src={INTRO_SAMPLE_IMAGE_URL}
                alt="사업을 운영하는 대표 이미지"
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: 22,
                  objectFit: "cover",
                  border: "1px solid #dceaff",
                  boxShadow: "0 14px 34px rgba(27, 85, 164, 0.10)",
                }}
              />
            </div>
            <div style={styles.participantCounter}>
              <p style={styles.participantCounterText}>
                <span style={styles.participantCounterNumber}>{participantCount.toLocaleString("ko-KR")}</span>명의
                대표님들이 참여했습니다
              </p>
            </div>
            <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
              <button type="button" onClick={startTest} style={styles.primaryButton}>
                {START_BUTTON_TEXT}
              </button>
            </div>
          </div>
        )}
        {phase === "quiz" && (
          <div style={styles.sectionCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div style={styles.badge}>
                {currentQuestion.number} {currentQuestion.part}
              </div>
              <div style={{ color: "#6b86a6", fontSize: 14, fontWeight: 700 }}>
                {currentIndex + 1}
                {" / "}
                {questions.length}
              </div>
            </div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
            </div>
            <div style={{ marginTop: 24 }}>
              <p style={{ margin: 0, color: "#5c7899", fontWeight: 700, fontSize: 14 }}>
                선택하면 다음 질문으로 이어집니다
              </p>
              <h2
                style={{
                  margin: "12px 0 0",
                  fontSize: "clamp(18px, 3.5vw, 27px)",
                  lineHeight: 1.36,
                  letterSpacing: "-0.03em",
                  color: "#102846",
                }}
              >
                {currentQuestion.question}
              </h2>
            </div>
            <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentIndex] === option.key;
                return (
                  <button
                    key={`${currentQuestion.key}-${option.key}`}
                    type="button"
                    onClick={() => selectOption(option.key)}
                    style={{
                      ...styles.optionButton,
                      background: isSelected ? "#edf5ff" : "#f8fbff",
                      borderColor: isSelected ? "#89b8ff" : "#d7e8ff",
                      boxShadow: isSelected ? "0 10px 24px rgba(31, 116, 255, 0.10)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div
                        style={{
                          minWidth: 34,
                          height: 34,
                          borderRadius: 999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isSelected ? "#1f74ff" : "#e9f2ff",
                          color: isSelected ? "#ffffff" : "#2b69d9",
                          fontWeight: 800,
                          fontSize: 15,
                        }}
                      >
                        {option.key}
                      </div>
                      <div style={{ paddingTop: 4, lineHeight: 1.65, fontSize: 16, fontWeight: 600 }}>
                        {option.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
              <button type="button" onClick={goPrev} style={styles.secondaryButton}>
                이전
              </button>
              <button type="button" onClick={restartTest} style={styles.secondaryButton}>
                처음으로
              </button>
            </div>
          </div>
        )}
        {phase === "analysis" && (
          <div style={styles.analysisCard}>
            <div style={styles.analysisBadge}>응답 분석 중</div>
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
          </div>
        )}
        {phase === "result" && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={styles.resultCard}>
              <div style={styles.badge}>대표 능력지수 결과</div>
              <div style={styles.scoreBox}>
                <p style={{ margin: 0, color: "#5b78a0", fontWeight: 700, fontSize: 14 }}>테스트 결과</p>
                <h2
                  style={{
                    margin: "10px 0 0",
                    fontSize: "clamp(24px, 5.6vw, 36px)",
                    lineHeight: 1.15,
                    color: "#0f4da2",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {totalScore}점
                </h2>
                <p style={{ margin: "12px 0 0", color: "#21456f", fontSize: 16, fontWeight: 800 }}>
                  {resultInfo.typeName}
                  {"로 "}
                  {resultInfo.percentText}에 해당됩니다
                </p>
                <p style={{ margin: "10px 0 0", color: "#4d6684", fontSize: 15, lineHeight: 1.8 }}>
                  {resultInfo.description}
                </p>
              </div>
              <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
                <div
                  style={{
                    borderRadius: 22,
                    background: "#f9fbff",
                    border: "1px solid #deebff",
                    padding: "18px 16px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: 18, color: "#163b63" }}>파트별 진단 및 실전 Tip</h3>
                  <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                    {detailedResults.map((item, index) => (
                      <div
                        key={item.key}
                        style={{
                          borderRadius: 18,
                          padding: "16px 14px",
                          background: "#ffffff",
                          border: "1px solid #dce9ff",
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: 16, color: "#163b63" }}>
                            {index + 1}
                            {". "}
                            {item.part}
                          </strong>
                        </div>
                        <p style={{ margin: "10px 0 0", color: "#4d6684", fontSize: 15, lineHeight: 1.8 }}>
                          {item.diagnosis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {firstAction && (
                  <div
                    style={{
                      borderRadius: 22,
                      background: "#eef6ff",
                      border: "1px solid #cfe2ff",
                      padding: "18px 16px",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: 18, color: "#123a68" }}>{firstAction.title}</h3>
                    <p
                      style={{
                        margin: "12px 0 0",
                        color: "#35557c",
                        fontSize: 15,
                        lineHeight: 1.9,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {firstAction.body}
                    </p>
                  </div>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
                <button type="button" onClick={restartTest} style={styles.secondaryButton}>
                  다시하기
                </button>
                <button type="button" onClick={shareResult} style={styles.primaryButton}>
                  결과 공유
                </button>
              </div>
            </div>
            <div style={styles.ctaCard}>
              <h3
                style={{
                  margin: "0",
                  fontSize: 16,
                  fontWeight: 800,
                  lineHeight: 1.5,
                  color: "#21456f",
                  maxWidth: 320,
                  padding: "0 8px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  whiteSpace: "pre-line",
                }}
              >
                {"몰라서 놓쳐왔던 지원혜택부터\n꼭 챙기세요"}
              </h3>
              <img src={BADAYA_BG_IMAGE_URL} alt="지원 혜택 안내 이미지" style={styles.ctaImage} />
              <button
                type="button"
                onClick={handleBenefitCheck}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 18,
                  width: "100%",
                  minWidth: 180,
                  padding: "16px 20px",
                  borderRadius: 18,
                  background: "#1f74ff",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                내 혜택 확인하기
              </button>
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#35557c",
                  maxWidth: 320,
                  padding: "0 8px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                바다야는 내 사업조건에 맞는 지원사업을 찾아주고, 공고별 필요서류와 신청서 그리고 사업계획서 AI 작성까지
                모든 게 쉬워져요.
              </p>
            </div>
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
export default CeoTest;
