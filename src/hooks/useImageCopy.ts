import { copyImageToClipboard } from "~/utils/copy-image";
import { usePopup } from "~/components/Popup";
import { useObserveImageCopy } from "~/hooks/useObservabilityEvents";

/**
 * Encapsulates the logic for observing and copying an image to the clipboard.
 */
const useImageCopy = () => {
  const { showPopup } = usePopup();
  const observeImageCopy = useObserveImageCopy();

  return (imageId: string, imageUrl: string) => {
    observeImageCopy(imageId);
    copyImageToClipboard(imageUrl)
      .then(() => {
        showPopup("Image copied to the clipboard!", 3000);
      })
      .catch(() => {
        showPopup("Failed to copy image to the clipboard", 3000, "warning");
      });
  };
};

export default useImageCopy;
