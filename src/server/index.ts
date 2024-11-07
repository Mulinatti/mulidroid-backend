import fastify from "fastify"
import { getServicesRoute } from "./routes/get/get-services-route"
import { getEmployeeRoute } from "./routes/get/get-employees-route"
import { getVehiclesRoute } from "./routes/get/get-vehicles-route"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { createEmployeesRoute } from "./routes/post/create-employee-route"
import { createServiceRoute } from "./routes/post/create-service-route"
import { createVehicleRoute } from "./routes/post/create-vehicle-route"
import { getServiceByIdRoute } from "./routes/get/get-service-by-id-route"
import { getEmployeeByIdRoute } from "./routes/get/get-employee-by-id-route"
import { env } from "../env"
import { deleteEmployeeByIdRoute } from "./routes/delete/delete-employee-by-id-route"
import { deleteServiceByIdRoute } from "./routes/delete/delete-service-by-id-route"
import { deleteVehicleByIdRoute } from "./routes/delete/delete-vehicle-by-id-route"
import { updateEmployeesByIdRoute } from "./routes/put/update-employee-by-id-route"
import { updateServiceByIdRoute } from "./routes/put/update-service-by-id-route"
import { updateUserByIdRoute } from "./routes/put/update-user-by-id-route"
import { loginUserRoute } from "./routes/login/login-user-route"
import { employeeServicePaymentRoute } from "./routes/post/employee-service-payment"
import { getServicesByEmployeeIdRoute } from "./routes/get/get-services-by-employee-id"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getEmployeeRoute)
app.register(getServicesRoute)
app.register(getVehiclesRoute)

app.register(getServiceByIdRoute)
app.register(getEmployeeByIdRoute)
app.register(getServicesByEmployeeIdRoute)

app.register(createEmployeesRoute)
app.register(createServiceRoute)
app.register(createVehicleRoute)

app.register(deleteEmployeeByIdRoute)
app.register(deleteServiceByIdRoute)
app.register(deleteVehicleByIdRoute)

app.register(updateEmployeesByIdRoute)
app.register(updateServiceByIdRoute)
app.register(updateUserByIdRoute)

app.register(loginUserRoute)

app.register(employeeServicePaymentRoute)

app
	.listen({
		host: "0.0.0.0",
		port: Number.parseInt(env.PORT),
	})
	.then(() => {
		console.log(`Server Running at PORT ${env.PORT}`)
	})
