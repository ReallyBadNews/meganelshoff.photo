import React, { FC } from "react";
import { NextSeo } from "next-seo";
import { OpenGraphImages } from "next-seo/lib/types";

type LayoutProps = {
  meta?: {
    title: string;
    description: string;
    titleAppendSiteName: boolean;
    url: string;
    ogImage: OpenGraphImages;
  };
};

const DefaultLayout: FC<LayoutProps> = ({ children, meta }) => {
  const { title, description, titleAppendSiteName = false, url, ogImage } =
    meta || {};
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : "%s"}
        openGraph={{
          title,
          description,
          url,
          images: ogImage ? [ogImage] : undefined,
        }}
        canonical={url}
      />
      <div className="prose lg:prose-xl max-w-screen-md my-12 mx-auto">
        {title && <h1 className="text-xl leading-tight">{title}</h1>}
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
