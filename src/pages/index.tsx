import Fuse from "fuse.js";
import { useState } from "react";
import { copyImageToClipboard } from "~/utils/copy-image";
import { MdOutlineClear, MdOutlineFileCopy } from "react-icons/md";
import { PopupProvider, usePopup } from "~/components/Popup";
import { BOOKS_LIBRARY } from "~/utils/library";
import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/OrlyHead";
import { motion } from "framer-motion";
import ImagePreview from "~/components/ImagePreview";
import BlurringImage from "~/components/BlurringImage";
import {env} from "~/env.mjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <OrlyHead />
      <PopupProvider>
        <BookSearch />
      </PopupProvider>
      <OrlyFooter />
    </div>
  );
}

const BookSearch = () => {
  const { showPopup } = usePopup();

  const [searchTerm, setSearchTerm] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const fuse = new Fuse(BOOKS_LIBRARY, {
    threshold: 0.4,
    includeScore: true,
    keys: [
      {
        name: "title",
        weight: 0.6,
      },
      {
        name: "headline",
        weight: 0.2,
      },
      {
        name: "tags",
        weight: 0.2,
      },
    ],
  });

  const handleCopyClick = async (imageUrl: string | null) => {
    if (imageUrl === null) return;
    await copyImageToClipboard(imageUrl)
      .then(() => {
        showPopup("Image copied to the clipboard!", 3000);
      })
      .catch(() => {
        showPopup("Failed to copy image to the clipboard", 3000, "warning");
      });
  };

  const booksToShow = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : BOOKS_LIBRARY;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="container mx-auto flex w-full flex-col items-center justify-center px-4">
        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-black">
          Search O&apos;RLY Covers
        </h1>
        <p className="mb-16 text-center font-mono tracking-tight text-gray-600">
          Strengthen your{" "}
          <span className="underline-offset-3 underline decoration-blue-400 decoration-2 dark:decoration-blue-600">
            arguments
          </span>{" "}
          with compelling programming book covers
        </p>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      {booksToShow && booksToShow.length !== 0 ? (
        <motion.div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {booksToShow.map((book) => (
            <BookTile
              key={book.image}
              title={book.title}
              imageUrl={`${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`}
              onCopyClick={() => void handleCopyClick(`${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`)}
              onImageClick={() => setPreviewImageUrl(`${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`)}
            />
          ))}
        </motion.div>
      ) : (
        <NoResultsMessage />
      )}
      <ImagePreview
        imageUrl={previewImageUrl}
        onClose={() => setPreviewImageUrl(null)}
        onCopy={() => void handleCopyClick(previewImageUrl)}
      />
    </main>
  );
};

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative mb-12 w-full max-w-lg">
      <input
        className="w-full rounded-md border py-2 pl-4 pr-8 font-mono"
        type="text"
        placeholder="Type your keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl"
          onClick={() => onChange("")}
        >
          <MdOutlineClear />
        </button>
      )}
    </div>
  );
};

const BookTile = ({
  title,
  imageUrl,
  onCopyClick,
  onImageClick,
}: {
  title: string;
  imageUrl: string;
  onCopyClick: () => void;
  onImageClick: () => void;
}) => (
  <motion.div layout className="group relative rounded-lg bg-white shadow">
    <button
      className="absolute right-0 top-0 z-10 hidden rounded-lg bg-gray-200 p-2 text-xl opacity-70 hover:opacity-90 group-hover:block"
      onClick={onCopyClick}
    >
      <MdOutlineFileCopy />
    </button>
    <BlurringImage alt={title} imageUrl={imageUrl} onClick={onImageClick} />
    <h3 className="m-2 font-mono text-sm font-medium text-gray-900">
      {title.length < 45 ? title : title.slice(0, 40) + "..."}
    </h3>
  </motion.div>
);

const NoResultsMessage = () => {
  return (
    <div className="py-20 text-center font-mono">
      <p className="text-gray-500">
        Try another keyword or{" "}
        <a
          href="https://orly.nanmu.me/"
          className="font-bold decoration-blue-400 decoration-2 hover:underline dark:decoration-blue-600"
        >
          create your own cover
        </a>
      </p>
    </div>
  );
};
