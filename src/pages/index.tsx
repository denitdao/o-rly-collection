import Fuse from "fuse.js";
import { useState } from "react";
import { copyImageToClipboard } from "~/utils/copy-image";
import { MdOutlineClear } from "react-icons/md";
import { PopupProvider, usePopup } from "~/components/Popup";
import { BOOKS_LIBRARY } from "~/utils/library";
import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/OrlyHead";
import { motion } from "framer-motion";
import ImagePreview from "~/components/ImagePreview";
import { env } from "~/env.mjs";
import Link from "next/link";
import BookTile from "~/components/BookTile";

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
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
    keys: [
      {
        name: "title",
        weight: 0.4,
      },
      {
        name: "headline",
        weight: 0.4,
      },
      {
        name: "tags",
        weight: 0.4,
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
          <span className="underline decoration-blue-400 decoration-2 underline-offset-2">
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
              alt={book.title + " | " + book.headline}
              imageUrl={`${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`}
              onCopyClick={() =>
                void handleCopyClick(
                  `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`
                )
              }
              onImageClick={() =>
                setPreviewImageUrl(
                  `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`
                )
              }
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

const NoResultsMessage = () => {
  return (
    <div className="py-20 text-center font-mono">
      <p className="text-gray-500">
        Try another keyword or{" "}
        <Link
          href="https://orly.nanmu.me/"
          className="font-bold decoration-blue-400 decoration-2 hover:underline"
        >
          create your own cover
        </Link>
      </p>
    </div>
  );
};
