import { motion } from "framer-motion";
import BlurringImage from "~/components/BlurringImage";
import { Copy } from "lucide-react";
import Link from "next/link";

const BookTile = ({
  title,
  alt,
  bookId,
  imageUrl,
  onCopyClick,
  onImageClick,
}: {
  title: string;
  alt: string;
  bookId: string;
  imageUrl: string;
  onCopyClick: () => void;
  onImageClick: () => void;
}) => (
  <motion.div layout className="relative rounded-lg bg-white shadow">
    <div className="group">
      <button
        className="absolute right-0 top-0 z-10 hidden rounded-lg bg-gray-200 p-2 text-xl opacity-70 hover:opacity-90 group-hover:block"
        onClick={onCopyClick}
      >
        <Copy />
      </button>
      <BlurringImage alt={alt} imageUrl={imageUrl} onClick={onImageClick} />
    </div>
    <Link
      href={{
        pathname: "/books/[slug]",
        query: { slug: bookId },
      }}
    >
      <h3 className="m-2 font-mono text-sm font-medium text-gray-900 decoration-blue-400 hover:underline hover:decoration-2">
        {title.length < 50 ? title : title.slice(0, 46) + "..."}
      </h3>
    </Link>
  </motion.div>
);

export default BookTile;
