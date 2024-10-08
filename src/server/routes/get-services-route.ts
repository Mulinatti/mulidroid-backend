import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getServices } from '../../services/get/get-services';

export const getServicesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/service", async () => {
    const services = await getServices();
    return services;
  });
};