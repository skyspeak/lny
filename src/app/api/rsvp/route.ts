import { prisma, ensureSchema } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await ensureSchema();
    const body = await request.json();
    const { name, isAttending, adultsCount, kidsCount, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (typeof isAttending !== "boolean") {
      return NextResponse.json(
        { error: "isAttending must be a boolean" },
        { status: 400 }
      );
    }

    // Check if guest already exists
    const existing = await prisma.invitee.findFirst({
      where: { name: name.trim() },
    });

    let invitee;

    if (existing) {
      invitee = await prisma.invitee.update({
        where: { id: existing.id },
        data: {
          isAttending,
          adultsCount: isAttending ? Math.max(1, adultsCount || 1) : 0,
          kidsCount: isAttending ? Math.max(0, kidsCount || 0) : 0,
          message: message || null,
          respondedAt: new Date(),
        },
      });
    } else {
      invitee = await prisma.invitee.create({
        data: {
          name: name.trim(),
          isAttending,
          adultsCount: isAttending ? Math.max(1, adultsCount || 1) : 0,
          kidsCount: isAttending ? Math.max(0, kidsCount || 0) : 0,
          message: message || null,
          respondedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      invitee: {
        name: invitee.name,
        isAttending: invitee.isAttending,
        adultsCount: invitee.adultsCount,
        kidsCount: invitee.kidsCount,
        message: invitee.message,
      },
    });
  } catch (error) {
    console.error("Failed to submit RSVP:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
