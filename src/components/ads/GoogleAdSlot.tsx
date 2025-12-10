import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

type GoogleAdSlotProps = {
  slot: string;
  style?: React.CSSProperties;
} & Record<string, unknown>;

const GoogleAdSlot = ({ slot, style, ...rest }: GoogleAdSlotProps) => {
  const clientId = "ca-pub-8006338319712331";
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Check if ad is already loaded
    if (adRef.current.getAttribute("data-adsbygoogle-status")) {
      return;
    }

    // Wait for element to have dimensions
    const checkAndPush = () => {
      if (!adRef.current) return;

      const width = adRef.current.offsetWidth;
      if (width === 0) {
        // Element not yet sized, wait a bit
        setTimeout(checkAndPush, 100);
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle ?? [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsense error", e);
      }
    };

    checkAndPush();
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", ...style }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      {...rest}
    ></ins>
  );
};

export default GoogleAdSlot;
