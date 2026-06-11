import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { rsvpRoutes } from "./routes/rsvp-route";
import { wishesRoutes } from "./routes/wishes-route";
import { guestsRoutes } from "./routes/guests-route";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Undangan Pernikahan API Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .use(rsvpRoutes)
  .use(wishesRoutes)
  .use(guestsRoutes)
  .get("/", () => ({ message: "Welcome to Undangan Pernikahan API" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
