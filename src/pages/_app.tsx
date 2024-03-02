import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "~/components/meta/GoogleAnalytics";
import { Toaster } from "~/components/ui/sonner";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId="G-VB63CNRL7H" />
      <Toaster richColors closeButton theme="light" />
    </>
  );
};

export default api.withTRPC(MyApp);
