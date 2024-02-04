import Fuse from "fuse.js";
import { useState } from "react";
import { PopupProvider } from "~/components/Popup";
import { BOOKS_LIBRARY } from "~/utils/library";
import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/meta/OrlyHead";
import { motion } from "framer-motion";
import { ImagePreviewProvider } from "~/components/ImagePreview";
import { env } from "~/env.mjs";
import Link from "next/link";
import BookTile from "~/components/BookTile";
import SearchBar from "~/components/SearchBar";
import useImageCopy from "~/hooks/useImageCopy";
import { useObserveSearchEffect } from "~/hooks/useObservabilityEvents";
import useImageView from "~/hooks/useImageView";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <OrlyHead />
      <PopupProvider>
        <ImagePreviewProvider>
          <BookSearch />
        </ImagePreviewProvider>
      </PopupProvider>
      <OrlyFooter />
    </div>
  );
}

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useObserveSearchEffect(searchTerm);
  const imageCopyHandler = useImageCopy();
  const imageViewHandler = useImageView();

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

  const booksToShow = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : BOOKS_LIBRARY;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="container mx-auto flex w-full flex-col items-center justify-center px-4">
        <Heading />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      {booksToShow && booksToShow.length !== 0 ? (
        <motion.div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {booksToShow.map((book) => {
            const imageId = book.image;
            const imageUrl = `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`;
            const bookTitle = book.title;
            const bookAlt = book.title + " | " + book.headline;

            return (
              <BookTile
                key={imageId}
                title={bookTitle}
                alt={bookAlt}
                imageUrl={imageUrl}
                onCopyClick={() => void imageCopyHandler(imageId, imageUrl)}
                onImageClick={() => void imageViewHandler(imageId, imageUrl)}
              />
            );
          })}
        </motion.div>
      ) : (
        <NoResultsMessage />
      )}
    </main>
  );
};

const Heading = () => {
  return (
    <>
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
    </>
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
