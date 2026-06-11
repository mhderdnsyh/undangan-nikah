import { Elysia, t } from "elysia";
import { db } from "../db";
import { guests } from "../db/schema";
import { eq } from "drizzle-orm";

export const guestsRoutes = new Elysia({ prefix: "/api" })
  .get("/guests", async ({ set }) => {
    try {
      const data = await db.select().from(guests);
      return {
        success: true,
        data,
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to retrieve guests",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .post("/guests", async ({ body, set }) => {
    try {
      const { name } = body;
      // Simple slug generation
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      await db.insert(guests).values({
        name,
        slug,
      });

      return {
        success: true,
        message: "Guest successfully added",
        slug,
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to add guest",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, {
    body: t.Object({
      name: t.String({ minLength: 1 }),
    })
  });
