import { motion } from "framer-motion";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Fragment } from "react";
import AdvertTile from "~/components/AdvertTile";
import BookTile from "~/components/BookTile";
import GoogleAdTile from "~/components/GoogleAdTile";
import { ImagePreviewProvider } from "~/components/ImagePreview";
import OrlyFooter from "~/components/OrlyFooter";
import OrlyHeader from "~/components/OrlyHeader";
import RefreshButton from "~/components/RefreshButton";
import SearchBar from "~/components/SearchBar";
import SearchPills from "~/components/SearchPills";
import SortSelect from "~/components/SortSelect";
import GoogleAdSlot from "~/components/ads/GoogleAdSlot";
import OrlyHead from "~/components/meta/OrlyHead";
import { Badge } from "~/components/ui/badge";
import { env } from "~/env.js";
import { useBookKeywords, useBookSearch } from "~/hooks/useBookSearch";
import useImageView from "~/hooks/useImageView";
import useLinkCopy from "~/hooks/useLinkCopy";
import {
  useObserveSearchEffect,
  useObserveSortModeEffect,
} from "~/hooks/useObservabilityEvents";
import { createCaller } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { type Book } from "~/server/storage/books";

export const getStaticProps: GetStaticProps<{ books: Book[] }> = async () => {
  const trpc = createCaller(createInnerTRPCContext({}));
  const books: Book[] = await trpc.datasource.getAllBooks();

  return {
    props: {
      books,
    },
  };
};

export default function Home({
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <OrlyHead />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <OrlyHeader />
        <ImagePreviewProvider>
          <BookSearch books={books} />
        </ImagePreviewProvider>
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookSearch = ({ books }: { books: Book[] }) => {
  const { booksToShow, searchTerm, setSearchTerm, sortMode, setSortMode } =
    useBookSearch(books);

  const { keywords, refreshKeywords } = useBookKeywords(books, 8);

  useObserveSearchEffect(searchTerm);
  useObserveSortModeEffect(sortMode);
  const linkCopyHandler = useLinkCopy();
  const imageViewHandler = useImageView();

  // Separate handler for ads
  const adLinkCopyHandler = (url: string) => {
    linkCopyHandler(url);
  };

  return (
    <main className="px-4 pb-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full flex-col items-center">
          <div className="mb-4 flex w-full justify-center gap-4">
            <SearchBar
              className="w-full max-w-lg"
              value={searchTerm}
              onInputChange={setSearchTerm}
            />
            <SortSelect value={sortMode} onSortModeChange={setSortMode} />
          </div>
          <div className="mb-10 flex w-full justify-between">
            <div className="flex w-full flex-wrap items-center gap-2">
              <SearchPills
                activeKeyword={searchTerm}
                pillDataArray={keywords}
                onKeywordClick={(keyword) => setSearchTerm(keyword)}
              />
            </div>
            <RefreshButton onRefresh={refreshKeywords} />
          </div>
        </div>
        <div style={{ maxHeight: "90px", overflow: "hidden" }}>
          <GoogleAdSlot
            slot="6532856977"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
        {booksToShow && booksToShow.length !== 0 ? (
          <motion.div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {booksToShow.map((book, index) => {
              const bookId = book.id;
              const imageUrl = `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`;
              const bookTitle = book.title;
              const bookAlt = book.title + " | " + book.headline;

              const theLinkCopyHandler = () => {
                linkCopyHandler(`${env.NEXT_PUBLIC_SITE_URL}/books/${bookId}`);
              };

              const items = [];

              // Insert Dumai ad at position 6
              if (index === 5 && booksToShow.length >= 6) {
                items.push(
                  <AdvertTile
                    key="ad-tile-dumai"
                    title="Sponsored: Dumai - Record & Organize Your Thoughts"
                    imageUrl="/images/voice-notes.png"
                    externalUrl="https://dumai.app/"
                    alt="Voice Notes - Record, summarize and organize your thoughts with AI"
                    onCopyClick={() => adLinkCopyHandler("https://dumai.app/")}
                  />,
                );
              }

              // Insert a single Google Ad at the 10th position
              if (index === 9 && booksToShow.length >= 10) {
                items.push(<GoogleAdTile key="google-ad-10th" />);
              }

              // Add the book tile
              items.push(
                <BookTile
                  key={bookId}
                  alt={bookAlt}
                  title={bookTitle}
                  bookId={bookId}
                  imageUrl={imageUrl}
                  onCopyClick={theLinkCopyHandler}
                  onImageClick={() =>
                    void imageViewHandler(bookId, imageUrl, theLinkCopyHandler)
                  }
                />,
              );

              return items.length > 1 ? (
                <Fragment key={`fragment-${bookId}`}>{items}</Fragment>
              ) : (
                items[0]
              );
            })}
          </motion.div>
        ) : (
          <NoResultsMessage />
        )}
        <div style={{ maxHeight: "90px", overflow: "hidden" }}>
          <GoogleAdSlot
            slot="2433829867"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </main>
  );
};

const NoResultsMessage = () => {
  return (
    <div className="py-20 text-center font-mono">
      <p className="text-gray-500">
        Try another keyword or{" "}
        <Link
          href="https://make.orlybooks.com/"
          className="font-bold decoration-blue-400 decoration-2 hover:underline"
        >
          <Badge variant="default" className="bg-blue-400">
            CREATE YOUR OWN COVER
          </Badge>
        </Link>
      </p>
    </div>
  );
};
