import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
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
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  }).mutation("create", {
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

