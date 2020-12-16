import fs from "fs";
import path from "path";

type ImageSlug = {
  slug: string;
};

export const getAllImageSlugs = (): Array<ImageSlug> => {
  const imageDirectory = path.join(process.cwd(), "public/images");
  const fileNames = fs.readdirSync(imageDirectory);

  return fileNames.map((fileName) => {
    return {
      slug: `/images/${fileName}`,
    };
  });
};
