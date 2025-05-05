import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import BlurringImage from "~/components/BlurringImage";

interface AdvertTileProps {
  title: string;
  imageUrl: string;
  externalUrl: string;
  alt: string;
  onCopyClick: () => void;
}

const AdvertTile = ({
  title,
  imageUrl,
  externalUrl,
  alt,
  onCopyClick,
}: AdvertTileProps) => {
  const router = useRouter();

  const handleImageClick = () => {
    void router.push(externalUrl);
  };

  return (
    <motion.div
      layout
      className="group relative animate-rainbow rounded-lg bg-[linear-gradient(#fff,#fff),linear-gradient(90deg,theme('colors.red.500'),theme('colors.purple.500'),theme('colors.blue.500'),theme('colors.cyan.500'),theme('colors.lime.500'),theme('colors.orange.500'))] bg-[length:200%] transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.10*1rem)_solid_transparent] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(90deg,theme('colors.red.500'),theme('colors.purple.500'),theme('colors.blue.500'),theme('colors.cyan.500'),theme('colors.lime.500'),theme('colors.orange.500'))]"
    >
      <div className="relative rounded-lg bg-white shadow">
        <button
          className="absolute right-0 top-0 z-10 hidden rounded-lg bg-gray-200 p-2 opacity-70 hover:opacity-90 group-hover:block"
          onClick={onCopyClick}
        >
          <ExternalLink />
        </button>
        <div className="relative z-[1] h-full rounded-lg bg-white">
          <BlurringImage
            alt={alt}
            imageUrl={imageUrl}
            onClick={handleImageClick}
          />
          <Link
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="h-full p-2 font-mono text-sm decoration-blue-400 group-hover:underline group-hover:decoration-2">
              {title.length < 60 ? title : title.slice(0, 56) + "..."}
            </h3>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvertTile;
