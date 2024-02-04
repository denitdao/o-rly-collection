import { useObserveImageView } from "~/hooks/useObservabilityEvents";
import { useImagePreview } from "~/components/ImagePreview";
import useImageCopy from "~/hooks/useImageCopy";

/**
 * Encapsulates the logic for observing and displaying an image view.
 */
const useImageView = () => {
  const observeImageView = useObserveImageView();
  const imageCopyHandler = useImageCopy();
  const { showImage } = useImagePreview();

  return (imageId: string, imageUrl: string) => {
    observeImageView(imageId);
    showImage(imageId, imageUrl, imageCopyHandler);
  };
};

export default useImageView;
