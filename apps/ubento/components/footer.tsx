import { routes } from "@/routes";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-neutral-surface-active/20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 font-heading font-bold text-neutral-content">
              <Logo height={30} />
            </div>
            <p className="text-sm text-neutral-content-subtle max-w-sm leading-relaxed">
              The dynamic WorkOS engine built for speed and autonomy.
            </p>
            <p className="text-xs text-neutral-content-muted">
              © 2026 Ubento. All rights reserved.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 text-left">
            {/* Product Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-neutral-content-subtle">
                <li>
                  <a
                    href={routes.pricing()}
                    className="hover:text-neutral-content transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest text-neutral-content-muted uppercase">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-neutral-content-subtle">
                <li>
                  <a
                    href={routes.privacy()}
                    className="hover:text-neutral-content transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href={routes.terms()}
                    className="hover:text-neutral-content transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@abstrea.com"
                    className="hover:text-neutral-content transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
