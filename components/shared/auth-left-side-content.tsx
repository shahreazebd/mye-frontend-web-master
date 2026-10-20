import Image from "next/image";
import Link from "next/link";

export default function AuthLeftSideContent() {
  return (
    <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/auth/sideImg.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
        <Image src="/images/auth/logo.svg" width={120} height={40} alt="Logo" />
      </Link>
    </div>
  );
}
