import { copyImageToClipboard } from "~/utils/copy-image";
import { usePopup } from "~/components/Popup";
import { useObserveImageCopy } from "~/hooks/useObservabilityEvents";

const useImageCopy = () => {
  const { showPopup } = usePopup();
  const observeImageCopy = useObserveImageCopy();

  return (imageUrl: string, imageId: string) => {
    if (imageUrl === null) return;

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
