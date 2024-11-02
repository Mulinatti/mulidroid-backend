import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getServiceById } from "../../../services/get/get-service-by-id";
import type { FastifyRequest } from "fastify";

type ServiceIdRequest = FastifyRequest<{
  Params: {
    serviceId: string;
  };
}>;

export const getServiceByIdRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/service/:serviceId", async ({ params }: ServiceIdRequest) => {
    const service = await getServiceById(params.serviceId);
    return service;
  });
};
