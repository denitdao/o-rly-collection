import Image from "next/image";
import { MdOutlineClear, MdOutlineFileCopy } from "react-icons/md";
import React from "react";

type ImagePreviewProps = {
  imageUrl: string | null;
  onClose: () => void;
  onCopy: () => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onClose,
  onCopy,
}) => {
  return imageUrl ? (
    <div
      className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div className="relative h-[80%] w-full max-w-screen-lg">
        <Image
          src={imageUrl}
          alt={imageUrl}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <button
        className="absolute right-5 top-5 z-50 text-3xl text-white"
        onClick={onClose}
      >
        <MdOutlineClear />
      </button>
      <button
        className="absolute right-5 top-20 z-50 text-2xl text-white"
        onClick={onCopy}
      >
        <MdOutlineFileCopy />
      </button>
    </div>
  ) : null;
};

export default ImagePreview;
