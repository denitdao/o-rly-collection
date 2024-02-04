import { useObserveImageView } from "~/hooks/useObservabilityEvents";
import { useImagePreview } from "~/components/ImagePreview";
import useImageCopy from "~/hooks/useImageCopy";

const useImageView = () => {
  const observeImageView = useObserveImageView();
  const imageCopyHandler = useImageCopy();
  const { showImage } = useImagePreview();

  return (imageUrl: string, imageId: string) => {
    observeImageView(imageId);
    showImage(imageUrl, imageId, imageCopyHandler);
  };
};

export default useImageView;
