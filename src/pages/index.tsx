import OrlyFooter from "~/components/OrlyFooter";
import OrlyHead from "~/components/meta/OrlyHead";
import { motion } from "framer-motion";
import { ImagePreviewProvider } from "~/components/ImagePreview";
import { env } from "~/env.js";
import Link from "next/link";
import BookTile from "~/components/BookTile";
import SearchBar from "~/components/SearchBar";
import {
  useObserveSearchEffect,
  useObserveSortModeEffect,
} from "~/hooks/useObservabilityEvents";
import useImageView from "~/hooks/useImageView";
import { useBookKeywords, useBookSearch } from "~/hooks/useBookSearch";
import SortSelect from "~/components/SortSelect";
import RefreshButton from "~/components/RefreshButton";
import SearchPills from "~/components/SearchPills";
import OrlyHeader from "~/components/OrlyHeader";
import useLinkCopy from "~/hooks/useLinkCopy";

export default function Home() {
  return (
    <>
      <OrlyHead />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <OrlyHeader />
        <ImagePreviewProvider>
          <BookSearch />
        </ImagePreviewProvider>
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookSearch = () => {
  const { booksToShow, searchTerm, setSearchTerm, sortMode, setSortMode } =
    useBookSearch();

  const { keywords, refreshKeywords } = useBookKeywords(8);

  useObserveSearchEffect(searchTerm);
  useObserveSortModeEffect(sortMode);
  const linkCopyHandler = useLinkCopy();
  const imageViewHandler = useImageView();

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
        {booksToShow && booksToShow.length !== 0 ? (
          <motion.div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {booksToShow.map((book) => {
              const bookId = book.id;
              const imageUrl = `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`;
              const bookTitle = book.title;
              const bookAlt = book.title + " | " + book.headline;

              const theLinkCopyHandler = () => {
                linkCopyHandler(`${env.NEXT_PUBLIC_SITE_URL}/books/${bookId}`);
              };

              return (
                <BookTile
                  key={bookId}
                  title={bookTitle}
                  alt={bookAlt}
                  bookId={bookId}
                  imageUrl={imageUrl}
                  onCopyClick={theLinkCopyHandler}
                  onImageClick={() =>
                    void imageViewHandler(bookId, imageUrl, theLinkCopyHandler)
                  }
                />
              );
            })}
          </motion.div>
        ) : (
          <NoResultsMessage />
        )}
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
          href="https://orly.nanmu.me/"
          className="font-bold decoration-blue-400 decoration-2 hover:underline"
        >
          create your own cover
        </Link>
      </p>
    </div>
  );
};
