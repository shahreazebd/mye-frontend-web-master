import Link from "next/link";

export default function AuthFooterText() {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <Link
        href="/terms-and-conditions"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-policy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}
