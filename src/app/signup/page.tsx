import Link from "next/link";
export default function SignupPage() {
  return (
    <div className="min-h-[80vh] bg-core-bg pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="font-heading text-4xl text-core-ink mb-6">Create Account</h1>
        <p className="text-core-muted-foreground mb-8">Join CoreBed for exclusive offers and faster checkout.</p>
        <Link href="/login" className="underline underline-offset-4 text-core-ink">Back to Login</Link>
      </div>
    </div>
  );
}