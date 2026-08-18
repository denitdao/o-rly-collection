import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/relay-tkMd/",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-11-30",
  before_send: (event) => {
    if (!event) return null;

    for (const property of [
      "$current_url",
      "$referrer",
      "$initial_current_url",
      "$initial_referrer",
    ]) {
      const value = event.properties?.[property];
      if (typeof value !== "string") continue;

      try {
        const url = new URL(value);
        url.searchParams.delete("search");
        event.properties[property] = url.toString();
      } catch {
        // Keep non-URL values unchanged.
      }
    }

    return event;
  },
});
