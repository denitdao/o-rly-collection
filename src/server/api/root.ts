import { createTRPCRouter } from "~/server/api/trpc";
import { observationRouter } from "~/server/api/routers/observation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  observation: observationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
