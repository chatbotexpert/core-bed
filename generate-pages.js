const fs = require('fs');
const path = require('path');

const pages = {
  'signup': `import Link from "next/link";
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
}`,
  'forgot-password': `import Link from "next/link";
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[80vh] bg-core-bg pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="font-heading text-4xl text-core-ink mb-6">Reset Password</h1>
        <Link href="/login" className="underline underline-offset-4 text-core-ink">Back to Login</Link>
      </div>
    </div>
  );
}`,
  'account': `export default function AccountPage() {
  return (
    <div className="min-h-screen bg-core-bg pt-32 pb-24 px-6">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="font-heading text-4xl text-core-ink mb-12">My Account</h1>
        <p className="text-core-muted-foreground">Order history and account details will appear here.</p>
      </div>
    </div>
  );
}`,
  'about': `export default function AboutPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">About Us</div>; }`,
  'craftsmanship': `export default function CraftsmanshipPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Our Craftsmanship</div>; }`,
  'reviews': `export default function ReviewsPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Customer Reviews</div>; }`,
  'faq': `export default function FAQPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">FAQ</div>; }`,
  'contact': `export default function ContactPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Contact Us</div>; }`,
  'privacy-policy': `export default function PrivacyPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Privacy Policy</div>; }`,
  'terms-of-service': `export default function TermsPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Terms of Service</div>; }`,
  'returns': `export default function ReturnsPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Returns & Refunds</div>; }`,
  'cookie-policy': `export default function CookiePage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Cookie Policy</div>; }`,
  'shipping': `export default function ShippingPage() { return <div className="min-h-screen pt-32 text-center font-heading text-4xl">Shipping Info</div>; }`,
};

for (const [route, content] of Object.entries(pages)) {
  const dir = path.join(__dirname, 'src', 'app', route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
}
console.log('Pages generated successfully.');
