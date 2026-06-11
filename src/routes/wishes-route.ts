import { Elysia, t } from "elysia";
import { getWishes, createWish } from "../services/wishes-services";

export const wishesRoutes = new Elysia({ prefix: "/api" })
  .get("/wishes", async ({ set }) => {
    try {
      const data = await getWishes();
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
      await createWish(body);

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
