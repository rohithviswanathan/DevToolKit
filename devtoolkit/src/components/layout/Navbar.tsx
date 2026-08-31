import {
  Binary,
  Braces,
  Code2,
  Fingerprint,
  Menu,
  Regex,
  Search,
  X,
  KeyRound,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import IconButton from "../ui/IconButton";

import { tools } from "../../data/tools";

const toolIcons = {
  braces: Braces,
  code: Code2,
  fingerprint: Fingerprint,
  binary: Binary,
  regex: Regex,
  "key-round": KeyRound,
};

function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  /*
   * ---------------------------------------------------------
   * Open search
   * ---------------------------------------------------------
   */

  const openSearch = () => {
    setSearchOpen(true);
    setSearchQuery("");
    setMobileOpen(false);
  };

  /*
   * ---------------------------------------------------------
   * Close search
   * ---------------------------------------------------------
   */

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  /*
   * ---------------------------------------------------------
   * Keyboard shortcuts
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      /*
       * Cmd + K on Mac
       * Ctrl + K on Windows/Linux
       */
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        openSearch();
      }

      /*
       * Escape closes search and mobile menu.
       */
      if (event.key === "Escape") {
        closeSearch();
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * Prevent background scroll while search is open
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!searchOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  /*
   * ---------------------------------------------------------
   * Focus search input
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!searchOpen) return;

    const timeout = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [searchOpen]);

  /*
   * ---------------------------------------------------------
   * Search results
   * ---------------------------------------------------------
   */

  const searchResults = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return tools;
    }

    const terms = query
      .split(/\s+/)
      .filter(Boolean);

    return tools
      .map((tool) => {
        const searchableText = [
          tool.name,
          tool.description,
          tool.longDescription,
          tool.category,
          ...tool.keywords,
        ]
          .join(" ")
          .toLowerCase();

        let score = 0;

        terms.forEach((term) => {
          if (
            tool.name
              .toLowerCase()
              .includes(term)
          ) {
            score += 10;
          }

          if (
            tool.category
              .toLowerCase()
              .includes(term)
          ) {
            score += 6;
          }

          if (
            tool.keywords.some((keyword) =>
              keyword
                .toLowerCase()
                .includes(term),
            )
          ) {
            score += 5;
          }

          if (
            tool.description
              .toLowerCase()
              .includes(term)
          ) {
            score += 3;
          }

          if (
            tool.longDescription
              .toLowerCase()
              .includes(term)
          ) {
            score += 1;
          }

          /*
           * If a search term isn't present anywhere,
           * this tool should not be shown.
           */
          if (
            !searchableText.includes(term)
          ) {
            score = -1;
          }
        });

        return {
          tool,
          score,
        };
      })
      .filter((item) => item.score >= 0)
      .sort(
        (a, b) => b.score - a.score,
      )
      .map((item) => item.tool);
  }, [searchQuery]);

  /*
   * ---------------------------------------------------------
   * Navigate to tool
   * ---------------------------------------------------------
   */

  const openTool = (route: string) => {
    closeSearch();
    setMobileOpen(false);
    navigate(route);
  };

  /*
   * ---------------------------------------------------------
   * Mobile menu
   * ---------------------------------------------------------
   */

  const toggleMobileMenu = () => {
    setMobileOpen(
      (value) => !value,
    );
  };

  return (
    <>
      {/* =====================================================
          Navbar
          ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="min-w-0">
            <Logo />
          </div>

          {/* =================================================
              Desktop navigation
              ================================================= */}

          <nav className="hidden shrink-0 items-center gap-1 md:flex">
            <a
              href="/#tools"
              className="rounded-lg px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
            >
              Tools
            </a>

            {/* Desktop Search */}
            <button
              type="button"
              onClick={openSearch}
              className="ml-1 flex h-9 items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--muted)] transition-colors hover:border-white/15 hover:text-[var(--foreground)]"
            >
              <Search size={15} />

              <span>Search</span>

              <kbd className="rounded border border-[var(--border)] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-[var(--subtle)]">
                Ctrl + K
              </kbd>
            </button>

            <ThemeToggle />
          </nav>

          {/* =================================================
              Mobile controls
              ================================================= */}

          <div className="flex shrink-0 items-center gap-0.5 md:hidden">
            <IconButton
              label="Search"
              onClick={openSearch}
            >
              <Search size={18} />
            </IconButton>

            <IconButton
              label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              onClick={
                toggleMobileMenu
              }
            >
              {mobileOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </IconButton>
          </div>
        </div>

        {/* ===================================================
            Mobile navigation
            =================================================== */}

        {mobileOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
            <nav className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-2 sm:px-6">
              {/* Tools */}
              <a
                href="/#tools"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 shrink-0 items-center justify-center rounded-lg px-3 py-2.5 text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                Tools
              </a>

              {/* Search */}
              <button
                type="button"
                onClick={openSearch}
                className="flex min-h-11 flex-1 items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                <Search size={17} className="shrink-0" />

                <span>Search tools</span>
              </button>

              {/* Theme */}
              <div className="flex min-h-11 shrink-0 items-center justify-center rounded-lg px-2 py-2.5">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* =====================================================
          Search dialog
          ===================================================== */}

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeSearch();
            }
          }}
        >
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            {/* Search input */}
            <div className="flex min-h-14 items-center gap-2 border-b border-[var(--border)] px-3 sm:gap-3 sm:px-4">
              <Search
                size={18}
                className="shrink-0 text-[var(--muted)]"
              />

              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value,
                  )
                }
                placeholder="Search tools..."
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--subtle)]"
              />

              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="shrink-0 rounded-lg p-1.5 text-[var(--muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--foreground)]"
              >
                <X size={17} />
              </button>

              <kbd className="hidden shrink-0 rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 text-[10px] text-[var(--subtle)] sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[calc(100vh-9rem)] overflow-y-auto p-2 sm:max-h-[60vh]">
              {searchResults.length ===
              0 ? (
                <div className="px-4 py-12 text-center sm:px-6">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)]">
                    <Search
                      size={18}
                      className="text-[var(--subtle)]"
                    />
                  </div>

                  <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
                    No tools found
                  </p>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Try another search term.
                  </p>
                </div>
              ) : (
                <>
                  {!searchQuery.trim() && (
                    <div className="px-3 pb-2 pt-1 text-[10px] font-medium uppercase tracking-wide text-[var(--subtle)]">
                      All tools
                    </div>
                  )}

                  {searchResults.map(
                    (tool) => {
                      const Icon =
                        toolIcons[
                          tool.icon as keyof typeof toolIcons
                        ];

                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() =>
                            openTool(
                              tool.route,
                            )
                          }
                          className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/[0.05] active:bg-white/[0.08]"
                        >
                          {/* Tool icon */}
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)]">
                            {Icon && (
                              <Icon
                                size={16}
                                className="text-[var(--accent)]"
                              />
                            )}
                          </div>

                          {/* Tool info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="break-words text-sm font-medium text-[var(--foreground)]">
                                {tool.name}
                              </span>

                              <span className="shrink-0 rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[9px] text-[var(--subtle)]">
                                {tool.category}
                              </span>
                            </div>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--muted)]">
                              {tool.description}
                            </p>
                          </div>
                        </button>
                      );
                    },
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex min-h-11 items-center justify-between gap-3 border-t border-[var(--border)] px-3 py-2.5 text-[10px] text-[var(--subtle)] sm:px-4">
              <span className="shrink-0">
                {searchResults.length}{" "}
                {searchResults.length ===
                1
                  ? "tool"
                  : "tools"}
              </span>

              <span className="hidden truncate sm:block">
                Press Enter to open a tool
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;