import Fuse from "fuse.js";
import { useEffect, useState } from "react";
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
import { api } from "~/utils/api";
import { sendGAEvent } from "~/components/ga";

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
  const [previewImage, setPreviewImage] = useState<{
    url: string | null;
    id: string | null;
  }>({ url: null, id: null });

  const { mutate: observeImageCopy } = api.observation.image_copy.useMutation();
  const { mutate: observeImageView } = api.observation.image_view.useMutation();
  const { mutate: observeSearch } = api.observation.user_search.useMutation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        observeSearch({ query: searchTerm });
        sendGAEvent({
          action: "user_search",
          category: "search",
          label: "User Search",
          value: searchTerm,
        });
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timeoutId); // Clear timeout if searchTerm changes
  }, [searchTerm, observeSearch]);

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

  const handleCopyClick = ({
    imageUrl,
    imageId,
  }: {
    imageUrl: string;
    imageId: string;
  }) => {
    if (imageUrl === null) return;

    // Non-blocking call to KV to increase counter for image copy
    observeImageCopy({ imageName: imageId });
    sendGAEvent({
      action: "image_copy",
      category: "image",
      label: "Image Copy",
      value: imageId,
    });

    copyImageToClipboard(imageUrl)
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
                void handleCopyClick({
                  imageUrl: `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`,
                  imageId: book.image,
                })
              }
              onImageClick={() => {
                // Non-blocking call to KV to increase counter for image view
                observeImageView({ imageName: book.image });
                sendGAEvent({
                  action: "image_view",
                  category: "image",
                  label: "Image View",
                  value: book.image,
                });
                setPreviewImage({
                  url: `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`,
                  id: book.image,
                });
              }}
            />
          ))}
        </motion.div>
      ) : (
        <NoResultsMessage />
      )}
      <ImagePreview
        imageUrl={previewImage.url}
        onClose={() => setPreviewImage({ url: null, id: null })}
        onCopy={() =>
          void handleCopyClick({
            imageUrl: previewImage.url!,
            imageId: previewImage.id!,
          })
        }
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
