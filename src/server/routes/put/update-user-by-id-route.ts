import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { updateUserById } from "../../../services/put/update-user-by-id";
import { getUserById } from "../../../services/get/get-user-by-id";

export const updateUserByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/user/:employeeId",
    {
      schema: {
        body: z.object({
          username: z.string().min(6).optional(),
          password: z.string().min(4).optional(),
        }),
        params: z.object({
          employeeId: z.string(),
        }),
      },
    },
    async ({ body, params }) => {
      const userExists = await getUserById(params.employeeId);

      if (userExists) {
        await updateUserById(body, params.employeeId);
        return "User updated";
      }

      throw new Error("User not found");
    }
  );
};
