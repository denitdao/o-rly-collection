import { env } from "~/env.js";
import useImageCopy from "~/hooks/useImageCopy";
import { useRouter } from "next/router";
import Image from "next/image";
import { Copy, X } from "lucide-react";
import React from "react";
import BOOK_LIBRARY, { type Book } from "~/lib/library";
import OrlyHead from "~/components/meta/OrlyHead";
import OrlyFooter from "~/components/OrlyFooter";
import OrlyHeader from "~/components/OrlyHeader";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function BookPage() {
  const router = useRouter();
  const bookId: string = router.query.slug as string;
  const book = BOOK_LIBRARY.find((book) => book.id === bookId);

  if (!book) {
    return (
      <>
        <OrlyHead />
        <BookNotFound />
      </>
    );
  }

  return (
    <>
      <OrlyHead />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <OrlyHeader />
        <BookContent book={book} />
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookContent = ({ book }: { book: Book }) => {
  const router = useRouter();
  const onCopy = useImageCopy();

  const imageUrl = env.NEXT_PUBLIC_IMAGE_SOURCE + "/" + book.image;

  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full flex-col items-center"></div>
        <div
          className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black bg-opacity-70"
          onClick={() => router.back()}
        >
          <div className="relative h-[80%] w-full max-w-screen-lg">
            <Image
              src={imageUrl}
              alt={book.id}
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
      </div>
    </main>
  );
};

const BookNotFound = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="grid gap-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Oops!</h1>
        <p className="mx-auto mb-5 font-mono text-gray-600">
          The book you are looking for could not be found.
        </p>
        <Link className="mx-auto" href="/">
          <Button variant="outline">Navigate Home 🧭</Button>
        </Link>
      </div>
    </div>
  );
};
