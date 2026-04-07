import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
import merch05 from "@/assets/merch-05.jpg";
import merch06 from "@/assets/merch-06.jpg";
import vinylPlaceholder from "@/assets/vinyl-placeholder.jpg";

const products = [
  { id: "lw-01", name: "LOUNGEWEAR PACK", variant: "01", price: 28, image: merch01, type: "apparel" as const },
  { id: "lw-02", name: "LOUNGEWEAR PACK", variant: "02", price: 28, image: merch02, type: "apparel" as const },
  { id: "lw-03", name: "LOUNGEWEAR PACK", variant: "03", price: 28, image: merch03, type: "apparel" as const },
  { id: "lw-04", name: "LOUNGEWEAR PACK", variant: "04", price: 28, image: merch04, type: "apparel" as const },
  { id: "lw-05", name: "LOUNGEWEAR PACK", variant: "05", price: 28, image: merch05, type: "apparel" as const },
  { id: "lw-06", name: "LOUNGEWEAR PACK", variant: "06", price: 28, image: merch06, type: "apparel" as const },
  { 
    id: "vinyl-01", 
    name: "YIN/YANG VINYL", 
    variant: "LP", 
    price: 30, 
    image: vinylPlaceholder, 
    type: "vinyl" as const,
  },
];

const Merch = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Massive heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-4 sticky-heading"
          >
            SHOP
          </motion.h1>

          {/* Bundle notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] tracking-widest-custom text-muted-foreground mb-16"
          >
            DIGITAL ALBUM ($1.99) INCLUDED WITH EVERY ORDER
          </motion.p>

          {/* Dense grid - Cargo style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer group"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Info - minimal */}
                <div className="py-2 flex justify-between items-baseline">
                  <span className="text-[9px] tracking-widest-custom">
                    {product.type === "vinyl" ? product.name : product.variant}
                  </span>
                  <span className="text-[9px] tracking-widest-custom text-muted-foreground">
                    ${product.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Merch;
