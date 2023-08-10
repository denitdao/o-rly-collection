import { useState } from "react";
import Image from "next/image";
import { cn } from "~/utils/helpers";

const BlurringImage = ({
  alt,
  imageUrl,
  onClick,
}: {
  alt: string;
  imageUrl: string;
  onClick: () => void;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200 hover:cursor-pointer">
      <Image
        alt={alt}
        src={imageUrl}
        fill
        onClick={onClick}
        className={cn(
          "rounded-lg object-cover duration-500 ease-in-out",
          isLoading
            ? "scale-105 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0 group-hover:scale-95 group-hover:duration-200"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default BlurringImage;
