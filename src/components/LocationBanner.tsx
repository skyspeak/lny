"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/lib/config";

export default function LocationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full"
    >
      <div className="bg-gradient-to-r from-imperial-red/10 via-golden/10 to-imperial-red/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-soft border border-golden/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 md:gap-8 text-left">
          {/* Date & Time */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-imperial-red/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-imperial-red"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-charcoal text-sm md:text-base">
                {eventConfig.date}
              </p>
              <p className="text-charcoal/60 text-xs md:text-sm">{eventConfig.time}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-golden/30" />

          {/* Location */}
          <a
            href={eventConfig.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-golden/20 group-hover:bg-golden/30 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-lucky-gold"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-charcoal group-hover:text-golden text-sm md:text-base transition-colors">
                {eventConfig.venueName}
              </p>
              <p className="text-charcoal/60 text-xs md:text-sm">
                {eventConfig.address}
              </p>
            </div>
          </a>

          {/* Map link */}
          {eventConfig.mapUrl && (
            <>
              <div className="hidden md:block w-px h-12 bg-golden/30" />
              <a
                href={eventConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-golden/10 text-lucky-gold hover:bg-golden/20 transition-all text-sm font-medium touch-manipulation"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                Get Directions
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
