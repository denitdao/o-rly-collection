import React from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: NonNullable<unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export type GAParams = {
  gaId: string;
  debug?: boolean;
};

export function GoogleAnalytics({ gaId, debug = false }: GAParams) {
  return (
    <>
      <Script
        id="_next-ga-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}' ${debug ? ", {'debug_mode':true}" : ""});`,
        }}
      />
      <Script
        id="_next-ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const sendGAEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  if (window.dataLayer) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn(`@next/third-parties: GA dataLayer does not exist`);
  }
};
