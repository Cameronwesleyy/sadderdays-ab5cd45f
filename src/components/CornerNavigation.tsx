import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import crossLogo from "@/assets/cross-logo.png";
import yinyangLogo from "@/assets/yinyang-menu-logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const CornerNavigation = () => {
  const location = useLocation();
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopLive, setShopLive] = useState(false);

  useEffect(() => {
    supabase.from("admin_settings").select("value").eq("id", "shop_live").single().then(({ data }) => {
      if (data?.value === "true") setShopLive(true);
    });
  }, []);

  if (location.pathname === "/" || location.pathname === "/home") {
    return null;
  }

  const navLinks = [
    { name: "MUSIC", path: "/music" },
    { name: "LYRICS", path: "/lyrics" },
    { name: "LIVE SHOWS", path: "/tour" },
    { name: "LAB", path: "/lab" },
    { name: "MEMBERS", path: "/members" },
    { name: "ABOUT", path: "/about" },
    { name: "SHOP", path: "/merch" },
  ];

  return (
    <>
      {/* Menu Button */}
      {!menuOpen && (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none animate-fade-in">
          <button
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto text-[10px] font-semibold tracking-widest-custom text-foreground drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] hover:opacity-70 transition-opacity"
          >
            MENU
          </button>
        </div>
      )}

      {/* Cart/Bag Button and Theme Toggle */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-3 animate-fade-in">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(true)}
          className="relative text-foreground hover:opacity-70 transition-opacity"
        >
          <img src={crossLogo} alt="Cart" className="h-[60px] w-auto invert dark:invert-0" />
          {cartCount > 0 && (
            <span className="absolute -bottom-1 -right-2 text-[8px] font-medium tracking-widest-custom">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[rgba(255,235,245,0.4)] dark:bg-[rgba(30,20,25,0.6)]"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              willChange: "opacity",
            }}
          >
            {/* Close button */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[10px] font-semibold tracking-widest-custom text-foreground hover:opacity-70 transition-opacity"
              >
                CLOSE
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
              {/* Logo - pure opacity fade */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  to="/home"
                  onClick={() => setMenuOpen(false)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <img src={yinyangLogo} alt="Sadder Days" className="h-16 md:h-20 w-auto" />
                </Link>
              </motion.div>

              {/* Navigation Links - flow out from logo */}
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + index * 0.04,
                      duration: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {link.name === "SHOP" && !shopLive ? (
                      <div
                        className="relative text-center group cursor-pointer"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("open-email-signup"));
                          setMenuOpen(false);
                        }}
                      >
                        <span className="text-2xl md:text-4xl font-display tracking-tighter-custom text-foreground/70 line-through decoration-2 group-hover:hidden">
                          SHOP
                        </span>
                        <span className="text-2xl md:text-4xl font-display tracking-tighter-custom text-foreground hidden group-hover:inline-block">
                          NOTIFY ME
                        </span>
                        <span className="block text-[10px] md:text-xs tracking-widest-custom whitespace-nowrap mt-2 text-foreground text-center">
                          COMING SOON
                        </span>
                      </div>
                    ) : link.name === "SHOP" && shopLive ? (
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="text-2xl md:text-4xl font-display tracking-tighter-custom text-foreground/70 hover:text-foreground transition-all duration-200 hover:scale-105"
                      >
                        SHOP
                      </Link>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`text-2xl md:text-4xl font-display tracking-tighter-custom transition-all duration-200 hover:scale-105 ${
                          location.pathname === link.path
                            ? "text-foreground"
                            : "text-foreground/70 hover:text-foreground"
                        }`}
                        style={{
                          textShadow: location.pathname === link.path ? "0 0 20px rgba(255, 235, 245, 0.8)" : "none",
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CornerNavigation;
