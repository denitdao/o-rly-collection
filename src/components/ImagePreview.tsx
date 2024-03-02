import Image from "next/image";
import { Copy, X } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

type ImagePreviewContextType = {
  showImage: (
    imageId: string,
    imageUrl: string,
    onCopy?: (imageUrl: string) => void,
  ) => void;
};

const ImagePreviewContext = createContext<ImagePreviewContextType | undefined>(
  undefined,
);

export const useImagePreview = () => {
  const context = useContext(ImagePreviewContext);
  if (!context) {
    throw new Error(
      "useImagePreview must be used within a ImagePreviewProvider",
    );
  }
  return context;
};

type ImagePreviewState = {
  isVisible: boolean;
  imageId: string | null;
  imageUrl: string | null;
  onClose: () => void;
  onCopy?: (imageUrl: string) => void;
};

export const ImagePreviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imagePreviewState, setImagePreviewState] = useState<ImagePreviewState>(
    {
      isVisible: false,
      imageId: null,
      imageUrl: null,
      onClose: () => {
        setImagePreviewState((prev) => ({
          ...prev,
          isVisible: false,
          imageId: null,
          imageUrl: null,
        }));
      },
    },
  );

  const showImage = (
    imageId: string,
    imageUrl: string,
    onCopy?: (imageUrl: string) => void,
  ) => {
    setImagePreviewState((prev) => ({
      ...prev,
      isVisible: true,
      imageId,
      imageUrl,
      onCopy,
    }));
  };

  return (
    <ImagePreviewContext.Provider value={{ showImage }}>
      {children}
      <ImagePreview
        isVisible={imagePreviewState.isVisible}
        imageId={imagePreviewState.imageId}
        imageUrl={imagePreviewState.imageUrl}
        onClose={imagePreviewState.onClose}
        onCopy={imagePreviewState.onCopy}
      />
    </ImagePreviewContext.Provider>
  );
};

// TODO: handle escape key press to close the image preview.
const ImagePreview: React.FC<ImagePreviewState> = (props) => {
  const imageId = props.imageId ?? "";
  const imageUrl = props.imageUrl ?? "";

  return props.isVisible ? (
    <div
      className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
      onClick={() => props.onClose()}
    >
      <div className="relative h-[80%] w-full max-w-screen-lg">
        <Image
          src={imageUrl}
          alt={imageId}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <button
        className="absolute right-5 top-5 z-50 text-3xl text-white"
        onClick={() => props.onClose()}
      >
        <X />
      </button>
      <button
        className="absolute right-5 top-20 z-50 text-2xl text-white"
        onClick={() => {
          props.onCopy && props.onCopy(imageUrl);
        }}
      >
        <Copy />
      </button>
    </div>
  ) : null;
};

export default ImagePreview;
