import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { createService } from "../../../services/post/create-service"

export const createServiceRoute: FastifyPluginAsyncZod = async app => {
	app.post(
		"/service",
		{
			schema: {
				body: z.object({
					address: z.string(),
					neighborhood: z.string(),
					value: z.number().min(1, {
						message: "Insira um valor válido",
					}),
					serviceDate: z.string(),
					vehicle: z.string(),
					employees: z.string().array(),
				}),
			},
		},
		async request => {
			await createService(request.body)
		}
	)
}
