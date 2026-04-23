import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import tourFlyer from "@/assets/coast-to-coast-flyer.png";

const SHOW_TIMES: Record<string, string> = {
  "El Cid": "6 PM",
  "Market Hotel": "7 PM",
};

interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  status: string;
  ticket_link: string | null;
  sort_order: number;
}

const Tour = () => {
  const [tourLive, setTourLive] = useState<boolean | null>(null);
  const [cms, setCms] = useState<Record<string, string>>({});
  const [dates, setDates] = useState<TourDate[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("admin_settings").select("*").eq("id", "tour_live").single(),
      supabase.from("site_content").select("*").in("id", ["tour_title", "tour_coming_soon", "tour_more_dates"]),
      supabase.from("tour_dates").select("*").order("sort_order"),
    ]).then(([settingsRes, cmsRes, datesRes]) => {
      setTourLive(settingsRes.data?.value === "true");
      if (cmsRes.data) {
        const map: Record<string, string> = {};
        cmsRes.data.forEach((r: { id: string; content: string }) => { map[r.id] = r.content; });
        setCms(map);
      }
      if (datesRes.data) setDates(datesRes.data);
    });
  }, []);

  const comingSoon = cms.tour_coming_soon || "COMING SOON";

  if (tourLive === null) return null;

  if (!tourLive) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-massive font-display tracking-tighter-custom mb-8"
          >
            LIVE SHOWS
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-sd-pink animate-pulse" />
            <span className="text-sm tracking-widest-custom text-muted-foreground">{comingSoon}</span>
          </motion.div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero — Debut Show Feature */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 -z-10 opacity-20"
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--sd-pink) / 0.3) 0%, transparent 70%)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 mb-4"
              style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }}
            >
              SADDER DAYS PRESENTS
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground"
              style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontWeight: 200 }}
            >
              LIVE SHOWS
            </h1>
          </motion.div>

          {/* Tour Shows — each with shared flyer */}
          <div className="w-full max-w-md grid gap-20">
            {dates.map((show, idx) => {
              const showTime = SHOW_TIMES[show.venue] || "";
              return (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
                >
                  <a
                    href={show.ticket_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={tourFlyer}
                        alt={`Sadder Days — ${show.city}`}
                        className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <motion.span
                          className="text-white text-sm tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-6 py-3 border border-white/60"
                          style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }}
                        >
                          GET TICKETS <ExternalLink size={14} />
                        </motion.span>
                      </div>
                    </div>
                  </a>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.15 }}
                    className="mt-6 text-center space-y-2"
                  >
                    <p
                      className="text-xs tracking-[0.3em] uppercase text-foreground/60"
                      style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }}
                    >
                      {show.date} · {show.city}
                    </p>
                    <p
                      className="text-[10px] tracking-[0.25em] uppercase text-foreground/40"
                      style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }}
                    >
                      {show.venue}{showTime ? ` · ${showTime}` : ""}
                    </p>
                    {show.ticket_link && (
                      <a
                        href={show.ticket_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-8 py-3 border border-foreground/30 text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                        style={{ fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }}
                      >
                        GET TICKETS
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[9px] tracking-[0.3em] uppercase text-foreground/30 mt-16"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            MORE DATES ANNOUNCED SOON
          </motion.p>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tour;
