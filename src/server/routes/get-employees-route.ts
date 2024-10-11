import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getEmployees } from '../../services/get/get-employees';

export const getEmployeeRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/employee", async () => {
    const employees = await getEmployees();
    return employees;
  });
};