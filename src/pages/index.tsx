import { NextPage } from "next";
// import Image from "../components/ds/Image";
import Image from "next/future/image";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import logo from "../../public/me-logo.png";
import darkLogo from "../../public/me-dark-logo.png";
// import { useSession, signOut, signIn } from "next-auth/react";

const Home: NextPage = () => {
  const images = trpc.cloudinary.getByFolder.useQuery({ folder: "weddings" });

  return (
    <>
      <Head>
        <title>T3 Supabase Hello World</title>
        <meta content="Generated by create-t3-app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <header className="border-b-2 border-b-mauve-6 bg-mauve-3 dark:border-b-mauve-dark-6 dark:bg-mauve-dark-3">
        <div className="container mx-auto px-4 py-8">
          <picture>
            <source
              srcSet={darkLogo.src}
              media="(prefers-color-scheme: dark)"
            />
            <Image src={logo} alt="logo" height={56} />
          </picture>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {!images.isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images.data?.resources.map((image) => {
              if (image.resource_type !== "image") {
                return null;
              }

              return (
                <div key={image.public_id} className="relative aspect-square">
                  <Image
                    key={image.public_id}
                    src={image.public_id}
                    alt="TODO"
                    // height={495}
                    // width={744}
                    className="h-auto w-full rounded-lg shadow-lg"
                    loader={({ src, width, quality }) => {
                      return `https://res.cloudinary.com/ddibad3k7/image/upload/f_auto/w_${width},q_${
                        quality || 75
                      }/${src}`;
                    }}
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    // placeholder="blur"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          "loading images..."
        )}
      </main>
    </>
  );
};

// const AuthShowcase: React.FC = () => {
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

//   const { data: sessionData } = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p className="text-2xl text-blue-5">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && <p className="text-2xl text-blue-5">{secretMessage}</p>}
//       <button
//         className="border-black rounded-md border bg-violet-1 px-4 py-2 text-xl shadow-lg hover:bg-violet-1"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };

export default Home;

// export const getServerSideProps = async () => {
//   const images = await getCloudinaryImages("samples");

//   return {
//     props: {
//       images: images ?? null,
//     },
//   };
// };

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
