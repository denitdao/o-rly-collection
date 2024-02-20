import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import BOOK_LIBRARY, { type Book } from "~/lib/library";

export type SortMode = "default" | "newest" | "oldest" | "alphabetical";

const useBookSearch = (
  numberOfKeywords = 5,
  initialSortMode: SortMode = "default",
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>(initialSortMode);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [sortedBookLibrary, setSortedBookLibrary] =
    useState<Book[]>(BOOK_LIBRARY);

  const refreshKeywords = useCallback(() => {
    const uniqueTags = getUniqueTags();
    const randomTags = getRandomTags(uniqueTags, numberOfKeywords);
    setKeywords(randomTags);
  }, [numberOfKeywords]);

  useEffect(() => {
    refreshKeywords();
  }, [refreshKeywords]);

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

  return {
    booksToShow,
    searchTerm,
    setSearchTerm,
    sortMode,
    setSortMode,
    keywords,
    refreshKeywords,
  };
};

const getUniqueTags = () => {
  const tags = new Set<string>();
  BOOK_LIBRARY.forEach((book) => {
    book.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
};

const getRandomTags = (tags: string[], count: number) => {
  const randomTags: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * tags.length);
    randomTags.push(tags[randomIndex]!);
    tags.splice(randomIndex, 1); // Remove used tag
  }
  return randomTags;
};

export default useBookSearch;
