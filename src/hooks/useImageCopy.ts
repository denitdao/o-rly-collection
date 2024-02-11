import { copyImageToClipboard } from "~/utils/copy-image";
import { useObserveImageCopy } from "~/hooks/useObservabilityEvents";
import { toast } from "sonner";

/**
 * Encapsulates the logic for observing and copying an image to the clipboard.
 */
const useImageCopy = () => {
  const observeImageCopy = useObserveImageCopy();

  return (imageId: string, imageUrl: string) => {
    observeImageCopy(imageId);
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
