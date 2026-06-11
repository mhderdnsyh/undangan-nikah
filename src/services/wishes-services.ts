import { db } from "../db";
import { wishes } from "../db/schema";
import { desc } from "drizzle-orm";

export interface CreateWishInput {
  senderName: string;
  message: string;
}

export async function getWishes() {
  return await db.select().from(wishes).orderBy(desc(wishes.createdAt));
}

export async function createWish(data: CreateWishInput) {
  return await db.insert(wishes).values({
    senderName: data.senderName,
    message: data.message,
  });
}
