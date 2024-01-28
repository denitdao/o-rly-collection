import { useObserveImageView } from "~/hooks/useObservabilityEvents";
import { env } from "~/env.mjs";

const useImageView = (
  setPreviewImage: (image: { url: string; id: string }) => void
) => {
  // const { showPopup } = usePopup();
  const observeImageView = useObserveImageView();

  return (imageName: string) => {
    observeImageView(imageName);
    setPreviewImage({
      url: `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${imageName}`,
      id: imageName,
    });
  };
};

export default useImageView;
