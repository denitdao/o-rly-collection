import { AspectRatio } from "~/components/ui/aspect-ratio";
import Image from "next/image";

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
        loading="lazy"
        unoptimized={true}
        onClick={onClick}
        fill
        className="h-full w-full scale-100 rounded-lg object-cover blur-0 grayscale-0 duration-500 ease-in-out group-hover:scale-95 group-hover:duration-200"
      />
    </AspectRatio>
  );
};

export default BlurringImage;
