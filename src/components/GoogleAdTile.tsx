import { motion } from "framer-motion";
import GoogleAdSlot from "~/components/ads/GoogleAdSlot";

const GoogleAdTile = () => {
  return (
    <motion.div
      layout
      className="group relative flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50"
      style={{ minHeight: "300px" }}
    >
      <div className="flex h-full w-full items-center justify-center p-4">
        <GoogleAdSlot
          slot="6802148771"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </motion.div>
  );
};

export default GoogleAdTile;
