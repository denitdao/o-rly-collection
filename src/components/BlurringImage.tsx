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
          "scale-100 rounded-lg object-cover blur-0 grayscale-0 duration-500 ease-in-out group-hover:scale-95 group-hover:duration-200",
        )}
      />
    </AspectRatio>
  );
};

export default BlurringImage;
