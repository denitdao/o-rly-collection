import { toast } from "sonner";
import { copyLinkToClipboard } from "~/lib/copy-link";
import { useObserveLinkCopy } from "~/hooks/useObservabilityEvents";

/**
 * Encapsulates the logic for observing and copying the link to the clipboard.
 */
const useLinkCopy = () => {
  const observeLinkCopy = useObserveLinkCopy();

  return (link: string) => {
    copyLinkToClipboard(link)
      .then(() => {
        observeLinkCopy(link, true);
        toast.success("Link copied to the clipboard!", {
          duration: 2000,
        });
      })
      .catch(() => {
        observeLinkCopy(link, false);
        toast.error("Failed to copy link to the clipboard", {
          duration: 3000,
        });
      });
  };
};

export default useLinkCopy;
