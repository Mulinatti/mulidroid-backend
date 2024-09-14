import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getServices } from '../../services/get/get-services';

export const getServicesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/services", async () => {
    const result = await getServices();
    return result;
  });
};