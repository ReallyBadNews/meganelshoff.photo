import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getCloudinaryImages } from "../../common/get-cloudinary-images";

export const exampleRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getCloudinaryImages: publicProcedure
    .input(z.object({ folder: z.string() }))
    .query(async ({ input }) => {
      const { folder } = input;
      const images = await getCloudinaryImages(folder);
      return images;
    }),
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.create({
        data: { text: input.text },
      });
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.update({
        where: { id: input.id },
        data: { text: input.text },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.delete({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
