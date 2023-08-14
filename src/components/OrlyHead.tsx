import Head from "next/head";
import { env } from "~/env.mjs";

type HeadProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

/**
 * Smart head component for the page to update meta tags.
 * @param title title of the page
 * @param description description of the page
 * @param imageUrl page cover image
 */
const OrlyHead = ({
  title = "O'RLY Covers",
  description = "Find O'RLY meme book cover. Use for your programming arguments.",
  imageUrl = `${env.NEXT_PUBLIC_OG_SOURCE}/og.jpeg`,
}: HeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="O'RLY Covers" />
      <meta property="og:determiner" content="the" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <meta name="google-site-verification" content="Mt9L1WzY67zBWzNiNw2jHQSoYBXYXp4VkNYbDWUYk5Q" />
    </Head>
  );
};

export default OrlyHead;
