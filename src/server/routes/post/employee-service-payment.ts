import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { employeeServicePayment } from "../../../services/post/employee-service-payment";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";
import { getServiceById } from "../../../services/get/get-service-by-id";

export const employeeServicePaymentRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.post(
    "/payment/:serviceId/:employeeId",
    {
      schema: {
        params: z.object({
          serviceId: z.string(),
          employeeId: z.string(),
        }),
      },
    },
    async ({ params }) => {
      const employeeExists = await getEmployeeById(params.employeeId);
      const serviceExists = await getServiceById(params.serviceId);

      if (!employeeExists.id) {
        throw new Error("Employee not found");
      }

      if (!serviceExists.id) {
        throw new Error("Service not found");
      }

      await employeeServicePayment(params.serviceId, params.employeeId);
      return "Payment sucess";
    }
  );
};
