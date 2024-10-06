import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getVehicles } from "../../services/get/get-vehicles";

export const getVehiclesRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/vehicles", async () => {
    const result = await getVehicles();
    return result;
  });
};