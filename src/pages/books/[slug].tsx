import { env } from "~/env.js";
import useImageCopy from "~/hooks/useImageCopy";
import { useRouter } from "next/router";
import Image from "next/image";
import { Copy, X } from "lucide-react";
import React from "react";
import BOOK_LIBRARY from "~/lib/library";

export default function BookPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <BookContent />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookContent = () => {
  const router = useRouter();
  const onCopy = useImageCopy();

  const bookId: string = router.query.slug as string;
  const book = BOOK_LIBRARY.find((book) => book.id === bookId);

  if (!book) {
    return <div>Book not found</div>;
  }

  const imageUrl = env.NEXT_PUBLIC_IMAGE_SOURCE + "/" + book.image;

  return (
    <main className="px-4 py-16">
      <div
        className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
        onClick={() => router.back()}
      >
        <div className="relative h-[80%] w-full max-w-screen-lg">
          <Image
            src={imageUrl}
            alt={bookId}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <button
          className="absolute right-5 top-5 z-50 text-3xl text-white"
          onClick={() => router.back()}
        >
          <X />
        </button>
        <button
          className="absolute right-5 top-20 z-50 text-2xl text-white"
          onClick={() => {
            onCopy(imageUrl);
          }}
        >
          <Copy />
        </button>
      </div>
    </main>
  );
};
