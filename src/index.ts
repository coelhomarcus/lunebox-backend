import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import * as z from "zod";
import { OpenAPI } from "@/lib/auth";
import { betterAuth } from "./macro/betterAuth";
import { testRoutes } from "./routes/test";

const app = new Elysia()
  .use(betterAuth)
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    }),
  )
  .use(testRoutes)
  .listen(3000);

console.log(`🦊 Elysia http://${app.server?.hostname}:${app.server?.port}`);
