import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/context/CartContext";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
import merch05 from "@/assets/merch-05.jpg";
import merch06 from "@/assets/merch-06.jpg";
import vinylPlaceholder from "@/assets/vinyl-placeholder.jpg";

interface ProductData {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  type: "apparel" | "vinyl";
  description?: string;
  externalUrl?: string;
}

const products: ProductData[] = [
  { id: "lw-01", name: "LOUNGEWEAR PACK", variant: "01", price: 28, image: merch01, type: "apparel" },
  { id: "lw-02", name: "LOUNGEWEAR PACK", variant: "02", price: 28, image: merch02, type: "apparel" },
  { id: "lw-03", name: "LOUNGEWEAR PACK", variant: "03", price: 28, image: merch03, type: "apparel" },
  { id: "lw-04", name: "LOUNGEWEAR PACK", variant: "04", price: 28, image: merch04, type: "apparel" },
  { id: "lw-05", name: "LOUNGEWEAR PACK", variant: "05", price: 28, image: merch05, type: "apparel" },
  { id: "lw-06", name: "LOUNGEWEAR PACK", variant: "06", price: 28, image: merch06, type: "apparel" },
  { 
    id: "vinyl-01", 
    name: "YIN/YANG VINYL", 
    variant: "LP", 
    price: 30, 
    image: vinylPlaceholder, 
    type: "vinyl",
    description: "Limited edition 12\" vinyl pressing of YIN/YANG. 180g black vinyl with custom sleeve artwork. Includes digital download.",
    externalUrl: "https://example.com/purchase-vinyl",
  },
];

const sizes = ["XS", "S", "M", "L", "XL"];

const digitalAlbum = {
  id: "digital-album",
  name: "YIN/YANG DIGITAL",
  price: 1.99,
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[10px] tracking-widest-custom">PRODUCT NOT FOUND</p>
        </div>
      </PageTransition>
    );
  }

  const isVinyl = product.type === "vinyl";

  // Use all product images as gallery
  const galleryImages = isVinyl 
    ? [product.image] 
    : [product.image, ...products.filter(p => p.id !== product.id && p.type === "apparel").slice(0, 2).map(p => p.image)];

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      variant: `${product.variant} / ${selectedSize}`,
    });

    addItem({
      id: digitalAlbum.id,
      name: digitalAlbum.name,
      price: digitalAlbum.price,
      quantity: 1,
      image: "",
      variant: "Digital",
    });

    setIsOpen(true);
  };

  const handleExternalPurchase = () => {
    if (product.externalUrl) {
      window.open(product.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/merch")}
            className="text-[10px] tracking-widest-custom text-muted-foreground mb-12 editorial-link"
          >
            ← BACK TO SHOP
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Images */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Main image */}
              <div className={isVinyl ? "aspect-square overflow-hidden" : "aspect-[3/4] overflow-hidden"}>
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail strip */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-16 h-20 overflow-hidden transition-opacity ${
                        currentImageIndex === idx ? "opacity-100" : "opacity-40 hover:opacity-70"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Product info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Breadcrumb */}
              <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-4">
                SHOP / {isVinyl ? "VINYL" : product.variant}
              </p>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-display tracking-tighter-custom mb-6">
                {product.name}{!isVinyl && ` '${product.variant}`}
              </h1>

              {/* Price */}
              <p className="text-2xl mb-12">${product.price}.00</p>

              {isVinyl ? (
                <>
                  {/* Purchase button for vinyl - external redirect */}
                  <button
                    onClick={handleExternalPurchase}
                    className="w-full py-4 text-[10px] tracking-widest-custom transition-colors mb-6 bg-foreground text-background hover:bg-foreground/90"
                  >
                    PURCHASE
                  </button>

                  <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-12">
                    REDIRECTS TO EXTERNAL STORE
                  </p>
                </>
              ) : (
                <>
                  {/* Size selector */}
                  <div className="mb-8">
                    <p className="text-[10px] tracking-widest-custom mb-4">
                      SIZE: {selectedSize || "SELECT"}
                    </p>
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 border transition-colors text-sm ${
                            selectedSize === size
                              ? "bg-foreground text-background border-foreground"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`w-full py-4 text-[10px] tracking-widest-custom transition-colors mb-6 ${
                      selectedSize
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {selectedSize ? "ADD TO CART" : "SELECT SIZE"}
                  </button>

                  {/* Bundle notice */}
                  <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-12">
                    INCLUDES DIGITAL ALBUM ($1.99)
                  </p>
                </>
              )}

              {/* Description */}
              <div className="border-t border-border pt-8">
                <p className="text-[10px] tracking-widest-custom mb-4">DESCRIPTION</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isVinyl && product.description
                    ? product.description
                    : "Premium loungewear pack from the Sadder Days collection. Designed for comfort and style, featuring our signature cross embroidery. Made with 100% cotton for everyday wear."}
                </p>
              </div>

              {/* Format details for vinyl */}
              {isVinyl && (
                <div className="border-t border-border pt-8 mt-8">
                  <p className="text-[10px] tracking-widest-custom mb-4">DETAILS</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Format: 12" Vinyl LP</p>
                    <p>Weight: 180g</p>
                    <p>Includes: Digital Download</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Product;
