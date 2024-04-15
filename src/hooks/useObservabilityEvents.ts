import { sendGAEvent } from "~/components/meta/GoogleAnalytics";
import { api } from "~/utils/api";
import { useEffect, useRef } from "react";
import { type SortMode } from "~/hooks/useBookSearch";

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
  };
};

export const useObserveImageCopy = () => {
  const { mutate: observeImageCopy } = api.observation.image_copy.useMutation();

  return (imageUrl: string) => {
    observeImageCopy({ imageUrl });
    sendGAEvent({
      action: "image_copy",
      category: "image",
      label: "Image Copy",
      value: imageUrl,
    });
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
