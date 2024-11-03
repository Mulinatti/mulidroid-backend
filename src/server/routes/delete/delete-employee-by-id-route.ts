import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { FastifyRequest } from "fastify";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";
import { deleteEmployeeById } from "../../../services/delete/delete-employee-by-id";

type EmployeeIdRequest = FastifyRequest<{
  Params: {
    employeeId: string;
  };
}>;

export const deleteEmployeeByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete("/employee/:employeeId", async ({ params }: EmployeeIdRequest) => {
    const employeeExists = await getEmployeeById(params.employeeId);

    if (employeeExists.id) {
      deleteEmployeeById(params.employeeId);
      return "Employee Deleted";
    }

    return "Employee not found";
  });
};
