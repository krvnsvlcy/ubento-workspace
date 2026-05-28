import { Logo } from "@/components/logo";
import { routes } from "@/routes";
import { Button } from "@/components/button";

export function Header() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-neutral-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href={routes.home()}
          className="flex items-center gap-2 font-heading font-bold tracking-tight text-neutral-content hover:opacity-85 transition-opacity"
        >
          <Logo style={{ width: 100 }} />
        </a>
        <div className="flex items-center gap-6">
          <a
            href={routes.pricing()}
            className="text-sm font-medium text-neutral-content-subtle hover:text-neutral-content transition-colors"
          >
            Pricing
          </a>
          <Button
            href={routes.login()}
            variant="primary"
            size="sm"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </nav>
  );
}
