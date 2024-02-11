import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { cn } from "~/lib/utils";

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
    <AspectRatio
      ratio={3 / 4.1}
      className="w-full overflow-hidden rounded-lg bg-gray-200 hover:cursor-pointer"
    >
      <Image
        alt={alt}
        src={imageUrl}
        fill
        onClick={onClick}
        className={cn(
          "rounded-lg object-cover duration-500 ease-in-out",
          isLoading
            ? "scale-105 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0 group-hover:scale-95 group-hover:duration-200",
        )}
        onLoad={() => setLoading(false)}
      />
    </AspectRatio>
  );
};

export default BlurringImage;
