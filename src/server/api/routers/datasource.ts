import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import BOOK_LIBRARY from "~/server/storage/books";
import STORY_LIBRARY from "~/server/storage/stories";

export const datasourceRouter = createTRPCRouter({
  getBookIds: publicProcedure.query(() => {
    return BOOK_LIBRARY.map((book) => book.id);
  }),
  getBookById: publicProcedure.input(z.string()).query(({ input }) => {
    return BOOK_LIBRARY.find((book) => book.id === input);
  }),
  getAllBooks: publicProcedure.query(() => {
    return BOOK_LIBRARY;
  }),
  getStoryById: publicProcedure.input(z.string()).query(({ input }) => {
    return STORY_LIBRARY.find((story) => story.id === input);
  }),
});
