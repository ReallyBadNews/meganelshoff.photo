import { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Image from "next/future/image";
import Head from "next/head";
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FC,
  FormEventHandler,
  useState,
} from "react";
import { ReactQueryDevtools } from "react-query/devtools";
// import { getCloudinaryImages } from "../server/common/get-cloudinary-images";
import { trpc } from "../utils/trpc";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const DeleteButton: FC<ButtonProps> = ({ id, ...rest }) => {
  return (
    <button
      className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium  text-red-500 hover:bg-red-300"
      id={id}
      {...rest}
    >
      Delete
    </button>
  );
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.getAll"]);
  const create = trpc.useMutation(["example.create"]);
  const del = trpc.useMutation(["example.delete"]);
  const session = trpc.useQuery(["example.getSession"]);
  const images = trpc.useQuery([
    "example.getCloudinaryImages",
    { folder: "samples/people" },
  ]);
  const utils = trpc.useContext();
  const [name, setName] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    create.mutate(
      { text: name },
      {
        onSettled: () => {
          setName("");
          utils.invalidateQueries(["example.getAll"]);
        },
      }
    );
  };

  const handleDelete = async (id: string) => {
    console.log("[DELETE]", id);
    del.mutate(
      { id },
      {
        onSettled: () => {
          return utils.invalidateQueries(["example.getAll"]);
        },
      }
    );
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Head>
        <title>T3 Supabase Hello World</title>
        <meta content="Generated by create-t3-app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="container mx-auto flex h-screen flex-col items-center  px-4 py-8">
        <h1 className="text-5xl font-extrabold  text-gray-700 md:text-[5rem]">
          {`meganelshoff`}
          <span className="text-purple-300">.photo</span>
        </h1>
        {session.data?.user ? (
          <div className="mt-8 flex flex-row items-center gap-4">
            <p>{`Hello, ${session.data.user.name}`}</p>
            <button
              className="rounded-lg bg-red-100 px-4 py-1 text-sm font-medium  text-red-500 hover:bg-red-300"
              onClick={() => {
                return signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium  text-blue-700 hover:bg-blue-200 active:bg-blue-300"
            onClick={() => {
              return signIn("google");
            }}
          >
            Sign In
          </button>
        )}
        <form className="mt-8" onSubmit={handleSubmit}>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="messsage"
          >
            Message:
          </label>
          <input
            className="rounded-lg border-2 border-gray-500 bg-slate-100 py-2 px-4 text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
            id="messsage"
            value={name}
            onChange={handleChange}
          />
        </form>
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-6 text-3xl text-slate-600">
          {hello.data?.map((item) => {
            return (
              <div key={item.id} className="flex items-baseline gap-4">
                <p className="text-base">{item.text}</p>
                {session.data?.user ? (
                  <DeleteButton onClick={() => handleDelete(item.id)}>
                    Delete
                  </DeleteButton>
                ) : null}
              </div>
            );
          })}
        </div>
        {!images.isLoading ? (
          <div className="max-w-xlg mt-8 grid grid-cols-2 gap-4">
            {images.data?.resources.map((image) => {
              if (image.resource_type !== "image") {
                return null;
              }

              return (
                <div key={image.asset_id} className="aspect-[16/9]">
                  <Image
                    src={image.url}
                    alt="TODO"
                    height={image.height}
                    width={image.width}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          "loading images..."
        )}
      </main>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};

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
