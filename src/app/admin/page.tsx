"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { eventConfig } from "@/lib/config";

interface Invitee {
  id: number;
  name: string;
  adultsCount: number;
  kidsCount: number;
  isAttending: boolean | null;
  message: string | null;
  respondedAt: string | null;
}

export default function AdminPage() {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}'s invite?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch("/api/invitees", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete invitee");
      }

      // Remove from local state
      setInvitees((prev) => prev.filter((invitee) => invitee.id !== id));
    } catch (error) {
      console.error("Error deleting invitee:", error);
      alert("Failed to delete invitee. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const going = invitees.filter((i) => i.isAttending === true);
  const notGoing = invitees.filter((i) => i.isAttending === false);
  const pending = invitees.filter((i) => i.isAttending === null);

  const totalAdults = going.reduce((sum, i) => sum + i.adultsCount, 0);
  const totalKids = going.reduce((sum, i) => sum + i.kidsCount, 0);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-imperial-red/30 border-t-imperial-red rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-shimmer mb-2">
            管理后台 Admin Dashboard
          </h1>
          <p className="text-charcoal/60 text-sm md:text-base">
            {eventConfig.partyName}
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-imperial-red/20 text-center">
            <p className="text-3xl md:text-4xl font-bold text-imperial-red mb-1">
              {going.length}
            </p>
            <p className="text-xs md:text-sm text-charcoal/60 uppercase tracking-wide">
              Going
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-charcoal/20 text-center">
            <p className="text-3xl md:text-4xl font-bold text-charcoal mb-1">
              {notGoing.length}
            </p>
            <p className="text-xs md:text-sm text-charcoal/60 uppercase tracking-wide">
              Not Going
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-lucky-gold/20 text-center">
            <p className="text-3xl md:text-4xl font-bold text-lucky-gold mb-1">
              {pending.length}
            </p>
            <p className="text-xs md:text-sm text-charcoal/60 uppercase tracking-wide">
              Pending
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-imperial-red/20 text-center">
            <p className="text-3xl md:text-4xl font-bold text-imperial-red mb-1">
              {totalAdults}
            </p>
            <p className="text-xs md:text-sm text-charcoal/60 uppercase tracking-wide">
              Adults
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-golden/20 text-center">
            <p className="text-3xl md:text-4xl font-bold text-golden mb-1">
              {totalKids}
            </p>
            <p className="text-xs md:text-sm text-charcoal/60 uppercase tracking-wide">
              Kids
            </p>
          </div>
        </motion.div>

        {/* RSVP Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-soft border border-imperial-red/20 overflow-hidden"
        >
          <div className="p-4 md:p-6 border-b border-imperial-red/15">
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-charcoal">
              All RSVPs ({invitees.length})
            </h2>
          </div>

          {invitees.length === 0 ? (
            <div className="p-12 text-center text-charcoal/40">
              <p>No RSVPs yet. Share the link: <span className="font-mono text-sm">/rsvp</span></p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-imperial-red/5 border-b border-imperial-red/10">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                      Adults
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                      Kids
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-charcoal/70 uppercase tracking-wider hidden md:table-cell">
                      Message
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-charcoal/70 uppercase tracking-wider hidden lg:table-cell">
                      Responded
                    </th>
                    <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-imperial-red/10">
                  {invitees.map((invitee, index) => (
                    <motion.tr
                      key={invitee.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-imperial-red/5 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-4 text-sm font-medium text-charcoal">
                        {invitee.name}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center">
                        {invitee.isAttending === null ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-lucky-gold/10 text-lucky-gold">
                            Pending
                          </span>
                        ) : invitee.isAttending ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-imperial-red/10 text-imperial-red">
                            ✓ Going
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-charcoal/10 text-charcoal">
                            ✗ Not Going
                          </span>
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center text-sm text-charcoal/80">
                        {invitee.adultsCount || "-"}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center text-sm text-charcoal/80">
                        {invitee.kidsCount || "-"}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-charcoal/60 hidden md:table-cell max-w-xs">
                        {invitee.message ? (
                          <span className="italic">&quot;{invitee.message}&quot;</span>
                        ) : (
                          <span className="text-charcoal/30">—</span>
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center text-xs text-charcoal/50 hidden lg:table-cell">
                        {invitee.respondedAt
                          ? new Date(invitee.respondedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(invitee.id, invitee.name)}
                          disabled={deletingId === invitee.id}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-crimson/10 text-crimson hover:bg-crimson/20 hover:text-crimson transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete invitee"
                        >
                          {deletingId === invitee.id ? (
                            <div className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
                          ) : (
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-imperial-red/20 text-charcoal hover:bg-imperial-red/10 transition-all font-medium text-sm"
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            View Public Page
          </a>
          <a
            href="/rsvp"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-imperial-red to-golden text-white hover:shadow-lg transition-all font-medium text-sm hover:scale-[1.02]"
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
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            Open RSVP Link
          </a>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-charcoal/30 text-xs md:text-sm">
            管理后台 Admin Dashboard • 新年快乐 • 马年大吉 🐴
          </p>
        </footer>
      </div>
    </main>
  );
}
