"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/lib/config";

export default function EventDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-soft border border-imperial-red/20">
        {/* Theme description */}
        <p className="text-charcoal/80 text-center leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
          {eventConfig.themeDescription}
        </p>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Date & Time */}
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-xl md:rounded-2xl bg-imperial-red/15 flex items-center justify-center flex-shrink-0">
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
            <div>
              <h3 className="font-semibold text-imperial-red text-xs md:text-sm uppercase tracking-wide mb-1">
                时间 When
              </h3>
              <p className="text-charcoal/80 text-sm md:text-base">{eventConfig.date}</p>
              <p className="text-charcoal/60 text-xs md:text-sm">{eventConfig.time}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-xl md:rounded-2xl bg-golden/15 flex items-center justify-center flex-shrink-0">
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
            <div>
              <h3 className="font-semibold text-lucky-gold text-xs md:text-sm uppercase tracking-wide mb-1">
                地点 Where
              </h3>
              <p className="text-charcoal/80 text-sm md:text-base">{eventConfig.venueName}</p>
              <p className="text-charcoal/60 text-xs md:text-sm">{eventConfig.address}</p>
              {eventConfig.mapUrl && (
                <a
                  href={eventConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-golden hover:text-golden/80 text-xs md:text-sm underline underline-offset-2 mt-1 inline-block transition-colors touch-manipulation min-h-[44px] flex items-center"
                >
                  查看地图 View on Map
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Additional info */}
        {eventConfig.additionalInfo && (
          <div className="mt-6 md:mt-8 pt-6 border-t border-imperial-red/15">
            <p className="text-charcoal/60 text-xs md:text-sm text-center leading-relaxed">
              {eventConfig.additionalInfo}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
