import { env } from "~/env.js";
import useImageCopy from "~/hooks/useImageCopy";
import Image from "next/image";
import React from "react";
import BOOK_LIBRARY, { type Book } from "~/lib/library";
import OrlyHead from "~/components/meta/OrlyHead";
import OrlyFooter from "~/components/OrlyFooter";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import useLinkCopy from "~/hooks/useLinkCopy";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const bookId = context.params?.slug as string;
  const book = BOOK_LIBRARY.find((book) => book.id === bookId) ?? null;

  return {
    props: {
      book,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BOOK_LIBRARY.map((book) => ({
    params: { slug: book.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default function BookPage({
  book,
}: {
  book: Book | null;
}): InferGetStaticPropsType<typeof getStaticProps> {
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
        <Header title={book.title} />
        <BookContent book={book} />
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookContent = ({ book }: { book: Book }) => {
  const imageCopy = useImageCopy();
  const linkCopy = useLinkCopy();

  const imageUrl = env.NEXT_PUBLIC_IMAGE_SOURCE + "/" + book.image;

  return (
    <main className="px-4 pb-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full flex-col items-center">
          <Image
            priority
            alt={book.id}
            src={imageUrl}
            quality={100}
            height={600}
            width={600}
          />
        </div>
      </div>
    </main>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <header className="px-4 py-16">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center">
        <h1 className="mb-5 max-w-[800px] text-4xl font-extrabold tracking-tight text-black">
          {title}
        </h1>
        <p className="text-center font-mono tracking-tight text-gray-600">
          View the collection of compelling{" "}
          <Link
            href={"/"}
            className="underline decoration-blue-400 decoration-2 underline-offset-2"
          >
            programming book covers
          </Link>
        </p>
      </div>
    </header>
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
