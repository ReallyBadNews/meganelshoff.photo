import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getImagesByFolder, getPhotoById } from "../../common/cloudinary";

export const cloudinaryRouter = router({
  getByFolder: publicProcedure
    .input(z.object({ folder: z.string(), maxResults: z.number().optional() }))
    .query(async ({ input }) => {
      const { folder, maxResults } = input;
      const images = await getImagesByFolder({ folder, maxResults });
      return images;
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const images = await getPhotoById(id);
      return images;
    }),
});
