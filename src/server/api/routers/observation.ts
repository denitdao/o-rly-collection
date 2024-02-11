import { z } from "zod";
import { kv } from "@vercel/kv";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.js";

const isDevEnv = env.NODE_ENV === "development";

export const observationRouter = createTRPCRouter({
  image_copy: publicProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const key = `copy__images`;
      const number = await kv.hincrby(key, input.imageName, 1);
      console.log(`Image ${input.imageName} has been copied ${number} times`);
    }),
  image_view: publicProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const key = `view__images`;
      const number = await kv.hincrby(key, input.imageName, 1);
      console.log(`Image ${input.imageName} has been viewed ${number} times`);
    }),
  user_search: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const key = "search__queries";
      const number = await kv.hincrby(key, input.query, 1);
      console.log(`User searched for "${input.query}". ${number} times`);
    }),
});
