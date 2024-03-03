import { copyImageToClipboard } from "~/lib/copy-image";
import { useObserveImageCopy } from "~/hooks/useObservabilityEvents";
import { toast } from "sonner";

/**
 * Encapsulates the logic for observing and copying an image to the clipboard.
 */
const useImageCopy = () => {
  const observeImageCopy = useObserveImageCopy();

  return (imageUrl: string) => {
    observeImageCopy(imageUrl);
    copyImageToClipboard(imageUrl)
      .then(() => {
        toast.success("Image copied to the clipboard!", {
          duration: 2000,
        });
      })
      .catch(() => {
        toast.error("Failed to copy image to the clipboard", {
          duration: 3000,
        });
      });
  };
};

export default useImageCopy;
