"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/lib/config";
import Carousel from "@/components/Carousel";
import EventDetails from "@/components/EventDetails";
import GuestList from "@/components/GuestList";
import WaveDivider from "@/components/WaveDivider";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-6 md:pb-8 px-4 text-center overflow-hidden">
        {/* Decorative floating elements - hidden on small mobile */}
        <div className="hidden sm:block absolute top-20 left-[10%] text-3xl md:text-4xl opacity-30 animate-float select-none pointer-events-none">
          🏮
        </div>
        <div className="hidden sm:block absolute top-32 right-[12%] text-2xl md:text-3xl opacity-25 animate-float-delay select-none pointer-events-none">
          🐴
        </div>
        <div className="hidden md:block absolute bottom-20 left-[20%] text-2xl opacity-20 animate-float-delay select-none pointer-events-none">
          🧧
        </div>
        <div className="hidden md:block absolute bottom-10 right-[18%] text-2xl opacity-20 animate-float select-none pointer-events-none">
          🎆
        </div>

        {/* Party name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-imperial-red/80 mb-2 md:mb-3 font-medium">
            诚挚邀请 You&apos;re Invited
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-shimmer mb-3 md:mb-4 px-4">
            {eventConfig.partyName}
          </h1>
          <p className="text-charcoal/60 text-base md:text-lg lg:text-xl max-w-xl mx-auto px-4 whitespace-pre-line">
            {eventConfig.tagline}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <a
              href="/rsvp"
              className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-imperial-red to-golden text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
            >
              立即回复 RSVP Now
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Photo Carousel */}
      <section className="py-6 md:py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Carousel photos={eventConfig.photos} />
        </motion.div>
      </section>

      <WaveDivider />

      {/* Event Details */}
      <section className="py-10 md:py-12 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-serif text-3xl md:text-4xl text-imperial-red text-center mb-6 md:mb-8"
        >
          活动详情 Event Details
        </motion.h2>
        <EventDetails />
      </section>

      <WaveDivider flip />

      {/* Guest List */}
      <section className="py-10 md:py-12 px-4 pb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl text-imperial-red text-center mb-6 md:mb-8"
        >
          来宾名单 Guest List
        </motion.h2>
        <GuestList />
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 text-center px-4">
        <p className="text-charcoal/30 text-xs md:text-sm">
          新年快乐 • Happy Lunar New Year 2026 • 马年大吉 🐴
        </p>
      </footer>
    </main>
  );
}
