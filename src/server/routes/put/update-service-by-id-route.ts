import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { updateEmployeeById } from "../../../services/put/update-employee-by-id";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";
import { updateServiceById } from "../../../services/put/update-service-by-id";
import { getServiceById } from "../../../services/get/get-service-by-id";

async function verifyIfAllEmployeesExists(
  employees: string[]
): Promise<boolean> {
  const employeesMatched: string[] = [];

  for (const employee of employees) {
    const employeeExist = await getEmployeeById(employee);
    if (employeeExist.id) {
      employeesMatched.push(employee);
    }
  }

  if (employeesMatched.length < employees.length || employees.length < 1)
    return false;

  return true;
}

export const updateServiceByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/service/:serviceId",
    {
      schema: {
        body: z.object({
          address: z.string().min(1).optional(),
          neighborhood: z.string().min(1).optional(),
          value: z.number().min(1, {
            message: "Insira um valor válido",
          }),
          serviceDate: z.string().optional(),
          vehicle: z.string().min(1).optional(),
          employees: z.string().array().optional(),
        }),
        params: z.object({
          serviceId: z.string(),
        }),
      },
    },
    async ({ body, params}) => {
      const serviceExists = await getServiceById(params.serviceId);

      if (body.employees) {
        if (
          serviceExists.id &&
          (await verifyIfAllEmployeesExists(body.employees))
        ) {
          updateServiceById(body, params.serviceId);
          return "Service updated";
        }

        throw new Error("Service dont exist or employees are incorrect");
      }
    }
  );
};
