import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";

const Merch = () => {
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    supabase.from("music_releases").select("cover_url").order("sort_order", { ascending: true }).limit(1).single().then(({ data }) => {
      if (data?.cover_url) setCoverUrl(data.cover_url);
    });
  }, []);

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
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt="YIN/YANG VINYL"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="py-2 flex justify-between items-baseline">
                <span className="text-[9px] tracking-widest-custom">YIN/YANG VINYL</span>
                <span className="text-[9px] tracking-widest-custom text-muted-foreground">$30</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Merch;
