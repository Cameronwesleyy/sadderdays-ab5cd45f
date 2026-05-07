import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";
import yinyangLogo from "@/assets/yinyang-menu-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer>
      {/* Booking Section - Black */}
      <section className="text-background p-6 md:p-12 pt-24 md:pt-32" style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--foreground) / 0.05) 15%, hsl(var(--foreground) / 0.3) 35%, hsl(var(--foreground) / 0.7) 55%, hsl(var(--foreground)) 75%)" }}>
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter-custom mb-8">
              BOOKING
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] tracking-widest-custom text-background/50 mb-2">
              REPRESENTATION
            </p>
            <p className="text-sm mb-4">Hallwood</p>
            <a 
              href="mailto:sadderdaysband@gmail.com"
              className="text-sm text-background/70 hover:text-background transition-colors hover:underline underline-offset-4"
            >
              sadderdaysband@gmail.com
            </a>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] tracking-widest-custom text-background/50 mb-2">
              PROJECT & DIRECT INQUIRIES
            </p>
            <a 
              href="mailto:sadderdaysband@gmail.com"
              className="text-sm text-background hover:text-background/80 transition-colors hover:underline underline-offset-4"
            >
              sadderdaysband@gmail.com
              className="text-sm text-background hover:text-background/80 transition-colors hover:underline underline-offset-4"
            >
              booking@sadderdays.world
            </a>
          </div>
        </div>
        
        {/* Sadderdays.world + Yin Yang in dark section */}
        <div className="flex flex-col items-center pt-8 border-t-2" style={{ borderColor: "#FFEBF5" }}>
          <p className="text-xs text-background tracking-widest-custom mb-4">
            SADDERDAYS.WORLD
          </p>
          <Link 
            to="/home"
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src={yinyangLogo} 
              alt="Sadder Days" 
              className="h-16 md:h-20 w-auto invert"
            />
          </Link>
        </div>
      </section>

      {/* Newsletter & Social Section - White background */}
      <div className="border-t border-border/30 bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Newsletter */}
            <div>
              <h3 className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                PRE-SAVE & UPDATES
              </h3>
              {isSubmitted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-foreground"
                >
                  Welcome to the haze.
                </motion.p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border-b border-border/50 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="text-xs tracking-widest-custom px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors"
                  >
                    SUBSCRIBE
                  </motion.button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ y: -2 }}
                    className="p-2 border border-border/30 hover:border-foreground/50 transition-colors"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/20 flex flex-col items-center gap-1">
            <p className="text-xs text-muted-foreground">
              © 2025 SADDER DAYS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-muted-foreground/70">
              WEBSITE DESIGN BY{" "}
              <a 
                href="https://rainabhatia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                @RAINABHATIA
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
