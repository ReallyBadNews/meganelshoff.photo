// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { cloudinaryRouter } from "./cloudinary";

export const appRouter = router({
  cloudinary: cloudinaryRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
