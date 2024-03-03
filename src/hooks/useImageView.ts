import { useObserveImageView } from "~/hooks/useObservabilityEvents";
import { useImagePreview } from "~/components/ImagePreview";

/**
 * Encapsulates the logic for observing and displaying an image view.
 */
const useImageView = () => {
  const observeImageView = useObserveImageView();
  const { showImage } = useImagePreview();

  return (imageId: string, imageUrl: string, onCopyHandler: () => void) => {
    observeImageView(imageId);
    showImage(imageId, imageUrl, onCopyHandler);
  };
};

export default useImageView;
