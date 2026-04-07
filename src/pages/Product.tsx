import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState("");
  const [vinyl, setVinyl] = useState({
    name: "YIN/YANG VINYL",
    price: "30",
    description: 'Limited edition 12" vinyl pressing of YIN/YANG. 180g black vinyl with custom sleeve artwork. Includes digital download.',
    purchaseUrl: "https://vertigovinyl.com/vve/p/sadder-days",
    image: "",
    format: '12" Vinyl LP',
    weight: "180g",
    includes: "Digital Download",
  });

  useEffect(() => {
    const load = async () => {
      const [contentRes, releaseRes] = await Promise.all([
        supabase.from("site_content").select("*").in("id", [
          "vinyl_name", "vinyl_price", "vinyl_description", "vinyl_purchase_url",
          "vinyl_image", "vinyl_format", "vinyl_weight", "vinyl_includes",
        ]),
        supabase.from("music_releases").select("cover_url").order("sort_order", { ascending: true }).limit(1).single(),
      ]);
      if (releaseRes.data?.cover_url) setCoverUrl(releaseRes.data.cover_url);
      if (contentRes.data) {
        const map: Record<string, string> = {};
        contentRes.data.forEach((r) => { map[r.id] = r.content; });
        setVinyl((prev) => ({
          name: map.vinyl_name || prev.name,
          price: map.vinyl_price || prev.price,
          description: map.vinyl_description || prev.description,
          purchaseUrl: map.vinyl_purchase_url || prev.purchaseUrl,
          image: map.vinyl_image || prev.image,
          format: map.vinyl_format || prev.format,
          weight: map.vinyl_weight || prev.weight,
          includes: map.vinyl_includes || prev.includes,
        }));
      }
    };
    load();
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

  const displayImage = vinyl.image || coverUrl;

  const handleExternalPurchase = () => {
    if (vinyl.purchaseUrl) {
      window.open(vinyl.purchaseUrl, "_blank", "noopener,noreferrer");
    }
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
                {displayImage && (
                  <img
                    src={displayImage}
                    alt={vinyl.name}
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
                {vinyl.name}
              </h1>

              <p className="text-2xl mb-12">${vinyl.price}.00</p>

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
                  {vinyl.description}
                </p>
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <p className="text-[10px] tracking-widest-custom mb-4">DETAILS</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Format: {vinyl.format}</p>
                  <p>Weight: {vinyl.weight}</p>
                  <p>Includes: {vinyl.includes}</p>
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
