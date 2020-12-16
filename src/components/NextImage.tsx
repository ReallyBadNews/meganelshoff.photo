import { FC } from "react";
import Image from "next/image";

interface NextImageProps {
  alt: string;
  imgBase64: string;
  imgSrc: string;
  height: number;
  width: number;
}

const NextImage: FC<NextImageProps> = ({
  alt,
  imgBase64,
  imgSrc,
  height,
  width,
}) => {
  return (
    <div className="relative overflow-hidden">
      <img
        aria-hidden="true"
        alt="placeholder"
        src={imgBase64}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center transform scale-125"
        style={{ filter: "blur(2rem)" }}
      />
      <Image
        src={imgSrc}
        alt={alt}
        height={height}
        width={width}
        layout="responsive"
      />
    </div>
  );
};

export default NextImage;
