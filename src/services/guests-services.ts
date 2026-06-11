import { db } from "../db";
import { guests } from "../db/schema";

export interface CreateGuestInput {
  name: string;
}

export async function getAllGuests() {
  return await db.select().from(guests);
}

export async function createGuest(data: CreateGuestInput) {
  // Simple slug generation
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await db.insert(guests).values({
    name: data.name,
    slug,
  });

  return { slug };
}
