import { sendGAEvent } from "~/components/meta/GoogleAnalytics";
import { useEffect, useRef } from "react";
import { type SortMode } from "~/hooks/useBookSearch";
import posthog from "posthog-js";

export const useObserveLinkCopy = () => {
  return (link: string, succeeded: boolean) => {
    const properties = getLinkCopyProperties(link);
    sendGAEvent({
      action: succeeded ? "link_copy" : "link_copy_failed",
      category: "link",
      label: succeeded ? "Link Copy" : "Link Copy Failed",
      value: properties.book_id ?? properties.destination_host,
    });
    posthog.capture(succeeded ? "link_copy" : "link_copy_failed", properties);
  };
};

export const useObserveSearchEffect = (
  searchTerm: string,
  resultCount: number,
) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        sendGAEvent({
          action: "user_search",
          category: "search",
          label: "User Search",
          value: String(resultCount),
        });
        posthog.capture("user_search", {
          query_length: searchTerm.trim().length,
          result_count: resultCount,
          has_results: resultCount > 0,
        });
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timeoutId); // Clear timeout if searchTerm changes
  }, [searchTerm, resultCount]);
};

export const useObserveImageView = () => {
  return (bookId: string) => {
    sendGAEvent({
      action: "image_view",
      category: "image",
      label: "Image View",
      value: bookId,
    });
    posthog.capture("image_view", { book_id: bookId });
  };
};

export const useObserveSortModeEffect = (sortMode: SortMode) => {
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      sendGAEvent({
        action: "sort_mode",
        category: "search",
        label: "Sort Mode",
        value: sortMode,
      });
      posthog.capture("sort_mode", { sort_mode: sortMode });
    }
  }, [sortMode]); // eslint-disable-line react-hooks/exhaustive-deps
};

const getLinkCopyProperties = (link: string) => {
  const url = new URL(link);
  const bookId =
    url.hostname === "orlybooks.com" && url.pathname.startsWith("/books/")
      ? url.pathname.split("/").filter(Boolean).at(-1)
      : undefined;

  return bookId
    ? { target_type: "book", book_id: bookId, destination_host: url.hostname }
    : { target_type: "external", destination_host: url.hostname };
};

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
