import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getServiceById } from "../../../services/get/get-service-by-id";
import z from "zod";
import { getServicesByEmployeeId } from "../../../services/get/get-services-by-employee-id";

export const getServicesByEmployeeIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/service/employee/:employeeId",
    {
      schema: {
        params: z.object({
          employeeId: z.string(),
        }),
      },
    },
    async ({ params }) => {
      const services = await getServicesByEmployeeId(params.employeeId);
      return services;
    }
  );
};
