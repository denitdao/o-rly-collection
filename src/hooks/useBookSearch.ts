import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import {
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

const useBookSearch = (
  books: ReadonlyArray<Book>,
  initialSortMode: SortMode = "default",
) => {
  // Fetch url params
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

  // Initially sort books and update when sort mode changes
  const [sortedBookLibrary, setSortedBookLibrary] = useState<Book[]>(() =>
    sortBooks(books, sortMode),
  );
  useEffect(() => {
    setSortedBookLibrary(sortBooks(books, sortMode));
  }, [books, sortMode]);

  // Create index based on sorted books
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

  // Books that should be displayed
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

const useBookKeywords = (books: ReadonlyArray<Book>, numberOfKeywords = 5) => {
  const FUSE_INDEX_DEFAULT = useMemo(
    () =>
      new Fuse(books, {
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
        keys: [
          { name: "title", weight: 0.4 },
          { name: "headline", weight: 0.4 },
          { name: "tags", weight: 0.4 },
          { name: "color", weight: 0.1 },
        ],
      }),
    [books],
  );

  const UNIQUE_TAGS = useMemo(() => {
    const tags = new Set<string>();
    books.forEach((book) => {
      book.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [books]);

  const [keywords, setKeywords] = useState<KeywordColor[]>([]);
  const refreshKeywords = useCallback(() => {
    const keywordColors = generateKeywordColors(
      UNIQUE_TAGS,
      FUSE_INDEX_DEFAULT,
      numberOfKeywords,
    );

    setKeywords(keywordColors);
  }, [UNIQUE_TAGS, FUSE_INDEX_DEFAULT, numberOfKeywords]);

  useEffect(() => {
    refreshKeywords();
  }, [refreshKeywords]);

  return {
    keywords,
    refreshKeywords,
  };
};

const sortBooks = (books: ReadonlyArray<Book>, sortMode: SortMode) => {
  return books.slice().sort((a, b) => {
    switch (sortMode) {
      case "newest":
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      case "oldest":
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "color":
        return ColorPalette.indexOf(a.color) - ColorPalette.indexOf(b.color);
      default:
        return 0;
    }
  });
};

const generateKeywordColors = (
  UNIQUE_TAGS: string[],
  FUSE_INDEX_DEFAULT: Fuse<Book>,
  numberOfKeywords: number,
) => {
  const randomTags = getRandomTags(UNIQUE_TAGS, numberOfKeywords);

  return randomTags.map((keyword) => {
    const filteredBooks = FUSE_INDEX_DEFAULT.search(keyword).map(
      (result) => result.item,
    );

    const colorFrequency = filteredBooks
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
