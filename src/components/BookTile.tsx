import { motion } from "framer-motion";
import BlurringImage from "~/components/BlurringImage";
import { Link as LinkIcon } from "lucide-react";
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
  <motion.div layout className="group relative rounded-lg bg-white shadow">
    <button
      className="absolute right-0 top-0 z-10 hidden rounded-lg bg-gray-200 p-2 opacity-70 hover:opacity-90 group-hover:block"
      onClick={onCopyClick}
    >
      <LinkIcon />
    </button>
    <BlurringImage alt={alt} imageUrl={imageUrl} onClick={onImageClick} />
    <Link
      prefetch={false}
      href={{
        pathname: "/books/[slug]",
        query: { slug: bookId },
      }}
    >
      <h3 className="m-2 font-mono text-sm decoration-blue-400 group-hover:underline group-hover:decoration-2">
        {title.length < 50 ? title : title.slice(0, 46) + "..."}
      </h3>
    </Link>
  </motion.div>
);

export default BookTile;
