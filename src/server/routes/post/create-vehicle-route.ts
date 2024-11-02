import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createVehicle } from "../../../services/post/create-vehicle";

export const createVehicleRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/vehicle",
    {
      schema: {
        body: z.object({
          plate: z.string(),
          model: z.string(),
        }),
      },
    },
    async (request) => {
      await createVehicle(request.body);
    }
  );
};
