import { createRouter } from "./context";
import { z } from "zod";
import { getCloudinaryImages } from "../common/get-cloudinary-images";

export const exampleRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getCloudinaryImages", {
    input: z.object({
      folder: z.string(),
    }),
    resolve: async ({ input }) => {
      const { folder } = input;
      const images = await getCloudinaryImages(folder);
      return images;
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  })
  .mutation("create", {
    input: z.object({ text: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.example.create({
        data: { text: input.text },
      });
    },
  })
  .mutation("update", {
    input: z.object({ id: z.string(), text: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.example.update({
        where: { id: input.id },
        data: { text: input.text },
      });
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.example.delete({
        where: { id: input.id },
      });
    },
  });
