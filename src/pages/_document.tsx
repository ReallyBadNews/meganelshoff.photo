import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-mauve-1 text-pink-12 antialiased dark:bg-mauve-dark-1 dark:text-pink-12">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
