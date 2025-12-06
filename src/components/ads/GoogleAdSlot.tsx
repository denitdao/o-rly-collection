import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

type GoogleAdSlotProps = {
  slot: string;
};

const GoogleAdSlot = ({ slot }: GoogleAdSlotProps) => {
  const clientId = "ca-pub-8006338319712331";

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default GoogleAdSlot;
