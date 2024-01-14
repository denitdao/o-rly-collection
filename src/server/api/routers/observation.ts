import { z } from "zod";
import { kv } from "@vercel/kv";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const observationRouter = createTRPCRouter({
  image_copy: publicProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ input }) => {
      const key = `copy__${input.imageName}`;
      const number = await kv.incr(key);
      console.log(`Image ${key} has been copied ${number} times`);
    }),
  image_view: publicProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ input }) => {
      const key = `view__${input.imageName}`;
      const number = await kv.incr(key);
      console.log(`Image ${key} has been viewed ${number} times`);
    }),
  user_search: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const key = "search__queries";
      await kv.lpush(key, input.query);
      await kv.ltrim(key, 0, 9999);
      console.log(`User searched for "${input.query}"`);
    }),
});
