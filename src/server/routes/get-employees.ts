import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getEmployees } from '../../services/get/get-employees';

export const getEmployeesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/employees", async () => {
    const result = await getEmployees();
    return result;
  });
};