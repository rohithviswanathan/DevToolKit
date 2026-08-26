import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;

const POSTHOG_HOST =
  import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

export function initAnalytics() {
  if (initialized || !POSTHOG_KEY) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
  });

  initialized = true;
}

export function track(
  event: string,
  properties?: Record<string, unknown>,
) {
  if (!initialized) {
    return;
  }

  posthog.capture(event, properties);
}

export function trackPageView(path: string) {
  track("page_view", {
    path,
  });
}

export function trackToolOpened(toolId: string) {
  track("tool_opened", {
    tool: toolId,
  });
}

export function trackToolUsed(
  toolId: string,
  action: string,
) {
  track("tool_used", {
    tool: toolId,
    action,
  });
}