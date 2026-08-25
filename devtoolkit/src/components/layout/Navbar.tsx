import {
  Code2,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import IconButton from "../ui/IconButton";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="#tools"
            className="rounded-lg px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
          >
            Tools
          </a>

          <button
            type="button"
            className="ml-1 flex h-9 items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--muted)] transition-colors hover:border-white/15 hover:text-[var(--foreground)]"
          >
            <Search size={15} />

            <span>Search</span>

            <kbd className="rounded border border-[var(--border)] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-[var(--subtle)]">
              ⌘ K
            </kbd>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="ml-1"
          >
            <IconButton label="GitHub">
              <Code2 size={17} />
            </IconButton>
          </a>

          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <IconButton label="Search">
            <Search size={18} />
          </IconButton>

          <IconButton
            label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </IconButton>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            <a
              href="#tools"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              Tools
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              <Code2 size={17} />
              GitHub
            </a>

            <div className="flex items-center justify-between rounded-lg px-3 py-3">
              <span className="text-sm text-[var(--muted)]">
                Appearance
              </span>

              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;