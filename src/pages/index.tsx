import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "layouts";
import { getAllImageSlugs } from "../../lib/posts";
import { getBase64 } from "@plaiceholder/base64";
import { getImage } from "@plaiceholder/next";

export const getStaticProps: GetStaticProps = async () => {
  const imageSlugs = getAllImageSlugs();

  const getImages = async (): Promise<Buffer[]> => {
    return Promise.all(imageSlugs.map((img) => getImage(img.slug)));
  };

  const imgsBase64 = await getImages().then((data) =>
    data.map((img) => getBase64(img))
  );

  return {
    props: {
      imgsBase64,
      imageSlugs,
    },
  };
};

const Home: NextPage = (props) => {
  console.log("props", props);
  return (
    <div>
      <Head>
        <title>Next.js, TypeScript, Tailwind, Jest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <h1>Hi! I&lsquo;m Megan Elshoff</h1>
        <p>
          I’m a developer, writer, and creator. I work at ▲Vercel as a Solutions
          Architect. You’ve found my personal slice of the internet – everything
          you want to know and more is here.
        </p>
        <h3>Most Popular</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing
          diam donec adipiscing tristique risus nec feugiat in. Est ullamcorper
          eget nulla <Link href="/hi">facilisi etiam</Link> dignissim diam. Sed
          odio morbi quis commodo odio. Mattis pellentesque id nibh tortor id.
          Enim nunc faucibus a pellentesque sit amet porttitor eget dolor.
          Aliquet enim tortor at auctor urna nunc id cursus metus. Facilisi
          nullam vehicula ipsum a arcu. Sed ullamcorper morbi tincidunt ornare
          massa eget egestas. Faucibus scelerisque eleifend donec pretium
          vulputate. Aenean pharetra magna ac placerat vestibulum lectus mauris.
          Molestie nunc non blandit massa enim nec dui. Velit scelerisque in
          dictum non consectetur a erat. Consequat interdum varius sit amet
          mattis vulputate enim nulla. Lacus sed viverra tellus in hac habitasse
          platea dictumst vestibulum.
        </p>
        <h3>Projects</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing
          diam donec adipiscing tristique risus nec feugiat in. Est ullamcorper
          eget nulla facilisi etiam dignissim diam. Sed odio morbi quis commodo
          odio. Mattis pellentesque id nibh tortor id. Enim nunc faucibus a
          pellentesque sit amet porttitor eget dolor. Aliquet enim tortor at
          auctor urna nunc id cursus metus. Facilisi nullam vehicula ipsum a
          arcu. Sed ullamcorper morbi tincidunt ornare massa eget egestas.
          Faucibus scelerisque eleifend donec pretium vulputate. Aenean pharetra
          magna ac placerat vestibulum lectus mauris. Molestie nunc non blandit
          massa enim nec dui. Velit scelerisque in dictum non consectetur a
          erat. Consequat interdum varius sit amet mattis vulputate enim nulla.
          Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum.
        </p>
        <div></div>
      </DefaultLayout>
    </div>
  );
};

export default Home;
