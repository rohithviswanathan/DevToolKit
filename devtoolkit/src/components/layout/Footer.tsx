import { ShieldCheck } from "lucide-react";
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

            <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--subtle)]">
              <ShieldCheck
                size={14}
                className="text-[var(--success)]"
                aria-hidden="true"
              />

              <span>
                Your data stays in your browser.
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {/* Tools */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
                Tools
              </h2>

              <nav className="mt-3 flex flex-col gap-2">
                <Link
                  to="/#tools"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  All tools
                </Link>
              </nav>
            </div>

            {/* Project */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
                Project
              </h2>

              <nav className="mt-3 flex flex-col gap-2">
                <a
                  href="https://github.com/rohithviswanathan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  GitHub
                </a>
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