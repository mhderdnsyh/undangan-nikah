import { db } from "../db";
import { guests } from "../db/schema";
import { eq } from "drizzle-orm";

export interface CreateGuestInput {
  name: string;
}

export async function getAllGuests() {
  return await db.select().from(guests);
}

export async function getGuestBySlug(slug: string) {
  const result = await db.select().from(guests).where(eq(guests.slug, slug)).limit(1);
  return result[0] || null;
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
