import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { loginUser } from "../../../services/login/login-user"

export const loginUserRoute: FastifyPluginAsyncZod = async app => {
	app.post(
		"/user",
		{
			schema: {
				body: z.object({
					username: z.string(),
					password: z.string(),
				}),
			},
		},
		async request => {
			const user = await loginUser(request.body)
			return user
		}
	)
}
