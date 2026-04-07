import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, ExternalLink, Lock, Music, Users, MapPin, FileText, ShoppingBag, Link2, Home, FlaskConical, Power, GripVertical, Instagram, Youtube, Twitter, Globe, ChevronDown, BookOpen, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ImageDropZone from "@/components/admin/ImageDropZone";
import GalleryEditor from "@/components/admin/GalleryEditor";

// Default assets for pre-populating galleries
import cameronCycle1 from "@/assets/cameron-cycle-1.jpg";
import cameronCycle2 from "@/assets/cameron-cycle-2.jpg";
import cameronCycle3 from "@/assets/cameron-cycle-3.jpg";
import cameronCycle4 from "@/assets/cameron-cycle-4.jpg";
import cameronCycle5 from "@/assets/cameron-cycle-5.jpg";
import cameronCycle6 from "@/assets/cameron-cycle-6.jpg";
import cameronCycle7 from "@/assets/cameron-cycle-7.jpg";
import cameronCycle8 from "@/assets/cameron-cycle-8.jpg";
import cameronCycle9 from "@/assets/cameron-cycle-9.jpg";
import cameronCycle10 from "@/assets/cameron-cycle-10.jpg";
import grantCycle1 from "@/assets/grant-cycle-1.jpg";
import grantCycle2 from "@/assets/grant-cycle-2.jpg";
import grantCycle3 from "@/assets/grant-cycle-3.jpg";
import grantCycle4 from "@/assets/grant-cycle-4.jpg";
import grantCycle5 from "@/assets/grant-cycle-5.jpg";
import grantCycle6 from "@/assets/grant-cycle-6.jpg";
import grantCycle7 from "@/assets/grant-cycle-7.jpg";
import grantCycle8 from "@/assets/grant-cycle-8.jpg";
import grantCycle9 from "@/assets/grant-cycle-9.jpg";
import grantCycle10 from "@/assets/grant-cycle-10.jpg";
import aboutRotate1 from "@/assets/about-rotate-1.jpg";
import aboutRotate2 from "@/assets/about-rotate-2.jpg";
import aboutRotate3 from "@/assets/about-rotate-3.jpg";
import aboutRotate4 from "@/assets/about-rotate-4.jpg";
import galleryGrant1 from "@/assets/gallery-grant-1.jpg";
import galleryGrant2 from "@/assets/gallery-grant-2.jpg";
import galleryCar1 from "@/assets/gallery-car-1.jpg";
import galleryCar2 from "@/assets/gallery-car-2.jpg";
import galleryCar3 from "@/assets/gallery-car-3.jpg";
import galleryCameron1 from "@/assets/gallery-cameron-1.jpg";
import handsCover from "@/assets/hands-cover.jpg";
import yinYangCover from "@/assets/yin-yang-cover.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import heroDuo from "@/assets/hero-duo.jpg";
import shopFront from "@/assets/shop-front.jpg";
import shopBack from "@/assets/shop-back.jpg";
import shopDetail from "@/assets/shop-detail.jpg";
import napkin from "@/assets/napkin.png";
import tourDuo from "@/assets/tour-duo.jpg";
import aboutHero from "@/assets/about-hero.png";
import cameronEyes from "@/assets/cameron-eyes.jpg";
import grantEyes from "@/assets/grant-eyes.jpg";

const defaultCameronFilmstrip = [cameronCycle1, cameronCycle2, cameronCycle3, cameronCycle4, cameronCycle5, cameronCycle6, cameronCycle7, cameronCycle8, cameronCycle9, cameronCycle10];
const defaultGrantFilmstrip = [grantCycle1, grantCycle2, grantCycle3, grantCycle4, grantCycle5, grantCycle6, grantCycle7, grantCycle8, grantCycle9, grantCycle10];
const defaultAboutRotate = [aboutRotate1, aboutRotate2, aboutRotate3, aboutRotate4];
const defaultHomeGallery = [galleryGrant1, yinYangCover, galleryCar1, galleryCameron1, handsCover, galleryGrant2, galleryCar2, grantPortrait, galleryCar3, cameronPortrait];
const defaultCameronLinks = [{ name: "Get His Tone", href: "#" }, { name: "Equipment", href: "#" }, { name: "Wallpapers", href: "#" }, { name: "Playlist", href: "#" }];
const defaultCameronSocials = [{ name: "Instagram", href: "#" }, { name: "TikTok", href: "#" }, { name: "Patreon", href: "#" }];
const defaultGrantSocials = [{ name: "Instagram", href: "#" }, { name: "TikTok", href: "#" }, { name: "Patreon", href: "#" }];

// ─── Password Gate ───────────────────────────────────────────────
const PasswordGate = ({ onAuth }: { onAuth: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("id", "admin_password")
      .single();
    if (data?.value === password) {
      sessionStorage.setItem("sd_admin", "true");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0B] flex items-center justify-center p-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
      >
        <Lock className="w-6 h-6 text-white/40 mx-auto mb-6" />
        <h1 className="font-display text-2xl text-white text-center mb-8 tracking-tighter-custom">
          SADDER DAYS ADMIN
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/20"} text-white px-4 py-3 text-sm tracking-widest-custom focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/30`}
        />
        <button
          type="submit"
          className="w-full mt-4 py-3 bg-white text-[#0B0C0B] text-xs font-medium tracking-widest-custom hover:bg-white/90 transition-colors"
        >
          ENTER
        </button>
        {error && (
          <p className="text-red-400 text-xs text-center mt-3 tracking-widest-custom">
            WRONG PASSWORD
          </p>
        )}
      </motion.form>
    </div>
  );
};

// ─── Types ────────────────────────────────────────────────────────
interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticket_link: string;
  status: string;
  sort_order: number;
}

interface MusicRelease {
  id: string;
  title: string;
  type: string;
  year: string;
  cover_url: string;
  spotify_url: string;
  apple_url: string;
  sort_order: number;
}

interface SongEntry {
  id: string;
  title: string;
  lyrics: string;
  sort_order: number;
}

type Tab = "home" | "copy" | "members" | "tour" | "music" | "lyrics" | "lab" | "shop" | "shopify" | "meta";

interface QuizQuestion {
  question: string;
  options: { text: string; side: "yin" | "yang" }[];
}

// ─── Main Dashboard ──────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [content, setContent] = useState<Record<string, string>>({});
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [shopifyToken, setShopifyToken] = useState("");
  const [shopLive, setShopLive] = useState(false);
  const [tourLive, setTourLive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [songs, setSongs] = useState<SongEntry[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [contentRes, tourRes, releaseRes, settingsRes, songsRes] = await Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("tour_dates").select("*").order("sort_order"),
      supabase.from("music_releases").select("*").order("sort_order"),
      supabase.from("admin_settings").select("*"),
      supabase.from("songs").select("*").order("sort_order"),
    ]);

    if (contentRes.data) {
      const map: Record<string, string> = {};
      contentRes.data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
      setContent(map);
    }
    if (tourRes.data) setTourDates(tourRes.data as TourDate[]);
    if (releaseRes.data) setReleases(releaseRes.data as MusicRelease[]);
    if (songsRes.data) setSongs(songsRes.data as SongEntry[]);
    if (settingsRes.data) {
      settingsRes.data.forEach((s: { id: string; value: string }) => {
        if (s.id === "shopify_store_url") setShopifyUrl(s.value);
        if (s.id === "shopify_access_token") setShopifyToken(s.value);
        if (s.id === "shop_live") setShopLive(s.value === "true");
        if (s.id === "tour_live") setTourLive(s.value === "true");
      });
    }
    if (contentRes.data) {
      const qEntry = contentRes.data.find((r: { id: string }) => r.id === "lab_quiz_questions");
      if (qEntry) {
        try { setQuizQuestions(JSON.parse(qEntry.content)); } catch { /* ignore */ }
      }
    }
  };

  const updateContent = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const getGallery = (key: string, defaults: string[] = []): string[] => {
    if (!(key in content)) return defaults;
    try { return JSON.parse(content[key] || "[]"); } catch { return defaults; }
  };

  const setGallery = (key: string, images: string[]) => {
    updateContent(key, JSON.stringify(images));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const [id, contentVal] of Object.entries(content)) {
        await supabase.from("site_content").upsert({ id, content: contentVal, updated_at: new Date().toISOString() });
      }
      for (const td of tourDates) {
        if (td.id.startsWith("new-")) {
          const { id: _, ...rest } = td;
          await supabase.from("tour_dates").insert(rest);
        } else {
          await supabase.from("tour_dates").upsert(td);
        }
      }
      for (const r of releases) {
        if (r.id.startsWith("new-")) {
          const { id: _, ...rest } = r;
          await supabase.from("music_releases").insert(rest);
        } else {
          await supabase.from("music_releases").upsert(r);
        }
      }
      // Save songs
      for (const s of songs) {
        if (s.id.startsWith("new-")) {
          const { id: _, ...rest } = s;
          await supabase.from("songs").insert(rest);
        } else {
          await supabase.from("songs").upsert(s);
        }
      }
      await supabase.from("admin_settings").upsert({ id: "shopify_store_url", value: shopifyUrl, updated_at: new Date().toISOString() });
      await supabase.from("admin_settings").upsert({ id: "shopify_access_token", value: shopifyToken, updated_at: new Date().toISOString() });
      await supabase.from("admin_settings").upsert({ id: "shop_live", value: shopLive ? "true" : "false", updated_at: new Date().toISOString() });
      await supabase.from("admin_settings").upsert({ id: "tour_live", value: tourLive ? "true" : "false", updated_at: new Date().toISOString() });
      if (quizQuestions.length > 0) {
        await supabase.from("site_content").upsert({ id: "lab_quiz_questions", content: JSON.stringify(quizQuestions), updated_at: new Date().toISOString() });
      }

      toast({ title: "Changes saved", description: "Your updates are now live on the site." });
      await loadData();
    } catch {
      toast({ title: "Error", description: "Failed to save. Please try again.", variant: "destructive" });
    }
    setSaving(false);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "HOME PAGE", icon: <Home size={14} /> },
    { id: "copy", label: "ABOUT / COPY", icon: <FileText size={14} /> },
    { id: "members", label: "MEMBERS", icon: <Users size={14} /> },
    { id: "tour", label: "TOUR DATES", icon: <MapPin size={14} /> },
    { id: "music", label: "MUSIC", icon: <Music size={14} /> },
    { id: "lyrics", label: "LYRICS", icon: <BookOpen size={14} /> },
    { id: "lab", label: "LAB", icon: <FlaskConical size={14} /> },
    { id: "shop", label: "SHOP / VINYL", icon: <ShoppingBag size={14} /> },
    { id: "shopify", label: "SHOPIFY", icon: <Link2 size={14} /> },
    { id: "meta", label: "META / SEO", icon: <Settings size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C0B] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl tracking-tighter-custom">SADDER DAYS — MANAGE</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B0C0B] text-xs font-medium tracking-widest-custom hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? "SAVING..." : "SAVE CHANGES"}
        </motion.button>
      </div>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <nav className="w-56 border-r border-white/10 p-4 space-y-1 flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-[10px] tracking-widest-custom transition-colors text-left ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 p-8 max-w-4xl overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <TabPanel key="home">
                <SectionTitle>Home Page Copy</SectionTitle>
                <Field label="Hero Caption" value={content.home_hero_caption || ""} onChange={(v) => updateContent("home_hero_caption", v)} placeholder="CAMERON AND GRANT, NYC 2026" />
                <Field label="Section Title" value={content.home_section_title || ""} onChange={(v) => updateContent("home_section_title", v)} placeholder="I'VE HAD SADDER DAYS" />
                <Field label="Section Copy" value={content.home_section_copy || ""} onChange={(v) => updateContent("home_section_copy", v)} placeholder="LOREM IPSUM DOLOR SIT AMET..." />
                <Field label="Listen Link Text" value={content.home_listen_link || ""} onChange={(v) => updateContent("home_listen_link", v)} placeholder="LISTEN HERE" />
                <Field label="Shop Title" value={content.home_shop_title || ""} onChange={(v) => updateContent("home_shop_title", v)} placeholder="SHOP SADDER DAYS" />
                <Field label="Shop Launch Date" value={content.home_shop_date || ""} onChange={(v) => updateContent("home_shop_date", v)} placeholder="MARCH 2026" />
                <Field label="Shop Description" value={content.home_shop_copy || ""} onChange={(v) => updateContent("home_shop_copy", v)} />
                <Field label="Shop Coming Soon Text" value={content.home_coming_soon || ""} onChange={(v) => updateContent("home_coming_soon", v)} placeholder="COMING SOON" />
                <Field label="Notify Button Text" value={content.home_notify_text || ""} onChange={(v) => updateContent("home_notify_text", v)} placeholder="NOTIFY ME →" />
                <Field label="About Section Title" value={content.home_about_title || ""} onChange={(v) => updateContent("home_about_title", v)} placeholder="ABOUT SADDER DAYS" />
                <Field label="Gallery Title" value={content.home_gallery_title || ""} onChange={(v) => updateContent("home_gallery_title", v)} placeholder="VISUAL GALLERY" />
                <Field label="Gallery Subtitle" value={content.home_gallery_subtitle || ""} onChange={(v) => updateContent("home_gallery_subtitle", v)} placeholder="NYC, 2024-2025" />
                <Field label="Tour Section Title" value={content.home_tour_title || ""} onChange={(v) => updateContent("home_tour_title", v)} placeholder="live shows" />
                <Field label="Tour Link Text" value={content.home_tour_link || ""} onChange={(v) => updateContent("home_tour_link", v)} placeholder="VIEW TOUR DATES" />
                <Field label="Enter Page Text" value={content.enter_push_text || ""} onChange={(v) => updateContent("enter_push_text", v)} placeholder="push" />

                <SectionTitle className="mt-12">Pink Colors</SectionTitle>
                <p className="text-white/40 text-xs mb-4">Each text element has its own pink slider.</p>
                <SinglePinkSlider
                  label="HERO — DEFAULT"
                  previewText={content.home_hero_text || "SADDER DAYS"}
                  value={content.home_hero_pink || "#FFEBF5"}
                  onChange={(v) => updateContent("home_hero_pink", v)}
                  editableText
                  onTextChange={(v) => updateContent("home_hero_text", v)}
                />
                <SinglePinkSlider
                  label="HERO — HOVER"
                  previewText={content.home_hero_text || "SADDER DAYS"}
                  value={content.home_hero_hover_pink || "#e8a0cc"}
                  onChange={(v) => updateContent("home_hero_hover_pink", v)}
                  editableText
                  onTextChange={(v) => updateContent("home_hero_text", v)}
                />
                <SinglePinkSlider
                  label="SECTION HEADING"
                  previewText={content.home_section_title || "I'VE HAD SADDER DAYS"}
                  value={content.home_section_pink || "#e8a0cc"}
                  onChange={(v) => updateContent("home_section_pink", v)}
                  editableText
                  onTextChange={(v) => updateContent("home_section_title", v)}
                />
                <SinglePinkSlider
                  label="ABOUT SADDER DAYS"
                  previewText="ABOUT SADDER DAYS"
                  value={content.home_about_pink || "#e8a0cc"}
                  onChange={(v) => updateContent("home_about_pink", v)}
                />
                <SinglePinkSlider
                  label="VISUAL GALLERY"
                  previewText="VISUAL GALLERY"
                  value={content.home_gallery_pink || "#e8a0cc"}
                  onChange={(v) => updateContent("home_gallery_pink", v)}
                />

                <SectionTitle className="mt-12">Home Page Images</SectionTitle>
                <p className="text-white/40 text-xs mb-6">Drag & drop images to replace them. Leave empty to use defaults.</p>

                <ImageDropZone label="Hero Image" currentUrl={content.home_hero_image || ""} defaultUrl={heroDuo} contentKey="home_hero_image" onUpload={updateContent} />

                <div className="grid grid-cols-2 gap-4">
                  <ImageDropZone label="Portrait Left" currentUrl={content.home_portrait_left || ""} defaultUrl="/lovable-uploads/c25da56a-07ab-49f8-9230-c3b55215f540.jpg" contentKey="home_portrait_left" onUpload={updateContent} />
                  <ImageDropZone label="Portrait Right" currentUrl={content.home_portrait_right || ""} defaultUrl="/lovable-uploads/99f341b0-eb45-48be-b65f-2e29de6768d3.jpg" contentKey="home_portrait_right" onUpload={updateContent} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <ImageDropZone label="Shop Image 1" currentUrl={content.home_shop_image_1 || ""} defaultUrl={shopFront} contentKey="home_shop_image_1" onUpload={updateContent} />
                  <ImageDropZone label="Shop Image 2" currentUrl={content.home_shop_image_2 || ""} defaultUrl={shopBack} contentKey="home_shop_image_2" onUpload={updateContent} />
                  <ImageDropZone label="Shop Image 3" currentUrl={content.home_shop_image_3 || ""} defaultUrl={shopDetail} contentKey="home_shop_image_3" onUpload={updateContent} />
                </div>

                <ImageDropZone label="Napkin / About Image" currentUrl={content.home_napkin_image || ""} defaultUrl={napkin} contentKey="home_napkin_image" onUpload={updateContent} />
                <ImageDropZone label="Tour Section Image" currentUrl={content.home_tour_image || ""} defaultUrl={tourDuo} contentKey="home_tour_image" onUpload={updateContent} />

                <SectionTitle className="mt-12">Visual Gallery</SectionTitle>
                <p className="text-white/40 text-xs mb-4">Add, remove, or reorder gallery images. Drag & drop multiple images at once.</p>
                <GalleryEditor
                  label="Gallery Images"
                  images={getGallery("home_gallery_images", defaultHomeGallery)}
                  folder="home-gallery"
                  onChange={(imgs) => setGallery("home_gallery_images", imgs)}
                />
              </TabPanel>
            )}

            {activeTab === "copy" && (
              <TabPanel key="copy">
                <SectionTitle>About Page Copy</SectionTitle>
                <Field label="Page Title" value={content.about_title || ""} onChange={(v) => updateContent("about_title", v)} placeholder="ABOUT" />
                <Field label="Page Title Accent" value={content.about_title_accent || ""} onChange={(v) => updateContent("about_title_accent", v)} placeholder="US" />
                <Field label="Location" value={content.about_location || ""} onChange={(v) => updateContent("about_location", v)} placeholder="HOUSTON, TX" />
                <TextArea label="Bio Paragraph 1" value={content.about_bio || ""} onChange={(v) => updateContent("about_bio", v)} />
                <TextArea label="Bio Paragraph 2" value={content.about_bio_2 || ""} onChange={(v) => updateContent("about_bio_2", v)} />
                <TextArea label="Bio Paragraph 3" value={content.about_bio_3 || ""} onChange={(v) => updateContent("about_bio_3", v)} />
                <Field label="Quote" value={content.about_quote || ""} onChange={(v) => updateContent("about_quote", v)} />
                <Field label="Quote Attribution" value={content.about_quote_attribution || ""} onChange={(v) => updateContent("about_quote_attribution", v)} />
                <Field label="RnM Heading" value={content.about_rnm_title || ""} onChange={(v) => updateContent("about_rnm_title", v)} placeholder="RnM" />
                <TextArea label="RnM Description" value={content.about_rnm || ""} onChange={(v) => updateContent("about_rnm", v)} />

                <SectionTitle className="mt-12">General</SectionTitle>
                <Field label="Headline" value={content.headline || ""} onChange={(v) => updateContent("headline", v)} />
                <TextArea label="Contact Info" value={content.contact_info || ""} onChange={(v) => updateContent("contact_info", v)} />

                <SectionTitle className="mt-12">About Page Images</SectionTitle>
                <ImageDropZone label="Hero / Napkin Image" currentUrl={content.about_hero_image || ""} defaultUrl={aboutHero} contentKey="about_hero_image" folder="about" onUpload={updateContent} />
                <ImageDropZone label="Hands / RnM Image" currentUrl={content.about_hands_image || ""} defaultUrl={handsCover} contentKey="about_hands_image" folder="about" onUpload={updateContent} />
                <GalleryEditor
                  label="Rotating Grid Images (4 recommended)"
                  images={getGallery("about_rotate_images", defaultAboutRotate)}
                  folder="about"
                  onChange={(imgs) => setGallery("about_rotate_images", imgs)}
                />
              </TabPanel>
            )}

            {activeTab === "members" && (
              <TabPanel key="members">
                <SectionTitle>Cameron</SectionTitle>
                <Field label="Cameron Role" value={content.cameron_role || ""} onChange={(v) => updateContent("cameron_role", v)} placeholder="Guitar / Production" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Favorite Color" value={content.cameron_favorite_color || ""} onChange={(v) => updateContent("cameron_favorite_color", v)} placeholder="Forest Green" />
                  <Field label="Personality" value={content.cameron_personality || ""} onChange={(v) => updateContent("cameron_personality", v)} placeholder="INFP-A" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Birthday" value={content.cameron_birthday || ""} onChange={(v) => updateContent("cameron_birthday", v)} placeholder="08/08/2002" />
                  <Field label="Signs (Sun · Moon · Rising)" value={content.cameron_signs || ""} onChange={(v) => updateContent("cameron_signs", v)} placeholder="Leo · Leo · Scorpio" />
                </div>
                <TextArea label="Cameron Bio" value={content.cameron_bio || ""} onChange={(v) => updateContent("cameron_bio", v)} rows={8} />

                <LinksEditor
                  label="Cameron Links"
                  links={(() => { if (!("cameron_links" in content)) return defaultCameronLinks; try { return JSON.parse(content.cameron_links || "[]"); } catch { return defaultCameronLinks; } })()}
                  onChange={(links) => updateContent("cameron_links", JSON.stringify(links))}
                />

                <LinksEditor
                  label="Cameron Socials"
                  links={(() => { if (!("cameron_socials" in content)) return defaultCameronSocials; try { return JSON.parse(content.cameron_socials || "[]"); } catch { return defaultCameronSocials; } })()}
                  onChange={(links) => updateContent("cameron_socials", JSON.stringify(links))}
                  isSocial
                />

                <ImageDropZone label="Cameron Eyes Image" currentUrl={content.members_cameron_eyes || ""} defaultUrl={cameronEyes} contentKey="members_cameron_eyes" folder="members" onUpload={updateContent} />
                {/* Desktop eyes crop */}
                <p className="text-[10px] tracking-widest-custom text-white/30 mb-2 mt-4">DESKTOP (680px window)</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">ZOOM ({content.cameron_eyes_zoom || "4.0"}x)</label>
                    <input type="range" min="1" max="8" step="0.1" value={content.cameron_eyes_zoom || "4.0"} onChange={(e) => updateContent("cameron_eyes_zoom", e.target.value)} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">POSITION ({content.cameron_eyes_position || "16"}%)</label>
                    <input type="range" min="0" max="100" step="1" value={content.cameron_eyes_position || "16"} onChange={(e) => updateContent("cameron_eyes_position", e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="relative overflow-hidden mb-4 border border-white/10" style={{ width: "600px", maxWidth: "100%", height: "112px" }}>
                  <img src={content.members_cameron_eyes && content.members_cameron_eyes !== "__removed__" ? content.members_cameron_eyes : cameronEyes} alt="Desktop preview" className="w-full h-full object-cover" style={{ objectPosition: `center ${content.cameron_eyes_position || "16"}%`, transform: `scale(${content.cameron_eyes_zoom || "4.0"})` }} />
                </div>

                {/* Tablet eyes crop */}
                <p className="text-[10px] tracking-widest-custom text-white/30 mb-2">TABLET (~834px viewport)</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">ZOOM ({content.cameron_eyes_zoom_tablet || content.cameron_eyes_zoom || "4.0"}x)</label>
                    <input type="range" min="1" max="8" step="0.1" value={content.cameron_eyes_zoom_tablet || content.cameron_eyes_zoom || "4.0"} onChange={(e) => updateContent("cameron_eyes_zoom_tablet", e.target.value)} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">POSITION ({content.cameron_eyes_position_tablet || content.cameron_eyes_position || "16"}%)</label>
                    <input type="range" min="0" max="100" step="1" value={content.cameron_eyes_position_tablet || content.cameron_eyes_position || "16"} onChange={(e) => updateContent("cameron_eyes_position_tablet", e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="relative overflow-hidden mb-4 border border-white/10" style={{ width: "600px", maxWidth: "100%", height: "112px" }}>
                  <img src={content.members_cameron_eyes && content.members_cameron_eyes !== "__removed__" ? content.members_cameron_eyes : cameronEyes} alt="Tablet preview" className="w-full h-full object-cover" style={{ objectPosition: `center ${content.cameron_eyes_position_tablet || content.cameron_eyes_position || "16"}%`, transform: `scale(${content.cameron_eyes_zoom_tablet || content.cameron_eyes_zoom || "4.0"})` }} />
                </div>

                {/* Mobile eyes crop */}
                <p className="text-[10px] tracking-widest-custom text-white/30 mb-2">MOBILE (~390px viewport)</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">ZOOM ({content.cameron_eyes_zoom_mobile || content.cameron_eyes_zoom || "4.0"}x)</label>
                    <input type="range" min="1" max="8" step="0.1" value={content.cameron_eyes_zoom_mobile || content.cameron_eyes_zoom || "4.0"} onChange={(e) => updateContent("cameron_eyes_zoom_mobile", e.target.value)} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">POSITION ({content.cameron_eyes_position_mobile || content.cameron_eyes_position || "16"}%)</label>
                    <input type="range" min="0" max="100" step="1" value={content.cameron_eyes_position_mobile || content.cameron_eyes_position || "16"} onChange={(e) => updateContent("cameron_eyes_position_mobile", e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="relative overflow-hidden mb-6 border border-white/10" style={{ width: "342px", maxWidth: "100%", height: "112px" }}>
                  <img src={content.members_cameron_eyes && content.members_cameron_eyes !== "__removed__" ? content.members_cameron_eyes : cameronEyes} alt="Mobile preview" className="w-full h-full object-cover" style={{ objectPosition: `center ${content.cameron_eyes_position_mobile || content.cameron_eyes_position || "16"}%`, transform: `scale(${content.cameron_eyes_zoom_mobile || content.cameron_eyes_zoom || "4.0"})` }} />
                </div>
                <GalleryEditor
                  label="Cameron Film Strip"
                  images={getGallery("members_cameron_filmstrip", defaultCameronFilmstrip)}
                  folder="members-cameron"
                  onChange={(imgs) => setGallery("members_cameron_filmstrip", imgs)}
                />

                <SectionTitle className="mt-12">Grant</SectionTitle>
                <Field label="Grant Role" value={content.grant_role || ""} onChange={(v) => updateContent("grant_role", v)} placeholder="Drums / Percussion" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Favorite Color" value={content.grant_favorite_color || ""} onChange={(v) => updateContent("grant_favorite_color", v)} placeholder="Celestine Blue" />
                  <Field label="Personality" value={content.grant_personality || ""} onChange={(v) => updateContent("grant_personality", v)} placeholder="ENFJ-A" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Birthday" value={content.grant_birthday || ""} onChange={(v) => updateContent("grant_birthday", v)} placeholder="06/12/2003" />
                  <Field label="Signs (Sun · Moon · Rising)" value={content.grant_signs || ""} onChange={(v) => updateContent("grant_signs", v)} placeholder="Gemini · Sagittarius · Scorpio" />
                </div>
                <TextArea label="Grant Bio" value={content.grant_bio || ""} onChange={(v) => updateContent("grant_bio", v)} rows={8} />

                <LinksEditor
                  label="Grant Links"
                  links={(() => { if (!("grant_links" in content)) return []; try { return JSON.parse(content.grant_links || "[]"); } catch { return []; } })()}
                  onChange={(links) => updateContent("grant_links", JSON.stringify(links))}
                />

                <LinksEditor
                  label="Grant Socials"
                  links={(() => { if (!("grant_socials" in content)) return defaultGrantSocials; try { return JSON.parse(content.grant_socials || "[]"); } catch { return defaultGrantSocials; } })()}
                  onChange={(links) => updateContent("grant_socials", JSON.stringify(links))}
                  isSocial
                />

                <ImageDropZone label="Grant Eyes Image" currentUrl={content.members_grant_eyes || ""} defaultUrl={grantEyes} contentKey="members_grant_eyes" folder="members" onUpload={updateContent} />
                {/* Desktop eyes crop */}
                <p className="text-[10px] tracking-widest-custom text-white/30 mb-2 mt-4">DESKTOP (680px window)</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">ZOOM ({content.grant_eyes_zoom || "4.0"}x)</label>
                    <input type="range" min="1" max="8" step="0.1" value={content.grant_eyes_zoom || "4.0"} onChange={(e) => updateContent("grant_eyes_zoom", e.target.value)} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">POSITION ({content.grant_eyes_position || "24"}%)</label>
                    <input type="range" min="0" max="100" step="1" value={content.grant_eyes_position || "24"} onChange={(e) => updateContent("grant_eyes_position", e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="relative overflow-hidden mb-4 border border-white/10" style={{ width: "600px", maxWidth: "100%", height: "112px" }}>
                  <img src={content.members_grant_eyes && content.members_grant_eyes !== "__removed__" ? content.members_grant_eyes : grantEyes} alt="Desktop preview" className="w-full h-full object-cover" style={{ objectPosition: `center ${content.grant_eyes_position || "24"}%`, transform: `scale(${content.grant_eyes_zoom || "4.0"})` }} />
                </div>

                {/* Tablet eyes crop */}
                <p className="text-[10px] tracking-widest-custom text-white/30 mb-2">TABLET (~834px viewport)</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">ZOOM ({content.grant_eyes_zoom_tablet || content.grant_eyes_zoom || "4.0"}x)</label>
                    <input type="range" min="1" max="8" step="0.1" value={content.grant_eyes_zoom_tablet || content.grant_eyes_zoom || "4.0"} onChange={(e) => updateContent("grant_eyes_zoom_tablet", e.target.value)} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">POSITION ({content.grant_eyes_position_tablet || content.grant_eyes_position || "24"}%)</label>
                    <input type="range" min="0" max="100" step="1" value={content.grant_eyes_position_tablet || content.grant_eyes_position || "24"} onChange={(e) => updateContent("grant_eyes_position_tablet", e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="relative overflow-hidden mb-4 border border-white/10" style={{ width: "600px", maxWidth: "100%", height: "112px" }}>
                  <img src={content.members_grant_eyes && content.members_grant_eyes !== "__removed__" ? content.members_grant_eyes : grantEyes} alt="Tablet preview" className="w-full h-full object-cover" style={{ objectPosition: `center ${content.grant_eyes_position_tablet || content.grant_eyes_position || "24"}%`, transform: `scale(${content.grant_eyes_zoom_tablet || content.grant_eyes_zoom || "4.0"})` }} />
                </div>

                {/* Mobile eyes crop */}
                <p className="text-[10px] tracking-widest-custom text-white/30 mb-2">MOBILE (~390px viewport)</p>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">ZOOM ({content.grant_eyes_zoom_mobile || content.grant_eyes_zoom || "4.0"}x)</label>
                    <input type="range" min="1" max="8" step="0.1" value={content.grant_eyes_zoom_mobile || content.grant_eyes_zoom || "4.0"} onChange={(e) => updateContent("grant_eyes_zoom_mobile", e.target.value)} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">POSITION ({content.grant_eyes_position_mobile || content.grant_eyes_position || "24"}%)</label>
                    <input type="range" min="0" max="100" step="1" value={content.grant_eyes_position_mobile || content.grant_eyes_position || "24"} onChange={(e) => updateContent("grant_eyes_position_mobile", e.target.value)} className="w-full" />
                  </div>
                </div>
                <div className="relative overflow-hidden mb-6 border border-white/10" style={{ width: "342px", maxWidth: "100%", height: "112px" }}>
                  <img src={content.members_grant_eyes && content.members_grant_eyes !== "__removed__" ? content.members_grant_eyes : grantEyes} alt="Mobile preview" className="w-full h-full object-cover" style={{ objectPosition: `center ${content.grant_eyes_position_mobile || content.grant_eyes_position || "24"}%`, transform: `scale(${content.grant_eyes_zoom_mobile || content.grant_eyes_zoom || "4.0"})` }} />
                </div>
                <GalleryEditor
                  label="Grant Film Strip"
                  images={getGallery("members_grant_filmstrip", defaultGrantFilmstrip)}
                  folder="members-grant"
                  onChange={(imgs) => setGallery("members_grant_filmstrip", imgs)}
                />
              </TabPanel>
            )}

            {activeTab === "tour" && (
              <TabPanel key="tour">
                <SectionTitle>Tour Page Copy</SectionTitle>
                <Field label="Page Title" value={content.tour_title || ""} onChange={(v) => updateContent("tour_title", v)} placeholder="TOUR" />
                <Field label="Coming Soon Text" value={content.tour_coming_soon || ""} onChange={(v) => updateContent("tour_coming_soon", v)} placeholder="COMING SOON" />
                <Field label="More Dates Text" value={content.tour_more_dates || ""} onChange={(v) => updateContent("tour_more_dates", v)} placeholder="MORE DATES ANNOUNCED SOON" />

                {/* Tour Coming Soon Toggle */}
                <div className="p-4 border border-white/10 mb-8 mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/80 mb-1">Tour is {tourLive ? "LIVE" : "COMING SOON"}</p>
                    <p className="text-[10px] text-white/40">When off, the tour page shows "Coming Soon" and dates are blurred on the home page.</p>
                  </div>
                  <button
                    onClick={() => setTourLive(!tourLive)}
                    className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest-custom border transition-colors ${tourLive ? "border-green-400/40 text-green-400 bg-green-400/10" : "border-white/20 text-white/60 hover:bg-white/10"}`}
                  >
                    <Power size={12} />
                    {tourLive ? "LIVE" : "OFF"}
                  </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <SectionTitle className="mb-0">Tour Dates</SectionTitle>
                  <button
                    onClick={() => setTourDates([...tourDates, {
                      id: `new-${Date.now()}`,
                      date: "",
                      city: "",
                      venue: "",
                      ticket_link: "",
                      status: "available",
                      sort_order: tourDates.length,
                    }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD SHOW
                  </button>
                </div>
                <div className="space-y-2">
                  {tourDates.map((td, i) => (
                    <div
                      key={td.id}
                      draggable
                      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/drag-tour", String(i)); }}
                      onDragOver={(e) => { e.preventDefault(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const from = Number(e.dataTransfer.getData("text/drag-tour"));
                        if (isNaN(from) || from === i) return;
                        const reordered = [...tourDates];
                        const [moved] = reordered.splice(from, 1);
                        reordered.splice(i, 0, moved);
                        setTourDates(reordered.map((t, idx) => ({ ...t, sort_order: idx })));
                      }}
                      className="p-4 border border-white/10 space-y-3 cursor-grab active:cursor-grabbing hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <GripVertical size={14} className="text-white/30" />
                        <span className="text-[9px] tracking-widest-custom text-white/40">#{i + 1}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Date" value={td.date} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], date: v };
                          setTourDates(updated);
                        }} />
                        <Field label="City" value={td.city} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], city: v };
                          setTourDates(updated);
                        }} />
                        <Field label="Venue" value={td.venue} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], venue: v };
                          setTourDates(updated);
                        }} />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Ticket Link" value={td.ticket_link} onChange={(v) => {
                          const updated = [...tourDates];
                          updated[i] = { ...updated[i], ticket_link: v };
                          setTourDates(updated);
                        }} />
                        <div>
                          <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">STATUS</label>
                          <select
                            value={td.status}
                            onChange={(e) => {
                              const updated = [...tourDates];
                              updated[i] = { ...updated[i], status: e.target.value };
                              setTourDates(updated);
                            }}
                            className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50"
                          >
                            <option value="available">Available</option>
                            <option value="low">Low Tickets</option>
                            <option value="sold-out">Sold Out</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={async () => {
                              if (!td.id.startsWith("new-")) {
                                await supabase.from("tour_dates").delete().eq("id", td.id);
                              }
                              setTourDates(tourDates.filter((_, j) => j !== i));
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                          >
                            <Trash2 size={12} /> REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}

            {activeTab === "music" && (
              <TabPanel key="music">
                <SectionTitle>Music Page Copy</SectionTitle>
                <Field label="Page Title" value={content.music_title || ""} onChange={(v) => updateContent("music_title", v)} placeholder="MUSIC" />
                <Field label="Listen Now Label" value={content.music_listen_label || ""} onChange={(v) => updateContent("music_listen_label", v)} placeholder="LISTEN NOW" />

                <SectionTitle className="mt-12">Streaming Profile Links</SectionTitle>
                <Field label="Spotify Artist URL" value={content.music_spotify_url || "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE"} onChange={(v) => updateContent("music_spotify_url", v)} placeholder="https://open.spotify.com/artist/..." />
                <Field label="Apple Music Artist URL" value={content.music_apple_url || "https://music.apple.com/us/artist/sadder-days/1563767142"} onChange={(v) => updateContent("music_apple_url", v)} placeholder="https://music.apple.com/us/artist/..." />

                <div className="flex items-center justify-between mb-6 mt-10">
                  <SectionTitle className="mb-0">Music Releases</SectionTitle>
                  <button
                    onClick={() => setReleases([...releases, {
                      id: `new-${Date.now()}`,
                      title: "",
                      type: "Single",
                      year: new Date().getFullYear().toString(),
                      cover_url: "",
                      spotify_url: "",
                      apple_url: "",
                      sort_order: releases.length,
                    }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD RELEASE
                  </button>
                </div>
                <div className="space-y-2">
                  {releases.map((r, i) => (
                    <div
                      key={r.id}
                      draggable
                      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/drag-music", String(i)); }}
                      onDragOver={(e) => { e.preventDefault(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const from = Number(e.dataTransfer.getData("text/drag-music"));
                        if (isNaN(from) || from === i) return;
                        const reordered = [...releases];
                        const [moved] = reordered.splice(from, 1);
                        reordered.splice(i, 0, moved);
                        setReleases(reordered.map((rel, idx) => ({ ...rel, sort_order: idx })));
                      }}
                      className="p-4 border border-white/10 space-y-3 cursor-grab active:cursor-grabbing hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <GripVertical size={14} className="text-white/30" />
                        <span className="text-[9px] tracking-widest-custom text-white/40">#{i + 1}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Title" value={r.title} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], title: v };
                          setReleases(updated);
                        }} />
                        <div>
                          <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">TYPE</label>
                          <select
                            value={r.type}
                            onChange={(e) => {
                              const updated = [...releases];
                              updated[i] = { ...updated[i], type: e.target.value };
                              setReleases(updated);
                            }}
                            className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50"
                          >
                            <option value="Single">Single</option>
                            <option value="EP">EP</option>
                            <option value="Album">Album</option>
                          </select>
                        </div>
                        <Field label="Year" value={r.year} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], year: v };
                          setReleases(updated);
                        }} />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <Field label="Cover Image URL" value={r.cover_url} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], cover_url: v };
                          setReleases(updated);
                        }} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Spotify URL" value={r.spotify_url} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], spotify_url: v };
                          setReleases(updated);
                        }} />
                        <Field label="Apple Music URL" value={r.apple_url} onChange={(v) => {
                          const updated = [...releases];
                          updated[i] = { ...updated[i], apple_url: v };
                          setReleases(updated);
                        }} />
                      </div>
                      {r.cover_url && (
                        <img src={r.cover_url} alt={r.title} className="w-16 h-16 object-cover" />
                      )}
                      <button
                        onClick={async () => {
                          if (!r.id.startsWith("new-")) {
                            await supabase.from("music_releases").delete().eq("id", r.id);
                          }
                          setReleases(releases.filter((_, j) => j !== i));
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={12} /> REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}


            {activeTab === "lyrics" && (
              <TabPanel key="lyrics">
                <SectionTitle>Lyrics Page</SectionTitle>
                <Field label="Page Title" value={content.lyrics_page_title || ""} onChange={(v) => updateContent("lyrics_page_title", v)} placeholder="Lyrics" />

                <div className="flex items-center justify-between mb-6 mt-10">
                  <SectionTitle className="mb-0">Songs</SectionTitle>
                  <button
                    onClick={() => setSongs([...songs, {
                      id: `new-${Date.now()}`,
                      title: "",
                      lyrics: "",
                      sort_order: songs.length,
                    }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD SONG
                  </button>
                </div>
                <div className="space-y-2">
                  {songs.map((s, i) => (
                    <div
                      key={s.id}
                      draggable
                      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/drag-song", String(i)); }}
                      onDragOver={(e) => { e.preventDefault(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const from = Number(e.dataTransfer.getData("text/drag-song"));
                        if (isNaN(from) || from === i) return;
                        const reordered = [...songs];
                        const [moved] = reordered.splice(from, 1);
                        reordered.splice(i, 0, moved);
                        setSongs(reordered.map((song, idx) => ({ ...song, sort_order: idx })));
                      }}
                      className="p-4 border border-white/10 space-y-3 cursor-grab active:cursor-grabbing hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical size={14} className="text-white/30" />
                          <span className="text-[9px] tracking-widest-custom text-white/40">#{i + 1}</span>
                        </div>
                        <button
                          onClick={async () => {
                            if (!s.id.startsWith("new-")) {
                              await supabase.from("songs").delete().eq("id", s.id);
                            }
                            setSongs(songs.filter((_, j) => j !== i));
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 size={12} /> REMOVE
                        </button>
                      </div>
                      <Field label="Song Title" value={s.title} onChange={(v) => {
                        const updated = [...songs];
                        updated[i] = { ...updated[i], title: v };
                        setSongs(updated);
                      }} />
                      <TextArea label="Lyrics" value={s.lyrics} onChange={(v) => {
                        const updated = [...songs];
                        updated[i] = { ...updated[i], lyrics: v };
                        setSongs(updated);
                      }} rows={12} />
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}

            {activeTab === "lab" && (
              <TabPanel key="lab">
                <SectionTitle>Lab Page Copy</SectionTitle>
                <Field label="Page Title" value={content.lab_title || ""} onChange={(v) => updateContent("lab_title", v)} placeholder="LAB" />
                <Field label="Generator Folder Label" value={content.lab_tab_generator || ""} onChange={(v) => updateContent("lab_tab_generator", v)} placeholder="GENERATOR" />
                <Field label="Coin Flip Folder Label" value={content.lab_tab_coinflip || ""} onChange={(v) => updateContent("lab_tab_coinflip", v)} placeholder="FLIP A COIN" />
                <Field label="Quiz Folder Label" value={content.lab_tab_quiz || ""} onChange={(v) => updateContent("lab_tab_quiz", v)} placeholder="YIN OR YANG" />
                <TextArea label="Yin Result Text" value={content.lab_yin_result || ""} onChange={(v) => updateContent("lab_yin_result", v)} rows={2} />
                <TextArea label="Yang Result Text" value={content.lab_yang_result || ""} onChange={(v) => updateContent("lab_yang_result", v)} rows={2} />

                <SectionTitle className="mt-12">Yin or Yang Quiz</SectionTitle>
                <p className="text-white/40 text-xs mb-6">Edit the quiz questions shown on the Lab page. Each question has two options — one for Yin, one for Yang.</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-widest-custom text-white/60">{quizQuestions.length} QUESTIONS</span>
                  <button
                    onClick={() => setQuizQuestions([...quizQuestions, { question: "", options: [{ text: "", side: "yin" }, { text: "", side: "yang" }] }])}
                    className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <Plus size={12} /> ADD QUESTION
                  </button>
                </div>
                <div className="space-y-4">
                  {quizQuestions.map((q, i) => (
                    <div key={i} className="p-4 border border-white/10 space-y-3">
                      <Field label={`Question ${i + 1}`} value={q.question} onChange={(v) => {
                        const updated = [...quizQuestions];
                        updated[i] = { ...updated[i], question: v };
                        setQuizQuestions(updated);
                      }} placeholder="When you close your eyes, do you see..." />
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Yin Option" value={q.options[0]?.text || ""} onChange={(v) => {
                          const updated = [...quizQuestions];
                          updated[i] = { ...updated[i], options: [{ text: v, side: "yin" }, updated[i].options[1]] };
                          setQuizQuestions(updated);
                        }} placeholder="Light fading into softness" />
                        <Field label="Yang Option" value={q.options[1]?.text || ""} onChange={(v) => {
                          const updated = [...quizQuestions];
                          updated[i] = { ...updated[i], options: [updated[i].options[0], { text: v, side: "yang" }] };
                          setQuizQuestions(updated);
                        }} placeholder="Deep shadows with hidden depths" />
                      </div>
                      <button
                        onClick={() => setQuizQuestions(quizQuestions.filter((_, j) => j !== i))}
                        className="flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest-custom text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={12} /> REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}

            {activeTab === "shop" && (
              <TabPanel key="shop">
                <SectionTitle>Vinyl Product Details</SectionTitle>
                <p className="text-white/40 text-xs mb-8 leading-relaxed">
                  Edit the vinyl listing that appears on the Shop page and Product detail page.
                </p>

                {/* Live Preview */}
                <div className="p-5 border border-white/10 mb-8">
                  <p className="text-[9px] tracking-widest-custom text-white/40 mb-4">PRODUCT PREVIEW</p>
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-white/5 overflow-hidden flex-shrink-0">
                      {content.vinyl_image && (
                        <img src={content.vinyl_image} alt="Vinyl" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-white">{content.vinyl_name || "YIN/YANG VINYL"}</p>
                      <p className="text-xs text-white/50 mt-1">${content.vinyl_price || "30"}.00</p>
                      <p className="text-[10px] text-white/30 mt-2 line-clamp-2">{content.vinyl_description || "Limited edition vinyl pressing."}</p>
                    </div>
                  </div>
                </div>

                <Field label="Product Name" value={content.vinyl_name || ""} onChange={(v) => updateContent("vinyl_name", v)} placeholder="YIN/YANG VINYL" />
                <Field label="Price (number only)" value={content.vinyl_price || ""} onChange={(v) => updateContent("vinyl_price", v)} placeholder="30" />
                <TextArea label="Description" value={content.vinyl_description || ""} onChange={(v) => updateContent("vinyl_description", v)} rows={4} />
                <Field label="External Purchase URL" value={content.vinyl_purchase_url || ""} onChange={(v) => updateContent("vinyl_purchase_url", v)} placeholder="https://example.com/purchase-vinyl" />

                <SectionTitle className="mt-10">Product Image</SectionTitle>
                <p className="text-white/40 text-xs mb-4">Override the album cover with a custom product image (optional). If empty, the latest album cover is used.</p>
                <ImageDropZone
                  label="Vinyl Product Image"
                  currentUrl={content.vinyl_image || ""}
                  contentKey="vinyl_image"
                  folder="shop"
                  defaultUrl=""
                  onUpload={(key, url) => updateContent(key, url === "__removed__" ? "" : url)}
                />

                <SectionTitle className="mt-10">Format Details</SectionTitle>
                <Field label="Format" value={content.vinyl_format || ""} onChange={(v) => updateContent("vinyl_format", v)} placeholder='12" Vinyl LP' />
                <Field label="Weight" value={content.vinyl_weight || ""} onChange={(v) => updateContent("vinyl_weight", v)} placeholder="180g" />
                <Field label="Includes" value={content.vinyl_includes || ""} onChange={(v) => updateContent("vinyl_includes", v)} placeholder="Digital Download" />
              </TabPanel>
            )}

              <TabPanel key="shopify">
                <SectionTitle>Shop Status</SectionTitle>
                <div className="p-4 border border-white/10 mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/80 mb-1">Shop is {shopLive ? "LIVE" : "COMING SOON"}</p>
                    <p className="text-[10px] text-white/40">When live, the "Coming Soon" label and strike-through are removed from the nav.</p>
                  </div>
                  <button
                    onClick={() => setShopLive(!shopLive)}
                    className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest-custom border transition-colors ${shopLive ? "border-green-400/40 text-green-400 bg-green-400/10" : "border-white/20 text-white/60 hover:bg-white/10"}`}
                  >
                    <Power size={12} />
                    {shopLive ? "LIVE" : "OFF"}
                  </button>
                </div>

                <SectionTitle>Connect Your Shopify Store</SectionTitle>
                <p className="text-white/50 text-xs leading-relaxed mb-8">
                  Connect your existing Shopify store to power the shop page. Products, inventory, and checkout will all be handled through Shopify.
                </p>

                <div className="p-6 border border-white/10 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Link2 size={16} className="text-white/40" />
                    <span className="text-[10px] tracking-widest-custom text-white/60">STORE CONNECTION</span>
                  </div>

                  <Field label="Shopify Store URL" value={shopifyUrl} onChange={setShopifyUrl} placeholder="yourstore.myshopify.com" />
                  <Field label="Storefront Access Token" value={shopifyToken} onChange={setShopifyToken} placeholder="shpat_xxxxxxxxxxxxx" />

                  <div className="p-4 bg-white/5 border border-white/10">
                    <p className="text-[10px] tracking-widest-custom text-white/50 mb-3">HOW TO GET YOUR TOKEN</p>
                    <ol className="text-xs text-white/60 space-y-2 list-decimal list-inside">
                      <li>Go to your Shopify Admin → Settings → Apps and sales channels</li>
                      <li>Click "Develop apps" → Create an app</li>
                      <li>Under "Configuration", enable Storefront API access</li>
                      <li>Install the app and copy the Storefront access token</li>
                    </ol>
                  </div>

                  {shopifyUrl && shopifyToken && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-green-400 text-xs"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      Store connected — save changes to apply
                    </motion.div>
                  )}

                  <a
                    href={shopifyUrl ? `https://${shopifyUrl.replace(/^https?:\/\//, "")}/admin` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors ${!shopifyUrl ? "opacity-30 pointer-events-none" : ""}`}
                  >
                    OPEN SHOPIFY ADMIN <ExternalLink size={12} />
                  </a>
                </div>
              </TabPanel>
            )}

            {activeTab === "meta" && (
              <TabPanel key="meta">
                <SectionTitle>Site Metadata & SEO</SectionTitle>
                <p className="text-white/40 text-xs mb-8 leading-relaxed">
                  Control how your site appears in search results and when links are shared on social media. Changes apply after saving.
                </p>

                {/* Current Live Preview */}
                <div className="p-5 border border-white/10 mb-8">
                  <p className="text-[9px] tracking-widest-custom text-white/40 mb-4">SEARCH RESULT PREVIEW</p>
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-sm text-blue-400 truncate">{content.meta_title || "sadder days | official site"}</p>
                    <p className="text-[11px] text-green-400/70 mt-0.5 truncate">sadderdays.lovable.app</p>
                    <p className="text-xs text-white/50 mt-1 line-clamp-2">{content.meta_description || "sadder days are an, nyc-based, creative duo blending electronic pop and hyper-r&b into yearnful, cathartic songs about sensuality, heartbreak, and escape."}</p>
                  </div>
                </div>

                {/* Social Share Preview */}
                <div className="p-5 border border-white/10 mb-8">
                  <p className="text-[9px] tracking-widest-custom text-white/40 mb-4">LINK PREVIEW (SOCIAL SHARE)</p>
                  <div className="bg-white/5 rounded overflow-hidden max-w-sm">
                    {(content.meta_og_image || "/og-image.jpg") && (
                      <img 
                        src={content.meta_og_image || "/og-image.jpg"} 
                        alt="OG Preview" 
                        className="w-full h-44 object-cover"
                      />
                    )}
                    <div className="p-3">
                      <p className="text-[10px] text-white/40 uppercase">sadderdays.lovable.app</p>
                      <p className="text-sm text-white mt-0.5 truncate">{content.meta_title || "sadder days | official site"}</p>
                      <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{content.meta_description || "sadder days are an, nyc-based, creative duo blending electronic pop and hyper-r&b into yearnful, cathartic songs about sensuality, heartbreak, and escape."}</p>
                    </div>
                  </div>
                </div>

                {/* Editable Fields */}
                <SectionTitle className="mt-8">Page Title</SectionTitle>
                <Field 
                  label="Title (shown in browser tab & search results)" 
                  value={content.meta_title || ""} 
                  onChange={(v) => updateContent("meta_title", v)} 
                  placeholder="sadder days | official site" 
                />
                <p className="text-[10px] text-white/30 -mt-2 mb-6">{(content.meta_title || "sadder days | official site").length}/60 characters</p>

                <SectionTitle>Meta Description</SectionTitle>
                <TextArea 
                  label="Description (shown in search results & link previews)" 
                  value={content.meta_description || ""} 
                  onChange={(v) => updateContent("meta_description", v)} 
                  rows={3}
                />
                <p className="text-[10px] text-white/30 -mt-2 mb-6">{(content.meta_description || "sadder days are an, nyc-based, creative duo blending electronic pop and hyper-r&b into yearnful, cathartic songs about sensuality, heartbreak, and escape.").length}/160 characters</p>

                <SectionTitle>Share Image (OG Image)</SectionTitle>
                <p className="text-white/40 text-xs mb-4">This image appears when the site link is shared on social media.</p>
                <ImageDropZone
                  label="OG / Share Image"
                  currentUrl={content.meta_og_image || ""}
                  contentKey="meta_og_image"
                  folder="meta"
                  defaultUrl="/og-image.jpg"
                  onUpload={(key, url) => updateContent(key, url === "__removed__" ? "" : url)}
                />

                <SectionTitle>Favicon</SectionTitle>
                <p className="text-white/40 text-xs mb-4">The small icon shown in browser tabs. Upload a square PNG image (recommended 32×32 or 64×64).</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center rounded">
                    <img 
                      src={content.meta_favicon || "/favicon.png"} 
                      alt="Current favicon" 
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-xs text-white/40">Current favicon</span>
                </div>
                <ImageDropZone
                  label="Favicon Image"
                  currentUrl={content.meta_favicon || ""}
                  contentKey="meta_favicon"
                  folder="meta"
                  defaultUrl="/favicon.png"
                  onUpload={(key, url) => updateContent(key, url === "__removed__" ? "" : url)}
                />
              </TabPanel>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Social Icon Database ────────────────────────────────────────
const TikTokIconSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
const PatreonIconSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/>
  </svg>
);
const SpotifyIconSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);
const SoundCloudIconSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.3c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.199-1.3-.2-1.332c-.014-.057-.047-.094-.104-.094m1.79-1.065c-.067 0-.104.055-.114.116l-.214 2.375.214 2.313c.01.065.047.116.114.116s.104-.051.116-.116l.244-2.313-.244-2.375c-.012-.061-.049-.116-.116-.116m.893-.184c-.076 0-.12.063-.13.124l-.195 2.559.195 2.496c.01.065.054.124.13.124.074 0 .12-.059.13-.124l.222-2.496-.222-2.559c-.01-.061-.056-.124-.13-.124m.9-.039c-.085 0-.135.07-.143.134l-.178 2.598.178 2.543c.008.07.058.134.143.134.083 0 .135-.064.143-.134l.201-2.543-.201-2.598c-.008-.064-.06-.134-.143-.134m.928-.274c-.093 0-.15.078-.157.148l-.162 2.872.162 2.579c.007.073.064.148.157.148.089 0 .15-.075.157-.148l.185-2.579-.185-2.872c-.007-.07-.068-.148-.157-.148m.963-.182c-.1 0-.163.086-.168.158l-.15 3.054.15 2.601c.005.075.068.158.168.158.098 0 .163-.083.168-.158l.168-2.601-.168-3.054c-.005-.072-.07-.158-.168-.158m1.015-.218c-.11 0-.176.094-.182.17l-.134 3.272.134 2.612c.006.08.072.17.182.17.108 0 .176-.09.182-.17l.15-2.612-.15-3.272c-.006-.076-.074-.17-.182-.17m1.065-.092c-.116 0-.19.1-.194.18l-.12 3.364.12 2.615c.004.084.078.18.194.18s.19-.096.195-.18l.135-2.615-.135-3.364c-.005-.08-.079-.18-.195-.18m1.116-.012c-.122 0-.205.108-.208.19l-.107 3.376.107 2.607c.003.085.086.19.208.19.12 0 .203-.105.208-.19l.12-2.607-.12-3.376c-.005-.082-.088-.19-.208-.19m2.223-.073c-.132 0-.215.12-.215.206v.01l-.098 3.434.098 2.592c0 .09.083.206.215.206.132 0 .215-.116.215-.206l.105-2.592-.105-3.444c0-.086-.083-.206-.215-.206m1.074.023c-.136 0-.226.124-.228.212l-.084 3.393.084 2.575c.002.092.092.212.228.212.134 0 .226-.12.228-.212l.094-2.575-.094-3.393c-.002-.088-.094-.212-.228-.212m1.126.057c-.146 0-.234.13-.234.218l-.073 3.336.073 2.558c0 .092.088.218.234.218.144 0 .234-.126.234-.218l.08-2.558-.08-3.336c0-.088-.09-.218-.234-.218m1.178-.012c-.15 0-.242.134-.242.223l-.063 3.348.063 2.546c0 .094.092.223.242.223.148 0 .242-.129.243-.223l.07-2.546-.07-3.348c-.001-.089-.095-.223-.243-.223m1.222-.08c-.156 0-.249.14-.25.228l-.055 3.428.055 2.531c.001.094.094.228.25.228.154 0 .249-.134.25-.228l.06-2.531-.06-3.428c-.001-.088-.096-.228-.25-.228m1.268.065c-.16 0-.257.143-.257.233l-.047 3.363.047 2.517c0 .094.097.233.257.233.158 0 .257-.139.257-.233l.053-2.517-.053-3.363c0-.09-.099-.233-.257-.233m3.694 1.27c-.533 0-1.04.102-1.505.286a5.016 5.016 0 0 0-5.044-4.69c-.398 0-.789.05-1.169.148-.142.037-.18.076-.18.15v9.23c0 .078.06.146.14.156h7.758a3.2 3.2 0 0 0 3.2-3.2 3.2 3.2 0 0 0-3.2-3.08z"/>
  </svg>
);
const BandcampIconSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5z"/>
  </svg>
);
const ThreadsIconSmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.779-.963-1.416-1.8-1.828a7.874 7.874 0 0 1-.345 2.861c-.477 1.26-1.282 2.131-2.328 2.524-.96.361-2.07.37-3.114.026-1.263-.416-2.27-1.29-2.752-2.391-.39-.89-.425-1.89-.098-2.81.537-1.503 1.867-2.443 3.516-2.513.948-.04 1.852.16 2.623.571.155-.834.108-1.614-.152-2.297-.417-1.1-1.34-1.755-2.633-1.86a5.236 5.236 0 0 0-.462-.02c-1.326.014-2.473.481-3.227 1.312l-1.5-1.37C8.063 4.86 9.73 4.193 11.627 4.164c.204-.003.41.003.613.017 1.989.16 3.528 1.15 4.227 2.725.496 1.117.557 2.429.172 3.748.66.35 1.225.806 1.662 1.356 1.056 1.328 1.33 3.083.77 4.932-.67 2.21-2.45 3.804-5.012 4.485a10.1 10.1 0 0 1-1.873.257zm.7-7.166c-.64.026-1.189.3-1.46.716-.222.338-.257.755-.098 1.15.274.683.918 1.2 1.66 1.445.585.194 1.183.188 1.68.003.5-.187.91-.586 1.148-1.217.204-.543.255-1.178.155-1.822-.698-.375-1.434-.36-2.085-.275-.356.041-.7.001-1 0z"/>
  </svg>
);

const SOCIAL_ICON_OPTIONS = [
  { name: "Instagram", icon: <Instagram className="w-3.5 h-3.5" /> },
  { name: "TikTok", icon: <TikTokIconSmall /> },
  { name: "Patreon", icon: <PatreonIconSmall /> },
  { name: "YouTube", icon: <Youtube className="w-3.5 h-3.5" /> },
  { name: "Twitter/X", icon: <Twitter className="w-3.5 h-3.5" /> },
  { name: "Spotify", icon: <SpotifyIconSmall /> },
  { name: "SoundCloud", icon: <SoundCloudIconSmall /> },
  { name: "Bandcamp", icon: <BandcampIconSmall /> },
  { name: "Threads", icon: <ThreadsIconSmall /> },
  { name: "Website", icon: <Globe className="w-3.5 h-3.5" /> },
  { name: "Other", icon: <ExternalLink className="w-3.5 h-3.5" /> },
];

const getSocialIcon = (name: string) => {
  const match = SOCIAL_ICON_OPTIONS.find(o => o.name.toLowerCase() === name.toLowerCase());
  return match?.icon || <ExternalLink className="w-3.5 h-3.5" />;
};

// ─── Social Icon Picker ──────────────────────────────────────────
const SocialIconPicker = ({ value, onChange }: { value: string; onChange: (name: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-2 bg-white/5 border border-white/20 text-white hover:border-white/50 transition-colors min-w-[120px]"
      >
        {getSocialIcon(value)}
        <span className="text-xs flex-1 text-left truncate">{value || "Select"}</span>
        <ChevronDown size={10} className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-[#1a1a1a] border border-white/20 w-48 max-h-60 overflow-y-auto shadow-xl">
          {SOCIAL_ICON_OPTIONS.map((opt) => (
            <button
              key={opt.name}
              type="button"
              onClick={() => { onChange(opt.name); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left hover:bg-white/10 transition-colors ${value.toLowerCase() === opt.name.toLowerCase() ? "bg-white/10 text-white" : "text-white/70"}`}
            >
              {opt.icon}
              {opt.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Links Editor ────────────────────────────────────────────────
const LinksEditor = ({
  label,
  links,
  onChange,
  isSocial = false,
}: {
  label: string;
  links: { name: string; href: string }[];
  onChange: (links: { name: string; href: string }[]) => void;
  isSocial?: boolean;
}) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-3">
      <label className="text-[9px] tracking-widest-custom text-white/50">{label.toUpperCase()}</label>
      <button
        onClick={() => onChange([...links, { name: isSocial ? "Instagram" : "", href: "" }])}
        className="flex items-center gap-1 px-2 py-1 text-[10px] tracking-widest-custom border border-white/20 hover:bg-white/10 transition-colors"
      >
        <Plus size={10} /> ADD
      </button>
    </div>
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2 items-center">
          {isSocial ? (
            <SocialIconPicker
              value={link.name}
              onChange={(name) => {
                const updated = [...links];
                updated[i] = { ...updated[i], name };
                onChange(updated);
              }}
            />
          ) : (
            <input
              type="text"
              value={link.name}
              onChange={(e) => {
                const updated = [...links];
                updated[i] = { ...updated[i], name: e.target.value };
                onChange(updated);
              }}
              placeholder="Label"
              className="w-32 bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
            />
          )}
          <input
            type="text"
            value={link.href}
            onChange={(e) => {
              const updated = [...links];
              updated[i] = { ...updated[i], href: e.target.value };
              onChange(updated);
            }}
            placeholder="URL"
            className="flex-1 bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
          />
          <button
            onClick={() => onChange(links.filter((_, j) => j !== i))}
            className="p-2 text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-colors"
            title="Remove"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      {links.length === 0 && <p className="text-white/30 text-xs">No links yet. Click ADD to create one.</p>}
    </div>
  </div>
);

// ─── Reusable Components ─────────────────────────────────────────
const TabPanel = ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── Pink Slider ─────────────────────────────────────────────────
const hexToHsl = (hex: string): [number, number, number] => {
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
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const hslToHex = (h: number, s: number, l: number): string => {
  const sn = s / 100, ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const SinglePinkSlider = ({
  label,
  previewText,
  value,
  onChange,
  editableText,
  onTextChange,
}: {
  label: string;
  previewText: string;
  value: string;
  onChange: (hex: string) => void;
  editableText?: boolean;
  onTextChange?: (text: string) => void;
}) => {
  const [h, s, l] = hexToHsl(value);
  const [hexInput, setHexInput] = useState(value.toUpperCase());

  // Sync hexInput when value changes externally (e.g. from slider)
  useEffect(() => {
    setHexInput(value.toUpperCase());
  }, [value]);

  const handleLightnessChange = (newL: number) => {
    onChange(hslToHex(h || 318, s || 52, newL));
  };

  const handleHexInput = (raw: string) => {
    setHexInput(raw.toUpperCase());
    const cleaned = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned)) {
      onChange(cleaned);
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-[#1a1a1a] rounded p-4 mb-3">
        <h3 className="font-display text-3xl tracking-tighter-custom" style={{ color: value }}>
          {previewText}
        </h3>
      </div>
      {editableText && onTextChange && (
        <div className="mb-3">
          <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">TEXT</label>
          <input
            type="text"
            value={previewText}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      )}
      <label className="block text-[9px] tracking-widest-custom text-white/50 mb-2">
        {label} — {l}%
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={50}
          max={95}
          value={l}
          onChange={(e) => handleLightnessChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${hslToHex(318, 52, 50)}, ${hslToHex(318, 68, 95)})`,
          }}
        />
        <label className="relative w-8 h-8 rounded border border-white/20 flex-shrink-0 cursor-pointer overflow-hidden">
          <div className="w-full h-full" style={{ backgroundColor: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexInput(e.target.value)}
          className="w-24 bg-white/5 border border-white/20 text-white px-2 py-1 text-xs font-mono text-center focus:outline-none focus:border-white/50 transition-colors"
          placeholder="#E8A0CC"
        />
      </div>
    </div>
  );
};

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-display text-lg tracking-tighter-custom mb-6 ${className}`}>{children}</h2>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="mb-4">
    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">
      {label.toUpperCase()}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
    />
  </div>
);

const TextArea = ({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <div className="mb-4">
    <label className="block text-[9px] tracking-widest-custom text-white/50 mb-1.5">
      {label.toUpperCase()}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-white/5 border border-white/20 text-white px-3 py-2 text-sm leading-relaxed focus:outline-none focus:border-white/50 transition-colors resize-y"
    />
  </div>
);

// ─── Page Wrapper ────────────────────────────────────────────────
const Manage = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("sd_admin") === "true");

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <AdminDashboard />;
};

export default Manage;
