import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";
import z from "zod";

export const getEmployeeByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/employee/:employeeId",
    {
      schema: {
        params: z.object({
          employeeId: z.string(),
        }),
      },
    },
    async ({ params }) => {
      const employee = await getEmployeeById(params.employeeId);
      return employee;
    }
  );
};
