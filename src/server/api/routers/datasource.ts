import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const datasourceRouter = createTRPCRouter({
  getBookById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.book.findFirst({
      where: { id: input },
    });
  }),
  getStoryById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.story.findFirst({
      where: { id: input },
    });
  }),
});
