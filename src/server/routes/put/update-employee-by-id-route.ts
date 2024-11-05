import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { updateEmployeeById } from "../../../services/put/update-employee-by-id";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";

export const updateEmployeesByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/employee/:employeeId",
    {
      schema: {
        body: z.object({
          name: z.string().min(1).optional(),
          alias: z.string().min(1).optional(),
          driver: z.boolean().default(false).optional(),
          phoneNumber: z.string().min(1).optional(),
        }),
        params: z.object({
          employeeId: z.string(),
        }),
      },
    },
    async ({ body, params }) => {
      const employeeExists = await getEmployeeById(params.employeeId);

      if (employeeExists.id) {
        await updateEmployeeById(body, params.employeeId);
        return "Employee updated";
      }

      throw new Error("Employee not found")
    }
  );
};
