import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { FastifyRequest } from "fastify";
import { getEmployeeById } from "../../../services/get/get-employee-by-id";
import { deleteEmployee } from "../../../services/delete/delete-employee";

type employeeIdRequest = FastifyRequest<{
  Params: {
    employeeId: string;
  };
}>;

export const deleteEmployeeByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete("/employee/:employeeId", async ({ params }: employeeIdRequest) => {
    const employeeExists = await getEmployeeById(params.employeeId);

    if (employeeExists) {
      deleteEmployee(params.employeeId);
      return "Employee Deleted";
    }

    return "Employee not found";
  });
};
