import { useEffect } from "react";
import { Link } from "react-router-dom";

function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | DevToolkit";
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* =====================================================
          Header
      ===================================================== */}
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Legal & Privacy
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
          DevToolkit is built to provide fast, privacy-conscious
          developer utilities. This policy explains what
          information is collected when you use the website,
          how your tool inputs are handled, and which third-party
          services support DevToolkit.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--subtle)]">
          <span>Effective date: August 31, 2026</span>
          <span
            aria-hidden="true"
            className="hidden sm:inline"
          >
            •
          </span>
          <span>Last updated: August 31, 2026</span>
        </div>
      </header>

      {/* =====================================================
          Quick summary
      ===================================================== */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:mt-12 sm:p-6">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          Privacy at a glance
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              No account required
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              You can use DevToolkit without creating an
              account or providing personal information.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Tool processing happens locally
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              The developer content you enter into the tools is
              processed in your browser.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Analytics are used
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              We use PostHog to understand website and product
              usage and improve DevToolkit.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              No intentional collection of tool input
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              DevToolkit does not intentionally send the content
              you process through its tools to a DevToolkit
              backend.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 space-y-12 sm:mt-14">
        {/* ===================================================
            1. Scope
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            1. Scope of this policy
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            This Privacy Policy applies to the DevToolkit
            website and its browser-based developer utilities,
            including the JSON Formatter, JSON to TypeScript
            converter, UUID Generator, Base64 Encoder /
            Decoder, Regex Tester, and JWT Decoder.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            By using DevToolkit, you acknowledge the practices
            described in this policy.
          </p>
        </section>

        {/* ===================================================
            2. Information we collect
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            2. Information we collect
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit does not require registration, an account,
            or a subscription to use its core functionality.
            We do not intentionally ask you to provide your
            name, email address, phone number, or other personal
            information simply to use the developer tools.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            We may receive limited technical and usage
            information through our hosting and analytics
            providers. This information helps us operate the
            website, understand usage patterns, identify issues,
            and improve the product.
          </p>
        </section>

        {/* ===================================================
            3. Tool input
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            3. How your tool data is handled
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit's developer tools are designed to process
            your input directly in your browser. This includes
            content such as JSON documents, text strings, regular
            expressions, Base64 values, and JWTs.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit does not intentionally upload the content
            you enter into these tools to a DevToolkit application
            server for processing.
          </p>

          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Important security reminder
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Although tool processing is performed locally,
              you should avoid entering passwords, private keys,
              production credentials, API secrets, or other
              highly sensitive information into any website unless
              you have independently verified that it is
              appropriate to do so.
            </p>
          </div>
        </section>

        {/* ===================================================
            4. Analytics
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            4. Analytics
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit uses PostHog for product and website
            analytics. Analytics help us understand which pages
            and tools are useful, how features are being used,
            and where the product can be improved.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Our application intentionally records events such as
            page views, tool openings, and tool interactions. The
            application does not intentionally include the actual
            contents of your JSON, JWT, regular expression, text,
            or other tool input in these custom events.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            PostHog is a separate service and may process
            information according to its own privacy and security
            practices. For details, please review PostHog's
            current privacy documentation.
          </p>

          <a
            href="https://posthog.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] hover:underline"
          >
            View PostHog Privacy Policy
            <span
              aria-hidden="true"
              className="ml-1"
            >
              ↗
            </span>
          </a>
        </section>

        {/* ===================================================
            5. Cookies and browser storage
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            5. Cookies and browser storage
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit does not require cookies for you to use
            its developer tools. The website may use browser
            storage or technologies provided by third-party
            services when necessary for analytics or website
            functionality.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            The availability and behavior of these technologies
            may depend on the configuration of the third-party
            services we use.
          </p>
        </section>

        {/* ===================================================
            6. Third-party services
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            6. Third-party services
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit relies on a limited number of third-party
            services to operate the website.
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-sm font-medium text-[var(--foreground)]">
                Cloudflare
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                Used to host, deliver, and protect the DevToolkit
                website and its static assets.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-sm font-medium text-[var(--foreground)]">
                PostHog
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                Used for product and website analytics, including
                understanding page views and interactions with
                DevToolkit.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Third-party providers operate under their own terms
            and privacy policies. Their handling of information
            is governed by their respective policies.
          </p>
        </section>

        {/* ===================================================
            7. Data retention
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            7. Data retention
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Because DevToolkit does not intentionally send tool
            input to a DevToolkit backend, we do not maintain a
            DevToolkit database of the content processed through
            the tools.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Analytics information may be retained by our
            analytics provider according to its applicable
            retention policies and configuration.
          </p>
        </section>

        {/* ===================================================
            8. Security
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            8. Security
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            We take reasonable steps to keep DevToolkit's
            application and infrastructure secure. The application
            is designed so that the core processing performed by
            its developer tools happens locally in the browser.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            However, no website, browser, network, or online
            service can guarantee absolute security. You remain
            responsible for deciding what information is
            appropriate to enter into the tools.
          </p>
        </section>

        {/* ===================================================
            9. Your choices
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            9. Your choices
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            You can use DevToolkit's core developer tools without
            creating an account or providing personal information.
            You can also choose not to use the website if you do
            not want analytics information associated with your
            visit to be processed by third-party analytics
            services.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Where applicable, privacy rights and choices may also
            be available through the third-party services that
            process analytics information.
          </p>
        </section>

        {/* ===================================================
            10. Changes
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            10. Changes to this Privacy Policy
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit may update this Privacy Policy when the
            website, its features, or the services supporting it
            change. When we make changes, we will update the
            "Last updated" date shown at the top of this page.
          </p>
        </section>

        {/* ===================================================
            11. Contact
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            11. Contact
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            If you have questions, concerns, or requests relating
            to this Privacy Policy or DevToolkit's privacy
            practices, you can contact the DevToolkit project
            owner through the project's public GitHub profile.
          </p>

          <a
            href="https://github.com/rohithviswanathan"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] hover:underline"
          >
            DevToolkit project owner on GitHub
            <span
              aria-hidden="true"
              className="ml-1"
            >
              ↗
            </span>
          </a>
        </section>
      </div>

      {/* =====================================================
          Footer navigation
      ===================================================== */}
      <div className="mt-14 border-t border-[var(--border)] pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <span aria-hidden="true">←</span>
          Back to DevToolkit
        </Link>
      </div>
    </main>
  );
}

export default Privacy;