import Head from "next/head";
import Fuse from "fuse.js";
import { useState } from "react";
import { copyImageToClipboard } from "~/utils/copy-image";
import { MdOutlineClear, MdOutlineFileCopy } from "react-icons/md";
import Image from "next/image";
import { PopupProvider, usePopup } from "~/components/Popup";
import { BOOKS_LIBRARY } from "~/utils/library";

export default function Home() {
  return (
    <>
      <OrlyHead />
      <PopupProvider>
        <BookSearch />
      </PopupProvider>
    </>
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

  // TODO: optimize search to make more exact matches
  const fuse = new Fuse(BOOKS_LIBRARY, {
    includeScore: true,
    distance: 1,
    keys: ["title", "headline", "tags"],
  });
  const booksToShow = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : BOOKS_LIBRARY;

  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { showPopup } = usePopup();
  const handleCopyClick = async (image: string) => {
    await copyImageToClipboard(image);
    showPopup("Image copied to the clipboard!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="container flex min-h-screen flex-col items-center justify-start px-4 py-16">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-black">
          Search Meme Book Covers
        </h1>
        <div className="mb-8 w-full max-w-lg">
          <div className="relative">
            <input
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-8"
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
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {booksToShow.map((book, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center hover:cursor-pointer"
              style={{ height: "280px"}}
              onMouseOver={() => setHoverIndex(index)}
              onMouseOut={() => setHoverIndex(-1)}
            >
              <button
                className="absolute right-0 top-0 z-10 rounded bg-gray-200 p-1 text-xl opacity-70 hover:opacity-90"
                onClick={() => void handleCopyClick(book.image)}
                hidden={index !== hoverIndex}
              >
                <MdOutlineFileCopy />
              </button>
              <div
                className="relative w-full flex-grow"
                style={{ paddingBottom: "75%" }}
                onClick={() => setSelectedImage(book.image)}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  layout="fill"
                  className="absolute w-auto transform transition-all duration-300 hover:scale-105"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ height: "60px", width: "100%" }}>
                <h4 className="text-s text-black">
                  {book.title.length < 40
                    ? book.title
                    : book.title.slice(0, 40) + "..."}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-[80%] w-full max-w-screen-lg">
            <Image
              src={selectedImage}
              alt={selectedImage}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <button className="absolute right-4 top-4 text-3xl text-white">
            <MdOutlineClear />
          </button>
        </div>
      )}
    </main>
  );
};
