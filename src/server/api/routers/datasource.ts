import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const datasourceRouter = createTRPCRouter({
  getBookIds: publicProcedure.query(async ({ ctx }) => {
    const books = await ctx.db.book.findMany({
      select: { id: true },
    });
    return books.map((book) => book.id);
  }),
  getBookById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.book.findFirst({
      where: { id: input },
      include: { stories: true },
    });
  }),
  getStoryById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.story.findFirst({
      where: { id: input },
    });
  }),
});
