import { ArrowLeft, Wrench } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getToolById } from "../data/tools";
import ToolCard from "../components/tools/ToolCard";
import ToolRenderer from "../components/tools/ToolRenderer";
import { toolContent } from "../data/toolContent";

function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();

  const tool = toolId
    ? getToolById(toolId)
    : undefined;

  const content = tool
    ? toolContent[tool.id]
    : undefined;

  /*
   * ---------------------------------------------------------
   * Dynamic SEO metadata
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!tool) {
      document.title = "Tool Not Found | DevToolkit";

      return;
    }

    const title = tool.seoTitle;
    const description = tool.seoDescription;

    document.title = title;

    /*
     * Meta description
     */
    let descriptionTag = document.querySelector(
      'meta[name="description"]',
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");

      descriptionTag.setAttribute(
        "name",
        "description",
      );

      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      description,
    );

    /*
     * Canonical URL
     */
    const canonicalUrl =
      `${window.location.origin}${tool.route}`;

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]',
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");

      canonicalTag.setAttribute(
        "rel",
        "canonical",
      );

      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute(
      "href",
      canonicalUrl,
    );

    /*
     * Open Graph title
     */
    let ogTitle = document.querySelector(
      'meta[property="og:title"]',
    );

    if (!ogTitle) {
      ogTitle = document.createElement("meta");

      ogTitle.setAttribute(
        "property",
        "og:title",
      );

      document.head.appendChild(ogTitle);
    }

    ogTitle.setAttribute(
      "content",
      title,
    );

    /*
     * Open Graph description
     */
    let ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );

    if (!ogDescription) {
      ogDescription =
        document.createElement("meta");

      ogDescription.setAttribute(
        "property",
        "og:description",
      );

      document.head.appendChild(
        ogDescription,
      );
    }

    ogDescription.setAttribute(
      "content",
      description,
    );

    /*
     * Open Graph URL
     */
    let ogUrl = document.querySelector(
      'meta[property="og:url"]',
    );

    if (!ogUrl) {
      ogUrl = document.createElement("meta");

      ogUrl.setAttribute(
        "property",
        "og:url",
      );

      document.head.appendChild(ogUrl);
    }

    ogUrl.setAttribute(
      "content",
      canonicalUrl,
    );

    /*
     * Open Graph type
     */
    let ogType = document.querySelector(
      'meta[property="og:type"]',
    );

    if (!ogType) {
      ogType = document.createElement("meta");

      ogType.setAttribute(
        "property",
        "og:type",
      );

      document.head.appendChild(ogType);
    }

    ogType.setAttribute(
      "content",
      "website",
    );

    /*
     * Twitter title
     */
    let twitterTitle = document.querySelector(
      'meta[name="twitter:title"]',
    );

    if (!twitterTitle) {
      twitterTitle =
        document.createElement("meta");

      twitterTitle.setAttribute(
        "name",
        "twitter:title",
      );

      document.head.appendChild(
        twitterTitle,
      );
    }

    twitterTitle.setAttribute(
      "content",
      title,
    );

    /*
     * Twitter description
     */
    let twitterDescription =
      document.querySelector(
        'meta[name="twitter:description"]',
      );

    if (!twitterDescription) {
      twitterDescription =
        document.createElement("meta");

      twitterDescription.setAttribute(
        "name",
        "twitter:description",
      );

      document.head.appendChild(
        twitterDescription,
      );
    }

    twitterDescription.setAttribute(
      "content",
      description,
    );

    /*
     * Twitter card
     */
    let twitterCard = document.querySelector(
      'meta[name="twitter:card"]',
    );

    if (!twitterCard) {
      twitterCard =
        document.createElement("meta");

      twitterCard.setAttribute(
        "name",
        "twitter:card",
      );

      document.head.appendChild(
        twitterCard,
      );
    }

    twitterCard.setAttribute(
      "content",
      "summary",
    );

    /*
     * ---------------------------------------------------------
     * JSON-LD structured data
     * ---------------------------------------------------------
     *
     * Describes the current tool to search engines as a
     * browser-based software application.
     */
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description,
      url: canonicalUrl,
      applicationCategory:
        "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements:
        "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    };

    let jsonLd = document.querySelector(
      'script[data-devtoolkit-jsonld="tool"]',
    );

    if (!jsonLd) {
      jsonLd = document.createElement("script");

      jsonLd.setAttribute(
        "type",
        "application/ld+json",
      );

      jsonLd.setAttribute(
        "data-devtoolkit-jsonld",
        "tool",
      );

      document.head.appendChild(jsonLd);
    }

    jsonLd.textContent =
      JSON.stringify(structuredData);

    /*
     * Cleanup when leaving the tool page.
     */
    return () => {
      jsonLd?.remove();
    };
  }, [tool]);

  /*
   * ---------------------------------------------------------
   * Tool not found
   * ---------------------------------------------------------
   */
  if (!tool) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <Wrench
              size={20}
              className="text-[var(--subtle)]"
            />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--error)]">
            Error 404
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Tool not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            The tool you're looking for doesn't exist or may
            have been moved.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <ArrowLeft size={15} />
            Back to DevToolkit
          </Link>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * Related tools
   * ---------------------------------------------------------
   */
  const relatedTools = tool.related
    .map((id) => getToolById(id))
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* =====================================================
          Breadcrumb
      ===================================================== */}
      <nav
        aria-label="Breadcrumb"
        className="mb-7 flex min-w-0 items-center gap-2 overflow-hidden text-sm"
      >
        <Link
          to="/"
          className="shrink-0 text-[var(--subtle)] transition-colors hover:text-[var(--foreground)]"
        >
          Home
        </Link>

        <span
          aria-hidden="true"
          className="shrink-0 text-[var(--subtle)]"
        >
          /
        </span>

        <span
          aria-current="page"
          className="min-w-0 truncate text-[var(--muted)]"
        >
          {tool.name}
        </span>
      </nav>

      {/* =====================================================
          Header
      ===================================================== */}
      <header className="max-w-3xl">
        <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
          <span className="text-xs font-medium text-[var(--accent)]">
            {tool.category}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.6rem]">
          {tool.name}
        </h1>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
          {tool.longDescription}
        </p>
      </header>

      {/* =====================================================
          Workspace
      ===================================================== */}
      <section
        aria-label={`${tool.name} workspace`}
        className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm sm:mt-10"
      >
        <div className="flex min-h-12 items-center justify-between gap-4 border-b border-[var(--border)] px-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              aria-hidden="true"
              className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/10"
            >
              <Wrench
                size={13}
                className="text-[var(--accent)]"
              />
            </div>

            <span className="truncate text-sm font-medium text-[var(--foreground)]">
              {tool.name}
            </span>
          </div>

          <span className="hidden shrink-0 text-xs text-[var(--subtle)] sm:block">
            Runs in your browser
          </span>
        </div>

        <div className="min-w-0 p-4 sm:p-6">
          <ToolRenderer toolId={tool.id} />
        </div>
      </section>

      {/* =====================================================
          About
      ===================================================== */}
      {content && (
        <section
          aria-labelledby="tool-guide-heading"
          className="mt-12 max-w-3xl sm:mt-14"
        >
          <div>
            <h2
              id="tool-guide-heading"
              className="text-xl font-semibold tracking-tight text-[var(--foreground)]"
            >
              About {tool.name}
            </h2>

            <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
              {content.intro}
            </p>
          </div>

          <div className="mt-10 space-y-9">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  {section.title}
                </h3>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-7 text-[var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.steps && (
                  <ol className="mt-4 space-y-3">
                    {section.steps.map((step, index) => (
                      <li
                        key={step}
                        className="flex gap-3 text-sm leading-6 text-[var(--muted)]"
                      >
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--subtle)]"
                        >
                          {index + 1}
                        </span>

                        <span className="pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
            <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--subtle)]">
              Free to use
            </span>

            <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--subtle)]">
              No signup required
            </span>

            <span className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--subtle)]">
              Browser-based
            </span>
          </div>
        </section>
      )}

      {/* =====================================================
          Related Tools
      ===================================================== */}
      {relatedTools.length > 0 && (
        <section className="mt-12 sm:mt-14">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
              Related tools
            </h2>

            <p className="text-sm text-[var(--subtle)]">
              More utilities that may be useful for your workflow.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map(
              (relatedTool) =>
                relatedTool && (
                  <ToolCard
                    key={relatedTool.id}
                    tool={relatedTool}
                  />
                ),
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          Bottom navigation
      ===================================================== */}
      <div className="mt-12 border-t border-[var(--border)] pt-6 sm:mt-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft size={15} />
          Browse all tools
        </Link>
      </div>
    </main>
  );
}

export default ToolPage;
