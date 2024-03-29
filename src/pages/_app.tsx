import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "~/components/meta/GoogleAnalytics";
import { Toaster } from "~/components/ui/sonner";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={cn("font-sans antialiased", fontSans.variable)}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId="G-VB63CNRL7H" />
      <Toaster richColors closeButton theme="light" />
    </div>
  );
};

export default api.withTRPC(MyApp);
