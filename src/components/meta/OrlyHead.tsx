import Head from "next/head";
import { env } from "~/env.js";

type HeadProps = {
  title?: string;
  description?: string;
  imageName?: string;
};

/**
 * Smart head component for the page to update meta tags.
 * @param title title of the page
 * @param description description of the page
 * @param imageUrl page cover image
 */
const OrlyHead = ({
  title = "O'RLY Covers",
  description = "Find O'RLY meme book cover. Use for your programming arguments. ORLY book parodies. Funny programming book covers. O RLY?",
  imageName = ``,
}: HeadProps) => {
  const imageUrl = `${env.NEXT_PUBLIC_SITE_URL}/api/og?image_file=${imageName}`;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Find O'RLY meme book cover. Use for your programming arguments. ORLY book parodies. Funny programming book covers. O'Reilly books meme. Parody covers. O RLY books."
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={env.NEXT_PUBLIC_SITE_URL} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="O'RLY Covers" />
      <meta property="og:determiner" content="the" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default OrlyHead;
