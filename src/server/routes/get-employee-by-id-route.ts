import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { FastifyRequest } from 'fastify';
import { getEmployeeById } from '../../services/get/get-employee-by-id';

type employeeIdRequest = FastifyRequest<{
  Params: {
    employeeId: string;
  }
}>

export const getEmployeeByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/employee/:employeeId", async ({params}: employeeIdRequest) => {
    const employee = await getEmployeeById(params.employeeId);
    return employee;
  });
};