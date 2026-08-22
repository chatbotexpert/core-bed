import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-core-bg pt-20 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 pt-12">
        <h1 className="font-heading text-3xl md:text-4xl text-core-ink mb-12 text-center md:text-left">Checkout</h1>
        
        <div className="flex flex-col-reverse lg:flex-row gap-16">
          {/* Main Form Area */}
          <div className="lg:w-2/3">
            <CheckoutForm />
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
