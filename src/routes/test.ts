import { Elysia } from "elysia";
import z from "zod";

export const testRoutes = new Elysia({ name: "users-routes" }).get(
  "/",
  () => {
    return "Hello API!";
  },
  {
    needsAuth: true, //apenas teste de autenticação
    response: {
      200: z.string().describe("Hello Elysia"),
    },
  },
);
