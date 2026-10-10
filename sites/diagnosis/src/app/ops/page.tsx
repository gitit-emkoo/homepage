import type { Metadata } from "next";
import OpsTest from "@/components/tests/OpsTest";

export const metadata: Metadata = {
  title: "소상공인 사업운영 진단",
  description:
    "지금 운영중인 사업이 업계 대비 어떤 상태인지 확인해 보세요. 매출·임차료·인건비·운영시간을 입력하면 동종업계 기준과 비교해 드립니다.",
  alternates: { canonical: "/ops" },
  openGraph: {
    title: "소상공인 사업운영 진단",
    description:
      "지금 운영중인 사업이 업계 대비 어떤 상태인지 확인해 보세요. 매출·임차료·인건비·운영시간을 입력하면 동종업계 기준과 비교해 드립니다.",
  },
  twitter: {
    title: "소상공인 사업운영 진단",
    description:
      "지금 운영중인 사업이 업계 대비 어떤 상태인지 확인해 보세요. 매출·임차료·인건비·운영시간을 입력하면 동종업계 기준과 비교해 드립니다.",
  },
};

export default function Page() {
  return <OpsTest />;
}
