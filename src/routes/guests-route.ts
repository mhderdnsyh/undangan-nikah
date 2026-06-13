import { Elysia, t } from "elysia";
import { getAllGuests, createGuest, getGuestBySlug } from "../services/guests-services";

export const guestsRoutes = new Elysia({ prefix: "/api" })
  .get("/guests", async ({ set }) => {
    try {
      const data = await getAllGuests();
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
  .get("/guests/:slug", async ({ params: { slug }, set }) => {
    try {
      const guest = await getGuestBySlug(slug);
      if (!guest) {
        set.status = 404;
        return {
          success: false,
          message: "Guest not found",
        };
      }
      return {
        success: true,
        data: guest,
      };
    } catch (error) {
      set.status = 500;
      return {
        success: false,
        message: "Failed to retrieve guest",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  })
  .post("/guests", async ({ body, set }) => {
    try {
      const { slug } = await createGuest(body);

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
