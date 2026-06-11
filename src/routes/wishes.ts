import { Elysia, t } from "elysia";
import { db } from "../db";
import { wishes } from "../db/schema";
import { desc } from "drizzle-orm";

export const wishesRoutes = new Elysia({ prefix: "/api" })
  .get("/wishes", async ({ set }) => {
    try {
      const data = await db.select().from(wishes).orderBy(desc(wishes.createdAt));
      return {
        success: true,
        data,
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to retrieve wishes",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .post("/wishes", async ({ body, set }) => {
    try {
      const { senderName, message } = body;

      await db.insert(wishes).values({
        senderName,
        message,
      });

      return {
        success: true,
        message: "Wish successfully submitted",
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to submit wish",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, {
    body: t.Object({
      senderName: t.String({ minLength: 1 }),
      message: t.String({ minLength: 1 }),
    })
  });
