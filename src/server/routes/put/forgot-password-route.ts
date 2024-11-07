import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { forgotPassword } from "../../../services/put/forgot-password";

export const forgotPasswordRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/forgotPassword",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          username: z.string().min(6),
          password: z.string().min(4),
        }),
      },
    },
    async ({ body }) => {
      const response = await forgotPassword(body);
      return response;
    }
  );
};
