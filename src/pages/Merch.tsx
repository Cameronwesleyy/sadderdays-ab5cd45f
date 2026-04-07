import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";

const Merch = () => {
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState("");
  const [vinylName, setVinylName] = useState("YIN/YANG VINYL");
  const [vinylPrice, setVinylPrice] = useState("30");
  const [vinylImage, setVinylImage] = useState("");

  useEffect(() => {
    const load = async () => {
      const [contentRes, releaseRes] = await Promise.all([
        supabase.from("site_content").select("*").in("id", ["vinyl_name", "vinyl_price", "vinyl_image"]),
        supabase.from("music_releases").select("cover_url").order("sort_order", { ascending: true }).limit(1).single(),
      ]);
      if (releaseRes.data?.cover_url) setCoverUrl(releaseRes.data.cover_url);
      if (contentRes.data) {
        const map: Record<string, string> = {};
        contentRes.data.forEach((r) => { map[r.id] = r.content; });
        if (map.vinyl_name) setVinylName(map.vinyl_name);
        if (map.vinyl_price) setVinylPrice(map.vinyl_price);
        if (map.vinyl_image) setVinylImage(map.vinyl_image);
      }
    };
    load();
  }, []);

  const displayImage = vinylImage || coverUrl;

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-16 sticky-heading"
          >
            SHOP
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-sm"
          >
            <div
              onClick={() => navigate("/product/vinyl-01")}
              className="cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden">
                {displayImage && (
                  <img
                    src={displayImage}
                    alt={vinylName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="py-2 flex justify-between items-baseline">
                <span className="text-[9px] tracking-widest-custom">{vinylName}</span>
                <span className="text-[9px] tracking-widest-custom text-muted-foreground">${vinylPrice}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Merch;
