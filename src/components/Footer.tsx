import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-core-bg pt-20 pb-10 px-6 border-t border-core-line">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
          
          <div className="md:col-span-1">
            <Link href="/" className="font-heading text-3xl tracking-tight block mb-6 text-core-ink">
              COREBED.
            </Link>
            <p className="text-sm text-core-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
              Quiet luxury and symmetric calm. The foundation of a better tomorrow starts tonight.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-widest uppercase mb-6 text-core-ink">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/shop/mattresses" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Mattresses</Link></li>
              <li><Link href="/shop/pillows" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Pillows</Link></li>
              <li><Link href="/shop/bedding" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Bedding</Link></li>
              <li><Link href="/shop/bundles" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Bundles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-widest uppercase mb-6 text-core-ink">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">About Us</Link></li>
              <li><Link href="/craftsmanship" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Our Materials</Link></li>
              <li><Link href="/reviews" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Reviews</Link></li>
              <li><Link href="/contact" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm tracking-widest uppercase mb-6 text-core-ink">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Returns & Trial</Link></li>
              <li><Link href="/account" className="text-sm text-core-muted-foreground hover:text-core-ink transition-colors">Account</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-core-line text-xs text-core-muted-foreground">
          <p>© {new Date().getFullYear()} CoreBed. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-core-ink transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-core-ink transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-core-ink transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
