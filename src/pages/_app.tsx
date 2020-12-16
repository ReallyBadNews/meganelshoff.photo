import React, { FC } from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import SEO from "../../next-seo.json";
import "../styles/globals.css";

const MeganPhotosApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MeganPhotosApp;
