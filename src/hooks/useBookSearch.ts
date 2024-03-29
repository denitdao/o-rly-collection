import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import BOOK_LIBRARY, {
  type Book,
  type BookColor,
  ColorPalette,
} from "~/server/storage/books";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

const ValidSortModes = [
  "default",
  "newest",
  "oldest",
  "alphabetical",
  "color",
] as const;

export type SortMode = (typeof ValidSortModes)[number];

interface KeywordColor {
  keyword: string;
  colors: BookColor[];
}

const FUSE_INDEX_DEFAULT = new Fuse(BOOK_LIBRARY, {
  threshold: 0.3,
  includeScore: true,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.4 },
    { name: "headline", weight: 0.4 },
    { name: "tags", weight: 0.4 },
    { name: "color", weight: 0.1 },
  ],
});

const useBookSearch = (initialSortMode: SortMode = "default") => {
  const [searchTerm, setSearchTerm] = useQueryState(
    "search",
    parseAsString
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault(""),
  );
  const [sortMode, setSortMode] = useQueryState(
    "sort",
    parseAsStringLiteral(ValidSortModes)
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault(initialSortMode),
  );
  const [sortedBookLibrary, setSortedBookLibrary] =
    useState<Book[]>(BOOK_LIBRARY);

  useEffect(() => {
    setSortedBookLibrary(
      BOOK_LIBRARY.slice().sort((a, b) => {
        switch (sortMode) {
          case "newest":
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          case "oldest":
            return Date.parse(a.createdAt) - Date.parse(b.createdAt);
          case "alphabetical":
            return a.title.localeCompare(b.title);
          case "color":
            return (
              ColorPalette.indexOf(a.color) - ColorPalette.indexOf(b.color)
            );
          default:
            return 0;
        }
      }),
    );
  }, [sortMode]);

  const FUSE_INDEX_SORTED = useMemo(
    () =>
      new Fuse(sortedBookLibrary, {
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
        keys: [
          { name: "title", weight: 0.4 },
          { name: "headline", weight: 0.4 },
          { name: "tags", weight: 0.4 },
          { name: "color", weight: 0.1 },
        ],
        shouldSort: sortMode === "default",
      }),
    [sortedBookLibrary, sortMode],
  );

  const booksToShow = useMemo(
    () =>
      searchTerm
        ? FUSE_INDEX_SORTED.search(searchTerm).map((result) => result.item)
        : sortedBookLibrary,
    [searchTerm, FUSE_INDEX_SORTED, sortedBookLibrary],
  );

  return {
    booksToShow,
    searchTerm,
    setSearchTerm,
    sortMode,
    setSortMode,
  };
};

const useBookKeywords = (numberOfKeywords = 5) => {
  const [keywords, setKeywords] = useState<KeywordColor[]>([]);

  const UNIQUE_TAGS = useMemo(() => {
    const tags = new Set<string>();
    BOOK_LIBRARY.forEach((book) => {
      book.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const refreshKeywords = useCallback(() => {
    const randomTags = getRandomTags(UNIQUE_TAGS, numberOfKeywords);

    const keywordColors = randomTags.map((keyword) => {
      const books = FUSE_INDEX_DEFAULT.search(keyword).map(
        (result) => result.item,
      );

      const colorFrequency = books
        .map((book) => book.color)
        .sort((a, b) => ColorPalette.indexOf(a) - ColorPalette.indexOf(b))
        .reduce(
          (acc, color) => {
            acc[color] = (acc[color] ?? 0) + 1;
            return acc;
          },
          {} as Record<BookColor, number>,
        );

      const topColors = Object.entries(colorFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([color]) => color as BookColor)
        .sort((a, b) => ColorPalette.indexOf(a) - ColorPalette.indexOf(b));

      return { keyword, colors: topColors };
    });

    setKeywords(keywordColors);
  }, [UNIQUE_TAGS, numberOfKeywords]);

  useEffect(() => {
    refreshKeywords();
  }, [refreshKeywords]);

  return {
    keywords,
    refreshKeywords,
  };
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

export { useBookSearch, useBookKeywords };
