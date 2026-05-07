import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import EmailSignupPopup from "@/components/EmailSignupPopup";
import ScrollRevealHero from "@/components/ScrollRevealHero";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import crossLogo from "@/assets/cross-logo.png";
import heroDuo from "@/assets/hero-duo.jpg";
import duoPortrait from "@/assets/duo-portrait.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import handsCover from "@/assets/hands-cover.jpg";
import napkin from "@/assets/napkin.png";
import shopFront from "@/assets/shop-front.jpg";
import shopBack from "@/assets/shop-back.jpg";
import shopDetail from "@/assets/shop-detail.jpg";
import albumHaze from "@/assets/album-haze.jpg";
import yinYangCover from "@/assets/yin-yang-cover.jpg";
import galleryGrant1 from "@/assets/gallery-grant-1.jpg";
import galleryGrant2 from "@/assets/gallery-grant-2.jpg";
import galleryCar1 from "@/assets/gallery-car-1.jpg";
import galleryCar2 from "@/assets/gallery-car-2.jpg";
import galleryCar3 from "@/assets/gallery-car-3.jpg";
import galleryCameron1 from "@/assets/gallery-cameron-1.jpg";
import tourDuo from "@/assets/tour-duo.jpg";

const defaultGalleryImages = [{
  src: galleryGrant1, alt: "Grant", height: "h-64"
}, {
  src: yinYangCover, alt: "Yin Yang", height: "h-40"
}, {
  src: galleryCar1, alt: "Car shoot", height: "h-56"
}, {
  src: galleryCameron1, alt: "Cameron", height: "h-52"
}, {
  src: handsCover, alt: "Hands", height: "h-44"
}, {
  src: galleryGrant2, alt: "Grant", height: "h-60"
}, {
  src: galleryCar2, alt: "Car shoot", height: "h-48"
}, {
  src: grantPortrait, alt: "Grant Portrait", height: "h-56"
}, {
  src: galleryCar3, alt: "Car shoot", height: "h-52"
}, {
  src: cameronPortrait, alt: "Cameron Portrait", height: "h-64"
}];

const navLinks = [
  { name: "ABOUT", path: "/about" },
  { name: "MUSIC", path: "/music" },
  { name: "LYRICS", path: "/lyrics" },
  { name: "LIVE SHOWS", path: "/tour" },
  { name: "LAB", path: "/lab" },
  { name: "MEMBERS", path: "/members" },
];

const lightenHex = (hex: string, amount: number): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const nl = Math.min((l * 100 + amount) / 100, 0.95);
  const sn = s, ln = nl;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const Home = () => {
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const { items, setIsOpen } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [cms, setCms] = useState<Record<string, string>>({});
  const [shopLive, setShopLive] = useState(false);
  const [tourLive, setTourLive] = useState(false);
  const [nextShow, setNextShow] = useState<{ date: string; city: string; venue: string; ticket_link: string | null } | null>(null);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenEmailPopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowEmailPopup(true);
        sessionStorage.setItem("hasSeenEmailPopup", "true");
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowEmailPopup(true);
    window.addEventListener("open-email-signup", handler);
    return () => window.removeEventListener("open-email-signup", handler);
  }, []);

  useEffect(() => {
    Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("admin_settings").select("*").in("id", ["shop_live", "tour_live"]),
      supabase.from("tour_dates").select("date,city,venue,ticket_link,sort_order").order("sort_order", { ascending: true }),
    ]).then(([contentRes, settingsRes, tourRes]) => {
      if (contentRes.data) {
        const map: Record<string, string> = {};
        contentRes.data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
        setCms(map);
      }
      if (settingsRes.data) {
        settingsRes.data.forEach((s: { id: string; value: string }) => {
          if (s.id === "shop_live") setShopLive(s.value === "true");
          if (s.id === "tour_live") setTourLive(s.value === "true");
        });
      }
      if (tourRes.data && tourRes.data.length > 0) {
        setNextShow(tourRes.data[0]);
      }
    });
  }, []);

  // Use CMS values with fallbacks to defaults (ignore "__removed__" sentinel)
  const cmsImg = (key: string, fallback: string) => {
    const v = cms[key];
    return v && v !== "__removed__" ? v : fallback;
  };
  const pinkColor = cms.home_pink_color || "#e8a0cc";
  const heroPink = cms.home_hero_pink || "#FFEBF5";
  const heroHoverPink = cms.home_hero_hover_pink || "#e8a0cc";
  const sectionPink = cms.home_section_pink || "#e8a0cc";
  const aboutPink = cms.home_about_pink || "#e8a0cc";
  const galleryPink = cms.home_gallery_pink || "#e8a0cc";
  const heroText = cms.home_hero_text || "SADDER DAYS";
  const heroImage = cmsImg("home_hero_image", heroDuo);
  const portraitLeft = cmsImg("home_portrait_left", "/lovable-uploads/c25da56a-07ab-49f8-9230-c3b55215f540.jpg");
  const portraitRight = cmsImg("home_portrait_right", "/lovable-uploads/99f341b0-eb45-48be-b65f-2e29de6768d3.jpg");
  const shopImg1 = cmsImg("home_shop_image_1", shopFront);
  const shopImg2 = cmsImg("home_shop_image_2", shopBack);
  const shopImg3 = cmsImg("home_shop_image_3", shopDetail);
  const napkinImg = cmsImg("home_napkin_image", napkin);
  const tourImg = cmsImg("home_tour_image", tourDuo);
  const heroCaption = cms.home_hero_caption || "CAMERON AND GRANT, NYC 2026";
  const sectionTitle = cms.home_section_title || "I'VE HAD SADDER DAYS";
  const sectionCopy = cms.home_section_copy || "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT.";
  const shopDate = cms.home_shop_date || "COMING SOON";
  const shopCopy = cms.home_shop_copy || "LOREM IPSUM DOLOR SIT AMET CONSECTETUR. ADIPISCING ELIT SED DO EIUSMOD TEMPOR.";
  const gallerySubtitle = cms.home_gallery_subtitle || "NYC, 2024-2025";
  const shopTitle = cms.home_shop_title || "SHOP SADDER DAYS";
  const aboutTitle = cms.home_about_title || "ABOUT SADDER DAYS";
  const galleryTitle = cms.home_gallery_title || "VISUAL\nGALLERY";
  const tourTitle = cms.home_tour_title || "live\nshows";
  const listenLink = cms.home_listen_link || "LISTEN HERE";
  const tourLink = cms.home_tour_link || "VIEW TOUR DATES";
  const comingSoonText = cms.home_coming_soon || "COMING SOON";
  const notifyText = cms.home_notify_text || "NOTIFY ME →";
  const cmsGalleryImages: { src: string; alt: string }[] = (() => {
    try {
      const parsed = JSON.parse(cms.home_gallery_images || "[]");
      if (parsed.length > 0) return parsed.map((url: string, i: number) => ({ src: url, alt: `Gallery ${i + 1}` }));
    } catch { /* ignore */ }
    return [];
  })();
  const galleryImages = cmsGalleryImages.length > 0 ? cmsGalleryImages : defaultGalleryImages;

  return <PageTransition>
      <div className="min-h-screen">
        {/* Inline Top Navigation - Editorial Style */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        >
          <div className="flex items-center gap-4 md:gap-6">
            {shopLive ? (
              <Link to="/product/vinyl-01" className="text-[9px] md:text-[10px] tracking-widest-custom text-white/80 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                SHOP
              </Link>
            ) : (
              <div className="relative group">
                <span className="text-[9px] md:text-[10px] tracking-widest-custom text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-through decoration-1">
                  SHOP
                </span>
                <motion.span 
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="absolute left-0 top-full text-[7px] md:text-[8px] tracking-widest-custom whitespace-nowrap"
                  style={{ color: "#FFEBF5" }}
                >
                  {shopDate}
                </motion.span>
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[9px] md:text-[10px] tracking-widest-custom text-white/80 hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-white hover:opacity-70 transition-opacity"
            >
              <img src={crossLogo} alt="Cart" className="h-10 md:h-[50px] w-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
              {cartCount > 0 && (
                <span className="absolute -bottom-1 -right-2 text-[8px] font-medium tracking-widest-custom text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <ScrollRevealHero 
          imageSrc={heroImage} 
          imageAlt="Sadder Days"
          onHoverChange={setIsHeroHovered}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-6 right-6 z-10 text-[10px] md:text-xs tracking-widest-custom text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            {heroCaption}
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute bottom-8 left-6 md:left-12">
            <h1 
              className="font-display text-massive transition-colors duration-300"
              style={{ color: isHeroHovered ? heroHoverPink : heroPink }}
            >
              {heroText.includes(" ") ? (
                <>
                  {heroText.split(" ").slice(0, -1).join(" ")}
                  <br />
                  {heroText.split(" ").slice(-1)[0]}
                </>
              ) : heroText}
            </h1>
          </motion.div>
        </ScrollRevealHero>

        {/* Asymmetric section */}
        <section className="grid md:grid-cols-12 gap-6 pl-4 pr-6 md:pl-6 md:pr-12 py-6 md:py-12 min-h-[80vh] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="md:col-span-4 flex flex-col justify-between h-full py-4 relative z-10"
          >
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom hover:text-foreground transition-colors duration-300 cursor-default" style={{ color: sectionPink }}>
              {sectionTitle.split(" ").slice(0, 2).join(" ")}
              <br />
              {sectionTitle.split(" ").slice(2).join(" ")}
            </h2>
            <div className="mt-auto">
              <p className="text-xs font-medium tracking-widest-custom text-foreground uppercase leading-relaxed max-w-[180px] mb-6">
                {sectionCopy}
              </p>
              <div className="flex items-center gap-4">
                <Link to="/music" className="text-[10px] tracking-widest-custom editorial-link">
                   {listenLink}
                </Link>
                <div className="flex items-center gap-3">
                  <a href="https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </a>
                  <a href="https://music.apple.com/us/artist/sadder-days/1563767142" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.455-2.105-1.334a1.867 1.867 0 01.808-2.217c.258-.157.544-.261.837-.343.36-.1.724-.18 1.084-.273.27-.07.514-.18.678-.428.06-.09.095-.195.117-.302.023-.12.023-.245.023-.37V8.162a.673.673 0 00-.06-.297c-.067-.15-.208-.24-.383-.22-.243.027-.484.074-.724.124-1.36.283-2.718.57-4.078.853-.16.034-.313.083-.436.2-.09.087-.145.2-.163.324-.012.094-.02.188-.02.283v8.022c0 .453-.05.898-.243 1.313-.3.647-.81 1.053-1.51 1.235-.345.09-.697.13-1.054.13-.86-.006-1.644-.524-1.96-1.368a1.878 1.878 0 01.678-2.167c.263-.175.56-.287.865-.38.358-.11.72-.206 1.078-.315.235-.07.456-.17.617-.382.107-.14.166-.296.18-.47.016-.2.01-.4.01-.6V6.534c0-.243.03-.483.116-.71a1.12 1.12 0 01.644-.658c.25-.107.513-.17.78-.22 1.478-.296 2.955-.593 4.433-.888.61-.122 1.22-.244 1.83-.364.263-.052.526-.09.797-.077.424.02.794.193 1.037.552.143.21.22.453.25.71.015.128.02.258.02.387v6.098l-.003-.003z" />
                    </svg>
                  </a>
                  <a href="https://youtube.com/@YOUR_YOUTUBE_CHANNEL" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-7 md:col-start-5 flex gap-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="flex-1 overflow-hidden"
            >
              <img 
                alt="Cameron" 
                className="w-full aspect-[3/4] object-cover scale-[1.2]"
                src={portraitLeft} 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <img 
                alt="Grant" 
                className="w-full aspect-[3/4] object-cover" 
                src={portraitRight} 
              />
            </motion.div>
          </div>
        </section>

        {/* Apparel Section */}
        <section className="p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="flex gap-2 mb-8"
          >
            <img src={shopImg1} alt="Apparel front" className="w-48 md:w-56 aspect-square object-cover" />
            <img src={shopImg2} alt="Apparel back" className="w-48 md:w-56 aspect-square object-cover" />
            <img src={shopImg3} alt="Apparel detail" className="w-48 md:w-56 aspect-square object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-6"
          >
            <div className="text-left">
              <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-4">{shopTitle}</h2>
              {shopLive ? (
                <Link to="/product/vinyl-01" className="text-xs font-medium tracking-widest-custom text-sd-pink hover:text-foreground transition-colors">
                  SHOP NOW →
                </Link>
              ) : (
                <div className="flex items-center gap-6">
                  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest-custom text-foreground">
                    {comingSoonText}
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-sd-pink animate-pulse" />
                  </span>
                  <button 
                    onClick={() => setShowEmailPopup(true)}
                    className="text-xs font-medium tracking-widest-custom text-sd-pink hover:text-foreground transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                  >
                    {notifyText}
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs tracking-widest-custom text-foreground uppercase leading-relaxed max-w-xs md:text-right">
              {shopCopy}
            </p>
          </motion.div>
        </section>

        {/* Mood Section - About */}
        <section className="grid md:grid-cols-12 gap-4 p-6 md:p-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:col-span-5">
            <img src={napkinImg} alt="I've Had Sadder Days" className="w-full max-w-4xl object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)] rotate-3" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:col-span-4 md:col-start-8 md:self-end">
            <Link to="/about" className="block">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter-custom mb-4 hover:text-foreground transition-colors duration-300 text-left" style={{ color: aboutPink }}>{aboutTitle}</h2>
            </Link>
          </motion.div>
        </section>

        {/* Film Strip Gallery */}
        <section className="py-16">
          <div className="px-6 md:px-12 mb-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="font-display text-4xl md:text-6xl tracking-tighter-custom" style={{ color: galleryPink }}>
                {galleryTitle.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-xs tracking-widest-custom text-foreground mt-2">
                {gallerySubtitle}
              </p>
            </motion.div>
          </div>

          <div className="relative bg-black py-3">
            <div className="absolute top-0 left-0 right-0 h-3 flex justify-between px-2">
              {Array.from({ length: 40 }).map((_, i) => <div key={`top-${i}`} className="w-2 h-2 bg-background/20 rounded-sm" />)}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-3 flex justify-between px-2">
              {Array.from({ length: 40 }).map((_, i) => <div key={`bottom-${i}`} className="w-2 h-2 bg-background/20 rounded-sm" />)}
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center px-4 py-2" style={{ width: "max-content" }}>
                {galleryImages.map((img, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex-shrink-0">
                    <motion.img whileHover={{ scale: 1.05 }} src={img.src} alt={img.alt} className="h-32 md:h-44 w-auto object-cover cursor-pointer transition-transform duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Shows Section */}
        <section className="p-6 md:p-12">
          <div className="grid md:grid-cols-12 gap-4 mb-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:col-span-4">
              <h2 className="font-display text-5xl md:text-7xl tracking-tighter-custom mb-6">
                {tourTitle.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              {tourLive ? (
                <Link to="/tour" className="text-[10px] tracking-widest-custom editorial-link">
                  VIEW LIVE SHOWS
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-sd-pink animate-pulse" />
                  <span className="text-[10px] tracking-widest-custom text-muted-foreground">{comingSoonText}</span>
                </div>
              )}
            </motion.div>
          </div>

          <div className="flex justify-between items-start gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <img src={tourImg} alt="Live Shows" className="max-w-2xl w-full aspect-[16/9] object-cover object-center" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`space-y-3 flex-shrink-0 text-right ${!tourLive ? "blur-sm select-none" : ""}`}>
              {nextShow ? (
                <>
                  <div>
                    <p className="text-[10px] tracking-widest-custom text-foreground font-medium">{nextShow.date}</p>
                    <p className="text-[10px] tracking-widest-custom text-muted-foreground">{nextShow.city}</p>
                    <p className="text-[9px] tracking-widest-custom text-muted-foreground/60">{nextShow.venue}</p>
                  </div>
                  {nextShow.ticket_link && (
                    <a
                      href={nextShow.ticket_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[9px] tracking-widest-custom text-sd-pink hover:text-foreground transition-colors"
                    >
                      GET TICKETS →
                    </a>
                  )}
                </>
              ) : (
                <p className="text-[10px] tracking-widest-custom text-muted-foreground">TBA</p>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <EmailSignupPopup 
        isOpen={showEmailPopup} 
        onClose={() => setShowEmailPopup(false)} 
      />
    </PageTransition>;
};
export default Home;
