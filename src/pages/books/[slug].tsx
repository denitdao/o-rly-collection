import { env } from "~/env.js";
import Image from "next/image";
import React from "react";
import BOOK_LIBRARY, { type Book } from "~/lib/library";
import OrlyHead from "~/components/meta/OrlyHead";
import OrlyFooter from "~/components/OrlyFooter";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import SearchPills, { type PillData } from "~/components/SearchPills";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { db } from "~/server/db";
import { createCaller } from "~/server/api/root";

export const getStaticProps: GetStaticProps = async (context) => {
  const bookId = context.params?.slug as string;
  const book = BOOK_LIBRARY.find((book) => book.id === bookId) ?? null;

  const trpc = createCaller({ db });
  const story = await trpc.datasource.getStoryById(bookId);

  return {
    props: story
      ? {
          book,
          story: story.content,
        }
      : {
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
  story,
}: {
  book: Book | null;
  story?: string;
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
      <OrlyHead description={book.title} imageName={book.image} />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header title={book.title} />
        <BookContent book={book} story={story} />
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookContent = ({ book, story }: { book: Book; story?: string }) => {
  const router = useRouter();

  const keywords: PillData[] = book.tags.split(",").map((tag) => ({
    keyword: tag.trim(),
    colors: [book.color],
  }));

  const imageUrl = `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`;

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
            className="mb-4"
          />
          <div className="mb-12 flex flex-wrap items-center gap-2">
            <SearchPills
              activeKeyword={""}
              pillDataArray={keywords}
              onKeywordClick={(keyword) => {
                router
                  .push({
                    pathname: "/",
                    query: { search: keyword },
                  })
                  .catch((_) => {
                    toast.info("Will be implemented soon", {
                      duration: 2000,
                    });
                  });
              }}
            />
          </div>
          <div className="max-w-3xl">
            {story
              ?.split("\n")
              .filter((text) => text.length > 0)
              .map((paragraph, index) => (
                <p className="leading-7 [&:not(:first-child)]:mt-6" key={index}>
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const getLoremIpsum = (): string => {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
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
