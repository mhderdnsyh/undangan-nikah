import { db } from "../db";
import { rsvps } from "../db/schema";

export interface CreateRsvpInput {
  guestName: string;
  guestId?: number | null;
  status: "hadir" | "tidak_hadir";
  totalGuests?: number;
}

export async function createRsvp(data: CreateRsvpInput) {
  return await db.insert(rsvps).values({
    guestName: data.guestName,
    guestId: data.guestId ?? null,
    status: data.status,
    totalGuests: data.totalGuests ?? 1,
  });
}
