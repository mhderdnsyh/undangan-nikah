import { Elysia, t } from "elysia";
import { db } from "../db";
import { rsvps } from "../db/schema";

export const rsvpRoutes = new Elysia({ prefix: "/api" })
  .post("/rsvp", async ({ body, set }) => {
    try {
      const { guestName, guestId, status, totalGuests } = body;

      await db.insert(rsvps).values({
        guestName,
        guestId: guestId ?? null,
        status,
        totalGuests: totalGuests ?? 1,
      });

      return {
        success: true,
        message: "RSVP successfully submitted",
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to submit RSVP",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, {
    body: t.Object({
      guestName: t.String({ minLength: 1 }),
      guestId: t.Optional(t.Nullable(t.Number())),
      status: t.Union([t.Literal("hadir"), t.Literal("tidak_hadir")]),
      totalGuests: t.Optional(t.Number({ minimum: 1 })),
    })
  });
