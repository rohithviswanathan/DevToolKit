import { Link } from "react-router-dom";

function Privacy() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Header */}
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
          Privacy
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
          DevToolkit is designed to provide simple developer
          utilities while keeping the data you work with in
          your browser.
        </p>

        <p className="mt-3 text-xs text-[var(--subtle)]">
          Last updated: August 31, 2026
        </p>
      </header>

      <div className="mt-10 space-y-10 sm:mt-12">
        {/* Information we collect */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Information we collect
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit does not require an account, registration,
            or submission of personal information to use its
            developer tools.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            We use PostHog for product analytics to understand
            how DevToolkit is used and to improve the service.
            Analytics may include information such as the page
            being viewed, the tool being opened, and interactions
            with tools.
          </p>
        </section>

        {/* Tool data */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Your tool data
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Developer tool inputs are processed directly in your
            browser. DevToolkit does not intentionally upload
            the JSON, text, regular expressions, Base64 data,
            JWTs, or other content you enter into the tools to a
            DevToolkit server.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            You should still avoid entering passwords, private
            keys, authentication credentials, production secrets,
            or other highly sensitive information into any
            third-party website.
          </p>
        </section>

        {/* Analytics */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Analytics
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit uses PostHog to measure product usage.
            We use analytics to understand which pages and tools
            are being used and to improve the website.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit's application code sends events such as
            page views, tool openings, and tool actions to
            PostHog. Tool input itself is not intentionally
            included in these events.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            PostHog operates its own privacy and security
            practices. For more information, please review
            PostHog's privacy documentation.
          </p>

          <a
            href="https://posthog.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View PostHog's Privacy Policy
          </a>
        </section>

        {/* Cookies and storage */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Cookies and local storage
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit does not require cookies for users to
            access or use its developer tools. Third-party
            analytics functionality may use browser technologies
            as described in the provider's own documentation.
          </p>
        </section>

        {/* Third parties */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Third-party services
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit currently uses third-party services
            including PostHog for analytics and Cloudflare for
            hosting and delivery of the website.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            These providers may process technical information
            necessary to provide their services.
          </p>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Security
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit is designed so that developer tool
            processing happens locally in the browser whenever
            possible. However, no website or internet service can
            guarantee absolute security.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Changes to this policy
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            This Privacy Policy may be updated as DevToolkit
            evolves or as new services and features are added.
            The updated version will be published on this page
            with a revised update date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Contact
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            If you have questions about this Privacy Policy or
            DevToolkit's privacy practices, please contact the
            DevToolkit project owner.
          </p>
        </section>
      </div>

      {/* Back */}
      <div className="mt-12 border-t border-[var(--border)] pt-6">
        <Link
          to="/"
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back to DevToolkit
        </Link>
      </div>
    </main>
  );
}

export default Privacy;