import Fuse from "fuse.js";
import { useState } from "react";
import { copyImageToClipboard } from "~/utils/copy-image";
import { MdOutlineClear, MdOutlineFileCopy } from "react-icons/md";
import Image from "next/image";
import { PopupProvider, usePopup } from "~/components/Popup";
import { BOOKS_LIBRARY } from "~/utils/library";
import { cn } from "~/utils/helpers";
import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/OrlyHead";
import { motion } from "framer-motion";

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
  const [searchTerm, setSearchTerm] = useState("");

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
  const booksToShow = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : BOOKS_LIBRARY;

  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { showPopup } = usePopup();
  const handleCopyClick = async (image: string) => {
    await copyImageToClipboard(image);
    showPopup("Image copied to the clipboard!", 3000);
  };

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
        <div className="relative mb-12 w-full max-w-lg">
          <input
            className="w-full rounded-md border py-2 pl-4 pr-8 font-mono"
            type="text"
            placeholder="Type your keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl"
              onClick={() => setSearchTerm("")}
            >
              <MdOutlineClear />
            </button>
          )}
        </div>
      </div>
      {booksToShow && booksToShow.length !== 0 ? (
        <motion.div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {booksToShow.map((book, index) => (
            <motion.div
              layout
              key={book.image}
              className="group relative rounded-lg bg-white shadow"
              onMouseOver={() => setHoverIndex(index)}
              onMouseOut={() => setHoverIndex(-1)}
            >
              <button
                className="absolute right-0 top-0 z-10 rounded-lg bg-gray-200 p-2 text-xl opacity-70 hover:opacity-90"
                onClick={() => void handleCopyClick(book.image)}
                hidden={index !== hoverIndex}
              >
                <MdOutlineFileCopy />
              </button>
              <BlurImage
                title={book.title}
                image={book.image}
                setSelectedImage={setSelectedImage}
              />
              <h3 className="m-2 font-mono text-sm font-medium text-gray-900">
                {book.title.length < 45
                  ? book.title
                  : book.title.slice(0, 40) + "..."}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      ) : (
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
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-[80%] w-full max-w-screen-lg">
            <Image
              src={selectedImage}
              alt={selectedImage}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <button className="absolute right-5 top-5 z-50 text-3xl text-white">
            <MdOutlineClear />
          </button>
          <button
            className="absolute right-5 top-20 z-50 text-2xl text-white"
            onClick={() => void handleCopyClick(selectedImage)}
          >
            <MdOutlineFileCopy />
          </button>
        </div>
      )}
    </main>
  );
};

const BlurImage = ({
  title,
  image,
  setSelectedImage,
}: {
  title: string;
  image: string;
  setSelectedImage: (image: string) => void;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200 hover:cursor-pointer">
      <Image
        alt={title}
        src={image}
        fill
        onClick={() => setSelectedImage(image)}
        className={cn(
          "rounded-lg object-cover duration-500 ease-in-out",
          isLoading
            ? "scale-105 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0 group-hover:scale-95 group-hover:duration-200"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};
