import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  trackPageView,
  trackToolOpened,
} from "../../lib/analytics";

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    const path =
      location.pathname +
      location.search +
      location.hash;

    trackPageView(path);

    const toolMatch = location.pathname.match(
      /^\/tools\/([^/]+)$/,
    );

    if (toolMatch) {
      trackToolOpened(toolMatch[1]);
    }
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);

  return null;
}

export default PageViewTracker;