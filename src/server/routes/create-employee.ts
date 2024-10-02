import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createEmployee } from "../../services/post/create-employee";

export const createEmployeesRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/employees",
    {
      schema: {
        body: z.object({
          name: z.string(),
          birthdate: z.string(),
          alias: z.string(),
          driver: z.boolean().default(false),
          username: z.string(),
          phoneNumber: z.string(),
        }),
      },
    },
    async (request) => {
      await createEmployee(request.body);
    }
  );
};
