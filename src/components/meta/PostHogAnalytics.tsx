import React, { type ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { env } from "~/env";

// Initialize PostHog client
if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    api_host: "/ingest",
  });
}

interface PostHogAnalyticsProviderProps {
  children: ReactNode;
}

const PostHogAnalyticsProvider: React.FC<PostHogAnalyticsProviderProps> = ({
  children,
}) => {
  const router = useRouter();

  useEffect(() => {
    // Function to handle route changes and track page views
    const handleRouteChange = () => {
      posthog.capture("$pageview");
    };

    // Listen to route changes
    router.events.on("routeChangeComplete", handleRouteChange);
    // Cleanup listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Provide the PostHog client context to the rest of the application
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PostHogAnalyticsProvider;
