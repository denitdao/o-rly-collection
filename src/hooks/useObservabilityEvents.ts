import { sendGAEvent } from "~/components/meta/GoogleAnalytics";
import { api } from "~/utils/api";
import { useEffect, useRef } from "react";
import { type SortMode } from "~/hooks/useBookSearch";
import posthog from "posthog-js";

export const useObserveLinkCopy = () => {
  const { mutate: observeLinkCopy } = api.observation.link_copy.useMutation();

  return (link: string) => {
    observeLinkCopy({ link });
    sendGAEvent({
      action: "link_copy",
      category: "link",
      label: "Link Copy",
      value: link,
    });
    posthog.capture("link_copy", { property: link });
  };
};

export const useObserveSearchEffect = (searchTerm: string) => {
  const { mutate: observeSearch } = api.observation.user_search.useMutation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        observeSearch({ query: searchTerm });
        sendGAEvent({
          action: "user_search",
          category: "search",
          label: "User Search",
          value: searchTerm,
        });
        posthog.capture("user_search", { property: searchTerm });
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timeoutId); // Clear timeout if searchTerm changes
  }, [searchTerm, observeSearch]);
};

export const useObserveImageView = () => {
  const { mutate: observeImageView } = api.observation.image_view.useMutation();

  return (imageName: string) => {
    observeImageView({ imageName });
    sendGAEvent({
      action: "image_view",
      category: "image",
      label: "Image View",
      value: imageName,
    });
    posthog.capture("image_view", { property: imageName });
  };
};

export const useObserveSortModeEffect = (sortMode: SortMode) => {
  const isMount = useIsMount();
  const { mutate: observeSortMode } = api.observation.sort_mode.useMutation();

  useEffect(() => {
    if (!isMount) {
      observeSortMode({ mode: sortMode });
      sendGAEvent({
        action: "sort_mode",
        category: "search",
        label: "Sort Mode",
        value: sortMode,
      });
      posthog.capture("sort_mode", { property: sortMode });
    }
  }, [sortMode, observeSortMode]); // eslint-disable-line react-hooks/exhaustive-deps
};

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
