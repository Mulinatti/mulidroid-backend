import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createEmployee } from "../../../services/post/create-employee";
import { sendInfoToUserEmail } from "../../../utils/send-info-to-user-email";

export const createEmployeesRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/employee",
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          birthdate: z.string().min(1),
          alias: z.string().min(1),
          driver: z.boolean().default(false),
          username: z.string().min(1),
          email: z.string().email().min(1),
          phoneNumber: z.string().min(1),
        }),
      },
    },
    async (request) => {
      await createEmployee(request.body);
    }
  );
};
