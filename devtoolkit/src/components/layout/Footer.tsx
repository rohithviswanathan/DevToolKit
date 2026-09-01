import { Link } from "react-router-dom";

import Logo from "./Logo";

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Main footer content */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo />

            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Fast, focused developer utilities that
              run directly in your browser.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-6">

            {/* Project */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
                Policy
              </h2>

              <nav className="mt-3 flex flex-col gap-2">
                <Link
                  to="/privacy"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Terms of Use
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-5 text-xs text-[var(--subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} DevToolkit.
            All rights reserved.
          </p>

          <p>
            Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;