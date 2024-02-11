import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import BOOK_LIBRARY, { type Book } from "~/lib/library";

export type SortMode = "default" | "newest" | "oldest" | "alphabetical";

const useBookSearch = (initialSortMode: SortMode = "default") => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>(initialSortMode);
  const [sortedBookLibrary, setSortedBookLibrary] =
    useState<Book[]>(BOOK_LIBRARY);

  useEffect(() => {
    const sortBooks = BOOK_LIBRARY.slice().sort((a, b) => {
      switch (sortMode) {
        case "newest":
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        case "oldest":
          return Date.parse(a.createdAt) - Date.parse(b.createdAt);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setSortedBookLibrary(sortBooks);
  }, [sortMode]);

  const fuseIndex = useMemo(
    () =>
      new Fuse(sortedBookLibrary, {
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
        keys: [
          { name: "title", weight: 0.4 },
          { name: "headline", weight: 0.4 },
          { name: "tags", weight: 0.4 },
        ],
      }),
    [sortedBookLibrary],
  );

  const booksToShow = useMemo(
    () =>
      searchTerm
        ? fuseIndex.search(searchTerm).map((result) => result.item)
        : sortedBookLibrary,
    [searchTerm, fuseIndex, sortedBookLibrary],
  );

  return { booksToShow, searchTerm, setSearchTerm, sortMode, setSortMode };
};

export default useBookSearch;
