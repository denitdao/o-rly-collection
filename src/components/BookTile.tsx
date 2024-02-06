import { motion } from "framer-motion";
import BlurringImage from "~/components/BlurringImage";
import { Copy } from "lucide-react";

const BookTile = ({
  title,
  alt,
  imageUrl,
  onCopyClick,
  onImageClick,
}: {
  title: string;
  alt: string;
  imageUrl: string;
  onCopyClick: () => void;
  onImageClick: () => void;
}) => (
  <motion.div layout className="group relative rounded-lg bg-white shadow">
    <button
      className="absolute right-0 top-0 z-10 hidden rounded-lg bg-gray-200 p-2 text-xl opacity-70 hover:opacity-90 group-hover:block"
      onClick={onCopyClick}
    >
      <Copy />
    </button>
    <BlurringImage alt={alt} imageUrl={imageUrl} onClick={onImageClick} />
    <h3 className="m-2 font-mono text-sm font-medium text-gray-900">
      {title.length < 50 ? title : title.slice(0, 46) + "..."}
    </h3>
  </motion.div>
);

export default BookTile;
