import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { GoogleAnalytics } from "~/components/meta/GoogleAnalytics";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        "font-sans antialiased",
      )}
    >
      <NuqsAdapter>
        <Component {...pageProps} />
      </NuqsAdapter>
      <GoogleAnalytics gaId="G-VB63CNRL7H" />
      <Toaster richColors closeButton theme="light" />
    </div>
  );
};

export default api.withTRPC(MyApp);
