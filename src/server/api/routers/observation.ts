import { z } from "zod";
import { kv } from "@vercel/kv";
import { Logger } from "next-axiom";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.js";

const isDevEnv = env.NODE_ENV === "development";

export const observationRouter = createTRPCRouter({
  link_copy: publicProcedure
    .input(z.object({ link: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const log = new Logger();
      const key = `copy__links`;
      const number = await kv.hincrby(key, input.link, 1);
      log.info("Link copied", { link: input.link });

      console.log(`Link ${input.link} has been copied ${number} times`);
    }),
  image_view: publicProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const log = new Logger();
      const key = `view__images`;
      const number = await kv.hincrby(key, input.imageName, 1);
      log.info("Image viewed", { imageName: input.imageName });

      console.log(`Image ${input.imageName} has been viewed ${number} times`);
    }),
  user_search: publicProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const log = new Logger();
      const key = "search__queries";
      const number = await kv.hincrby(key, input.query, 1);
      log.info("User searched", { query: input.query });

      console.log(`User searched for "${input.query}". ${number} times`);
    }),
  sort_mode: publicProcedure
    .input(z.object({ mode: z.string() }))
    .mutation(async ({ input }) => {
      if (isDevEnv) return;
      const log = new Logger();
      const key = "sort__modes";
      const number = await kv.hincrby(key, input.mode, 1);
      log.info("Sort mode used", { mode: input.mode });

      console.log(`Sort mode "${input.mode}" has been used ${number} times`);
    }),
});
