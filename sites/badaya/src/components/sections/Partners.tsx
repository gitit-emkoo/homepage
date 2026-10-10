import Image from "next/image";

export default function Partners() {
  return (
    <section className="partners">
      <div className="partners__marquee" aria-hidden="true">
        <div className="partners__track">
          <Image src="/images/partner-logos.png" alt="" width={2000} height={100} />
          <Image src="/images/partner-logos.png" alt="" width={2000} height={100} />
        </div>
      </div>
      <p className="partners__caption">각 기관의 공개 공고 정보를 기반으로 서비스를 제공됩니다</p>
    </section>
  );
}
