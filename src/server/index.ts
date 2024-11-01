import fastify from "fastify";
import { getServicesRoute } from "./routes/get-services-route";
import { getEmployeeRoute } from "./routes/get-employees-route";
import { getVehiclesRoute } from "./routes/get-vehicles-route";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEmployeesRoute } from "./routes/create-employee-route";
import { createServiceRoute } from "./routes/create-service-route";
import { createVehicleRoute } from "./routes/create-vehicle-route";
import { getServiceByIdRoute } from "./routes/get-service-by-id-route";
import { getEmployeeByIdRoute } from "./routes/get-employee-by-id-route";
import { env } from "../env";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getEmployeeRoute);
app.register(getServicesRoute);
app.register(getVehiclesRoute);

app.register(getServiceByIdRoute);
app.register(getEmployeeByIdRoute);

app.register(createEmployeesRoute);
app.register(createServiceRoute);
app.register(createVehicleRoute);

app.get("/teste", () => {
  return "API CONECTA";
})

app
  .listen({
    host: "0.0.0.0",
    port: Number.parseInt(env.PORT)
  })
  .then(() => {
    console.log(`Server Running at PORT ${env.PORT}`);
  });
