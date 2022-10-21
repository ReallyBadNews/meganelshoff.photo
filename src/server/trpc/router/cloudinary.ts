import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { ResourceApiResponse, v2 as cloudinary } from "cloudinary";
import { env } from "../../../env/server.mjs";
import { getPlaiceholder } from "plaiceholder";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryRouter = router({
  getByFolder: publicProcedure
    .input(z.object({ folder: z.string(), maxResults: z.number().optional() }))
    .query(async ({ input }) => {
      const { folder, maxResults = 30 } = input;

      const images = await cloudinary.api
        .resources({
          type: "upload",
          prefix: folder,
          max_results: maxResults,
        })
        .then((res: ResourceApiResponse) => {
          return res.resources.map(async (image) => {
            const { base64 } = await getPlaiceholder(image.secure_url);
            return {
              ...image,
              base64,
            };
          });
        });

      return Promise.all(images);
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      const image: ResourceApiResponse["resources"][0] =
        await cloudinary.api.resource(id);

      const { base64 } = await getPlaiceholder(image.secure_url);

      return {
        ...image,
        base64,
      };
    }),
});
