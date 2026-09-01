import { useEffect } from "react";
import { Link } from "react-router-dom";

function Terms() {
  useEffect(() => {
    document.title = "Terms of Use | DevToolkit";
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* =====================================================
          Header
      ===================================================== */}
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Legal & Terms
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Terms of Use
        </h1>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
          These Terms of Use explain the terms that apply when
          you access or use DevToolkit and its browser-based
          developer utilities.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--subtle)]">
          <span>Effective date: September 1, 2026</span>

          <span
            aria-hidden="true"
            className="hidden sm:inline"
          >
            •
          </span>

          <span>Last updated: September 1, 2026</span>
        </div>
      </header>

      {/* =====================================================
          Quick summary
      ===================================================== */}
      <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:mt-12 sm:p-6">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          Terms at a glance
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Free to use
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              DevToolkit's current developer tools are provided
              free of charge.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Use responsibly
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              You are responsible for how you use the tools and
              the information you process with them.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              No guarantee of accuracy
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              Tool results should be reviewed before being used
              in production systems or other important decisions.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Use at your own risk
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              DevToolkit is provided on an "as is" and
              "as available" basis.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12 space-y-12 sm:mt-14">
        {/* ===================================================
            1. Acceptance
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            1. Acceptance of these terms
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            By accessing or using DevToolkit, you agree to be
            bound by these Terms of Use. If you do not agree with
            these terms, please do not use the website or its
            tools.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            These terms apply to all visitors and users of
            DevToolkit.
          </p>
        </section>

        {/* ===================================================
            2. Description
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            2. About DevToolkit
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit provides browser-based utilities intended
            to assist with common software development tasks.
            Current tools include JSON formatting, JSON to
            TypeScript conversion, UUID generation, Base64
            encoding and decoding, regular expression testing,
            and JWT decoding.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Tools and features may be added, modified, suspended,
            or removed as DevToolkit evolves.
          </p>
        </section>

        {/* ===================================================
            3. Free service
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            3. Free use
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit's current tools are provided free of
            charge. We reserve the right to introduce additional
            features, usage limits, paid functionality, or other
            changes in the future.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Any future paid features or material changes to the
            service will be presented with appropriate information
            before they become applicable.
          </p>
        </section>

        {/* ===================================================
            4. Acceptable use
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            4. Acceptable use
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            You agree to use DevToolkit only for lawful purposes
            and in a manner that does not interfere with the
            operation, security, or availability of the website.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            You must not intentionally attempt to disrupt,
            overload, compromise, reverse engineer, or abuse the
            website or its supporting infrastructure.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            You are responsible for ensuring that your use of
            DevToolkit complies with all laws and regulations
            applicable to you.
          </p>
        </section>

        {/* ===================================================
            5. Tool results
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            5. Tool results and accuracy
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit's tools are provided as general-purpose
            development utilities. While we aim to provide
            useful and reliable results, we do not guarantee that
            every result will be accurate, complete, current, or
            suitable for a particular purpose.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            You are responsible for reviewing and validating
            results before relying on them in production
            applications, security-sensitive environments, or
            other important systems.
          </p>

          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm font-medium text-[var(--foreground)]">
              Security-sensitive data
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Do not use DevToolkit as a substitute for a
              dedicated security system, credential-management
              system, or security review process.
            </p>
          </div>
        </section>

        {/* ===================================================
            6. User content
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            6. User-provided content
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            You are responsible for any content you enter into
            DevToolkit's tools and for ensuring that you have the
            necessary rights or permissions to use that content.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            DevToolkit does not claim ownership of the content
            you process using its tools.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            For information about how tool input and analytics
            information are handled, please review our{" "}
            <Link
              to="/privacy"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* ===================================================
            7. Availability
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            7. Availability of the service
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            We aim to keep DevToolkit available and functional,
            but we do not guarantee uninterrupted or error-free
            operation.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            The website may occasionally be unavailable because
            of maintenance, updates, technical issues, hosting
            problems, or circumstances outside our reasonable
            control.
          </p>
        </section>

        {/* ===================================================
            8. Intellectual property
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            8. Intellectual property
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Unless otherwise stated, the DevToolkit website,
            branding, interface, original content, and software
            are owned by or licensed to the DevToolkit project
            owner.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            These terms do not grant you ownership of DevToolkit
            or its underlying intellectual property.
          </p>
        </section>

        {/* ===================================================
            9. Third-party services
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            9. Third-party services
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit may rely on third-party services for
            hosting, delivery, analytics, security, or other
            functionality.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Third-party services are operated independently and
            may be subject to their own terms, policies, and
            conditions. DevToolkit is not responsible for the
            availability or policies of third-party services.
          </p>
        </section>

        {/* ===================================================
            10. Disclaimer
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            10. Disclaimer of warranties
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            DevToolkit is provided on an "as is" and
            "as available" basis, without warranties of any kind,
            whether express or implied, to the fullest extent
            permitted by applicable law.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            We do not guarantee that the website or its tools
            will always be available, secure, accurate, complete,
            or free from errors or interruptions.
          </p>
        </section>

        {/* ===================================================
            11. Limitation of liability
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            11. Limitation of liability
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            To the fullest extent permitted by applicable law,
            DevToolkit and its project owner will not be liable
            for any indirect, incidental, special, consequential,
            or similar damages arising from or related to your
            use of, or inability to use, the website or its tools.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            This includes, without limitation, loss of data,
            loss of profits, business interruption, or reliance
            on tool output.
          </p>
        </section>

        {/* ===================================================
            12. Changes
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            12. Changes to these terms
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            These Terms of Use may be updated as DevToolkit
            evolves. When material changes are made, the updated
            version will be published on this page and the
            "Last updated" date will be revised.
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Your continued use of DevToolkit after updated terms
            are published constitutes acceptance of the revised
            terms, to the extent permitted by applicable law.
          </p>
        </section>

        {/* ===================================================
            13. Contact
        =================================================== */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            13. Contact
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            If you have questions about these Terms of Use or
            DevToolkit, you can contact the project owner through
            the project's public GitHub profile.
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
      <div className="mt-14 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border)] pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <span aria-hidden="true">←</span>
          Back to DevToolkit
        </Link>

        <Link
          to="/privacy"
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}

export default Terms;