"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Invitee {
  id: number;
  name: string;
  adultsCount: number;
  kidsCount: number;
  isAttending: boolean | null;
  message: string | null;
}

export default function GuestList() {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    fetch("/api/invitees")
      .then((res) => res.json())
      .then((data) => {
        setInvitees(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setInvitees([]);
        setLoading(false);
      });
  }, []);

  const going = invitees.filter((i) => i.isAttending === true);
  const pending = invitees.filter((i) => i.isAttending === null);

  const totalAdults = going.reduce((sum, i) => sum + i.adultsCount, 0);
  const totalKids = going.reduce((sum, i) => sum + i.kidsCount, 0);

  // Random emoji selector - Year of the Horse theme
  const getRandomEmoji = (id: number) => {
    const emojis = ['🐴', '🐎', '🏇', '🎠'];
    // Use guest ID as seed for consistency across renders
    return emojis[id % emojis.length];
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-imperial-red/30 border-t-imperial-red rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Summary stats */}
      {going.length > 0 && (
        <div className="text-center mb-6 md:mb-8">
          <p className="text-charcoal/70 text-base md:text-lg leading-relaxed px-4">
            <span className="font-semibold text-imperial-red">{totalAdults}</span>{" "}
            {totalAdults === 1 ? "adult" : "adults"} and{" "}
            <span className="font-semibold text-golden">{totalKids}</span>{" "}
            {totalKids === 1 ? "kid" : "kids"} are joining the celebration! 🐴
          </p>
        </div>
      )}

      {/* Going section - Only confirmed guests */}
      {going.length > 0 ? (
        <div className="mb-6 md:mb-8">
          <div className="space-y-2 md:space-y-3">
            {going.map((invitee, index) => (
              <motion.div
                key={invitee.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-soft border border-imperial-red/15"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-charcoal text-sm md:text-base break-words">
                      {invitee.name}
                    </p>
                    <p className="text-charcoal/50 text-xs md:text-sm">
                      {invitee.adultsCount}{" "}
                      {invitee.adultsCount === 1 ? "adult" : "adults"}
                      {invitee.kidsCount > 0 && (
                        <>
                          {" "}
                          &middot; {invitee.kidsCount}{" "}
                          {invitee.kidsCount === 1 ? "kid" : "kids"}
                        </>
                      )}
                    </p>
                  </div>
                  <span className="text-xl md:text-2xl flex-shrink-0" aria-hidden>
                    {getRandomEmoji(invitee.id)}
                  </span>
                </div>
                
                {/* Message with sparkles */}
                {invitee.message && (
                  <div className="mt-3 pt-3 border-t border-golden/10 relative">
                    {/* Sparkle particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-xs pointer-events-none select-none"
                        style={{
                          left: `${15 + i * 20}%`,
                          top: '-8px',
                        }}
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1, 1, 0],
                          y: [0, -10, -15, -20],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeOut",
                        }}
                      >
                        ✨
                      </motion.span>
                    ))}
                    <p className="text-charcoal/60 text-xs md:text-sm italic">
                      &quot;{invitee.message}&quot;
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 px-4 mb-6">
          <div className="text-5xl md:text-6xl mb-4 animate-float">
            🐴🏮
          </div>
          <p className="text-charcoal/60 text-base md:text-lg font-serif italic">
            The celebration awaits its first auspicious guest...
          </p>
        </div>
      )}

      {/* Pending section - Collapsible */}
      {pending.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowPending(!showPending)}
            className="w-full text-left px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-lucky-gold/20 hover:bg-lucky-gold/5 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-lucky-gold" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-lucky-gold">
                等待回复 Awaiting Reply ({pending.length})
              </span>
            </div>
            <motion.svg
              animate={{ rotate: showPending ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 text-lucky-gold/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
          
          <motion.div
            initial={false}
            animate={{
              height: showPending ? "auto" : 0,
              opacity: showPending ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 md:space-y-3 mt-3">
              {pending.map((invitee, index) => (
                <motion.div
                  key={invitee.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/30 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-lucky-gold/10 flex items-center justify-between"
                >
                  <p className="text-charcoal/60 text-sm md:text-base break-words">
                    {invitee.name}
                  </p>
                  <span className="text-xs text-lucky-gold/80 font-medium flex-shrink-0">
                    Pending
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
