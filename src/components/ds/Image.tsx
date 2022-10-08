import Image, { ImageLoader, ImageProps } from "next/future/image";

const cloudinaryLoader: ImageLoader = ({ src, width, quality }) => {
  console.log("[cloudinaryLoader] props", { src, width, quality });
  return `https://res.cloudinary.com/ddibad3k7/image/upload/f_auto/w_${width},q_${
    quality || 75
  }/${src}`;
};

export default function DSImage({ src, alt, ...props }: ImageProps) {
  return <Image loader={cloudinaryLoader} src={src} alt={alt} {...props} />;
}
