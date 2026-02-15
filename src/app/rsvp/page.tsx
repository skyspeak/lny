"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { eventConfig } from "@/lib/config";
import Carousel from "@/components/Carousel";
import WaveDivider from "@/components/WaveDivider";
import LocationBanner from "@/components/LocationBanner";
import CastleGateOpening from "@/components/CastleGateOpening";
import AddToCalendar from "@/components/AddToCalendar";
import confetti from "canvas-confetti";

function RSVPContent() {
  const [showContent, setShowContent] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [adultsCount, setAdultsCount] = useState(1);
  const [kidsCount, setKidsCount] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Max counts for adults and children
  const MAX_ADULTS = 2;
  const MAX_KIDS = 2;

  // Trigger confetti when confirmation page shows
  useEffect(() => {
    if (submitted && showContent && isAttending) {
      // Fire confetti multiple times for a celebration effect
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Launch from two sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [submitted, showContent, isAttending]);

  const handleSubmit = async () => {
    if (!guestName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (isAttending === null) {
      setError("Please let us know if you're attending");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName.trim(),
          isAttending,
          adultsCount: isAttending ? adultsCount : 0,
          kidsCount: isAttending ? kidsCount : 0,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit RSVP");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Thank you / confirmation view
  if (submitted) {
    return (
      <>
        <CastleGateOpening 
          guestName={guestName}
          onComplete={() => setShowContent(true)}
        />
        
        {showContent && (
          <main className="min-h-screen flex items-center justify-center px-4 py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-soft border border-imperial-red/30 text-center">
                <div className="text-5xl md:text-6xl mb-4 animate-float">
                  {isAttending ? "🐴" : "🧧"}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-imperial-red mb-3">
                  {isAttending ? "恭喜！See you there!" : "We'll miss you!"}
                </h3>
                {isAttending ? (
                  <>
                    <p className="text-charcoal/60 mb-2 text-sm md:text-base">
                      <span className="font-semibold">{guestName}</span> - You're coming with{" "}
                      <span className="font-semibold text-imperial-red">{adultsCount}</span>{" "}
                      {adultsCount === 1 ? "adult" : "adults"}
                      {kidsCount > 0 && (
                        <>
                          {" "}and{" "}
                          <span className="font-semibold text-golden">{kidsCount}</span>{" "}
                          {kidsCount === 1 ? "kid" : "kids"}
                        </>
                      )}
                      .
                    </p>
                    {message && (
                      <p className="text-charcoal/50 text-sm italic mt-3 mb-4 px-4">
                        &quot;{message}&quot;
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-charcoal/60 text-sm md:text-base mb-2">
                      Thanks for letting us know, <span className="font-semibold">{guestName}</span>.
                    </p>
                    {message && (
                      <p className="text-charcoal/50 text-sm italic mt-3 mb-4 px-4">
                        &quot;{message}&quot;
                      </p>
                    )}
                  </>
                )}
                
                {/* Add to Calendar button - only show if attending */}
                {isAttending && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-6"
                  >
                    <AddToCalendar />
                  </motion.div>
                )}

                <div className="mt-6">
                  <a
                    href="/"
                    className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-imperial-red to-golden text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    回到庆典页面 Back to Celebration
                  </a>
                </div>
              </div>
            </motion.div>
          </main>
        )}
      </>
    );
  }

  return (
    <>
      <CastleGateOpening 
        guestName="Guest"
        onComplete={() => setShowContent(true)}
      />

      {showContent && (
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="relative pt-12 md:pt-16 pb-4 md:pb-6 px-4 text-center overflow-hidden">
            {/* Decorative floating elements */}
            <div className="hidden sm:block absolute top-20 left-[10%] text-3xl md:text-4xl opacity-30 animate-float select-none pointer-events-none">
              🏮
            </div>
            <div className="hidden sm:block absolute top-32 right-[12%] text-2xl md:text-3xl opacity-25 animate-float-delay select-none pointer-events-none">
              🐴
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-imperial-red/80 mb-2 md:mb-3 font-medium">
                诚挚邀请 You&apos;re Invited
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-shimmer mb-3 md:mb-4 px-4">
                {eventConfig.partyName}
              </h1>
              <p className="text-charcoal/50 text-sm md:text-base mt-2 px-4 whitespace-pre-line">
                {eventConfig.tagline}
              </p>
            </motion.div>
          </section>

          {/* Location Banner */}
          <section className="py-4 md:py-6 px-4">
            <LocationBanner />
          </section>

          {/* RSVP Form */}
          <section className="py-6 md:py-8 px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-4 md:mb-6"
            >
              RSVP
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-lg mx-auto"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-soft border border-imperial-red/20">
                <h3 className="font-serif text-2xl md:text-3xl text-imperial-red text-center mb-6">
                  能否赏光出席？Will you be joining us?
                </h3>

                {/* Name Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-imperial-red/20 bg-white/50 px-4 py-3 text-sm md:text-base text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-imperial-red/30 focus:border-imperial-red/40 transition-all touch-manipulation"
                  />
                </div>

                {/* Going / Not Going toggle */}
                <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
                  <button
                    onClick={() => setIsAttending(true)}
                    className={`flex-1 py-3 md:py-4 px-2 md:px-4 rounded-2xl font-medium text-sm md:text-base transition-all duration-300 ${
                      isAttending === true
                        ? "bg-imperial-red text-white shadow-md scale-[1.02] ring-2 ring-imperial-red/30"
                        : "bg-imperial-red/10 text-imperial-red hover:bg-imperial-red/20 active:scale-95"
                    }`}
                  >
                    <span className="hidden sm:inline">🐴 恭喜！We&apos;ll be there!</span>
                    <span className="sm:hidden">🐴 Yes!</span>
                  </button>
                  <button
                    onClick={() => setIsAttending(false)}
                    className={`flex-1 py-3 md:py-4 px-2 md:px-4 rounded-2xl font-medium text-sm md:text-base transition-all duration-300 ${
                      isAttending === false
                        ? "bg-charcoal text-white shadow-md scale-[1.02] ring-2 ring-charcoal/30"
                        : "bg-charcoal/10 text-charcoal hover:bg-charcoal/20 active:scale-95"
                    }`}
                  >
                    <span className="hidden sm:inline">Can&apos;t make it</span>
                    <span className="sm:hidden">No</span>
                  </button>
                </div>

                {/* Count fields (only if attending) */}
                {isAttending === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Adults
                        </label>
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-imperial-red/10 text-imperial-red hover:bg-imperial-red/20 active:scale-90 flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation"
                          >
                            −
                          </button>
                          <span className="text-2xl md:text-3xl font-semibold text-charcoal w-6 md:w-8 text-center">
                            {adultsCount}
                          </span>
                          <button
                            onClick={() => setAdultsCount(Math.min(MAX_ADULTS, adultsCount + 1))}
                            disabled={adultsCount >= MAX_ADULTS}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation ${
                              adultsCount >= MAX_ADULTS
                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                : "bg-imperial-red/10 text-imperial-red hover:bg-imperial-red/20 active:scale-90"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal/70 mb-2">
                          Kids
                        </label>
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-golden/10 text-lucky-gold hover:bg-golden/20 active:scale-90 flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation"
                          >
                            −
                          </button>
                          <span className="text-2xl md:text-3xl font-semibold text-charcoal w-6 md:w-8 text-center">
                            {kidsCount}
                          </span>
                          <button
                            onClick={() => setKidsCount(Math.min(MAX_KIDS, kidsCount + 1))}
                            disabled={kidsCount >= MAX_KIDS}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all text-lg md:text-xl touch-manipulation ${
                              kidsCount >= MAX_KIDS
                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                : "bg-golden/10 text-lucky-gold hover:bg-golden/20 active:scale-90"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Message field */}
                {isAttending !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">
                      Message (optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any dietary restrictions, special requests, or auspicious wishes..."
                      rows={3}
                      className="w-full rounded-2xl border border-imperial-red/20 bg-white/50 px-4 py-3 text-sm md:text-base text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-imperial-red/30 focus:border-imperial-red/40 transition-all resize-none touch-manipulation"
                    />
                  </motion.div>
                )}

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 px-4 rounded-xl"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 touch-manipulation bg-gradient-to-r from-imperial-red to-golden hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "发送回复 Send RSVP"
                  )}
                </button>
              </div>
            </motion.div>
          </section>

          <WaveDivider />

          {/* Photo Carousel */}
          <section className="py-6 md:py-8 px-4 pb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-serif text-2xl md:text-3xl text-imperial-red text-center mb-4 md:mb-6"
            >
              庆典相册 Celebration Photos
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Carousel photos={eventConfig.photos} />
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-4 md:py-6 text-center px-4">
            <p className="text-charcoal/30 text-xs md:text-sm">
              新年快乐 • Happy Lunar New Year 2026 • 马年大吉 🐴
            </p>
          </footer>
        </main>
      )}
    </>
  );
}

export default function RSVPPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-charcoal/50">Loading...</div>
      </div>
    }>
      <RSVPContent />
    </Suspense>
  );
}
