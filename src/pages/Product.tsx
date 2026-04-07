import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    supabase.from("music_releases").select("cover_url").order("sort_order", { ascending: true }).limit(1).single().then(({ data }) => {
      if (data?.cover_url) setCoverUrl(data.cover_url);
    });
  }, []);

  if (id !== "vinyl-01") {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[10px] tracking-widest-custom">PRODUCT NOT FOUND</p>
        </div>
      </PageTransition>
    );
  }

  const handleExternalPurchase = () => {
    window.open("https://example.com/purchase-vinyl", "_blank", "noopener,noreferrer");
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/merch")}
            className="text-[10px] tracking-widest-custom text-muted-foreground mb-12 editorial-link"
          >
            ← BACK TO SHOP
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="aspect-square overflow-hidden">
                {coverUrl && (
                  <img
                    src={coverUrl}
                    alt="YIN/YANG VINYL"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-4">
                SHOP / VINYL
              </p>

              <h1 className="text-4xl md:text-5xl font-display tracking-tighter-custom mb-6">
                YIN/YANG VINYL
              </h1>

              <p className="text-2xl mb-12">$30.00</p>

              <button
                onClick={handleExternalPurchase}
                className="w-full py-4 text-[10px] tracking-widest-custom transition-colors mb-6 bg-foreground text-background hover:bg-foreground/90"
              >
                PURCHASE
              </button>

              <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-12">
                REDIRECTS TO EXTERNAL STORE
              </p>

              <div className="border-t border-border pt-8">
                <p className="text-[10px] tracking-widest-custom mb-4">DESCRIPTION</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Limited edition 12" vinyl pressing of YIN/YANG. 180g black vinyl with custom sleeve artwork. Includes digital download.
                </p>
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <p className="text-[10px] tracking-widest-custom mb-4">DETAILS</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Format: 12" Vinyl LP</p>
                  <p>Weight: 180g</p>
                  <p>Includes: Digital Download</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Product;
