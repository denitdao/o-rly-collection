import Head from "next/head";
import Fuse from "fuse.js";
import { useState } from "react";
import { copyImageToClipboard } from "~/utils/copy-image";
import { MdOutlineClear, MdOutlineFileCopy } from "react-icons/md";
import Image from "next/image";
import { PopupProvider, usePopup } from "~/components/Popup";
import { BOOKS_LIBRARY } from "~/utils/library";
import { cn } from "~/utils/helpers";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <OrlyHead />
      <PopupProvider>
        <BookSearch />
      </PopupProvider>
    </div>
  );
}

const OrlyHead = () => {
  return (
    <Head>
      <title>Meme Book Search</title>
      <meta
        name="description"
        content="Search and explore meme books about programming"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = new Fuse(BOOKS_LIBRARY, {
    threshold: 0.5,
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
      <div className="container mx-auto flex w-full flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-black">
          Search Meme Book Covers
        </h1>
        <div className="relative w-full max-w-lg">
          <input
            className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-8"
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
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {booksToShow.map((book, index) => (
          <div
            key={index}
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
            <h3 className="m-2 text-sm font-medium text-gray-900">
              {book.title.length < 40
                ? book.title
                : book.title.slice(0, 40) + "..."}
            </h3>
          </div>
        ))}
      </div>

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
