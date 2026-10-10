import Image from "next/image";

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="재무박스 홈">
      <Image src="/images/logo.png" alt="재무박스" width={1890} height={414} />
    </a>
  );
}
