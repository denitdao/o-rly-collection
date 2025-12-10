import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import GoogleAdSlot from "~/components/ads/GoogleAdSlot";
import OrlyHead from "~/components/meta/OrlyHead";
import OrlyFooter from "~/components/OrlyFooter";
import SearchPills, { type PillData } from "~/components/SearchPills";
import { Button } from "~/components/ui/button";
import { env } from "~/env.js";
import { createCaller } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { type Book } from "~/server/storage/books";
import { type Story } from "~/server/storage/stories";

export const getStaticProps: GetStaticProps<
  { book: Book; story?: Story },
  { slug: string }
> = async (context) => {
  const bookId = context.params?.slug;

  if (!bookId) {
    return { notFound: true };
  }

  const trpc = createCaller(createInnerTRPCContext({}));
  const book: Book | undefined = await trpc.datasource.getBookById(bookId);
  const story: Story | undefined = await trpc.datasource.getStoryById(bookId);

  if (!book) {
    console.log(`Page ${bookId} was not found`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
      story,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const trpc = createCaller(createInnerTRPCContext({}));
  const bookIds = await trpc.datasource.getBookIds();

  const paths = bookIds.map((id) => ({
    params: { slug: id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default function BookPage({
  book,
  story,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <OrlyHead title={`${book.title} | O'RLY Covers`} imageName={book.image} />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header title={book.title} />
        <BookContent book={book} story={story} />
        <OrlyFooter />
      </div>
      <div style={{ height: 0.5 }}></div>
    </>
  );
}

const BookContent = ({ book, story }: { book: Book; story?: Story }) => {
  const router = useRouter();

  const keywords: PillData[] = book.tags.split(",").map((tag) => ({
    keyword: tag.trim().toLowerCase(),
    colors: [book.color],
  }));

  const imageUrl = `${env.NEXT_PUBLIC_IMAGE_SOURCE}/${book.image}`;

  return (
    <main className="px-4 pb-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex w-full flex-col items-center">
          <Image
            alt={book.id}
            src={imageUrl}
            unoptimized={true}
            height={600}
            width={600}
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="mb-4 h-auto w-auto max-w-full"
          />
          <div className="mb-12 flex flex-wrap items-center gap-2">
            <SearchPills
              activeKeyword=""
              pillDataArray={keywords}
              onKeywordClick={(keyword) => {
                router
                  .push({
                    pathname: "/",
                    query: { search: keyword },
                  })
                  .catch((_) => {
                    toast.info("Will be implemented soon", {
                      duration: 2000,
                    });
                  });
              }}
            />
          </div>
          <div className="max-w-3xl h-44">
            <GoogleAdSlot
              slot="9732174880"
              data-ad-layout="in-article"
              data-ad-format="fluid"
              style={{ textAlign: "center" }}
            />
          </div>
          {story && (
            <div className="max-w-3xl">
              <ReactMarkdown
                components={{
                  a: ({ ...props }) => (
                    <a
                      className="underline decoration-blue-400 decoration-2 underline-offset-2"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p
                      className="leading-7 [&:not(:first-child)]:mt-6"
                      {...props}
                    />
                  ),
                }}
              >
                {story.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <header className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-4 pb-7 pt-4 text-center">
      <nav className="mx-auto mb-8 flex w-full max-w-screen-2xl justify-end">
        <Link href="https://make.orlybooks.com/" className="flex">
          <Button
            variant="rainbow"
            className="relative font-mono text-sm font-normal"
          >
            Make Your Cover -&gt;
          </Button>
        </Link>
      </nav>
      <Link
        href="/"
        className="flex min-w-[min(100%,800px)] gap-4 pb-3 font-mono text-base font-normal text-gray-600 underline decoration-blue-400 decoration-2 underline-offset-2"
      >
        &lt;- View All Books
      </Link>
      <h1 className="max-w-[800px] text-4xl font-extrabold text-black">
        {title}
      </h1>
    </header>
  );
};
