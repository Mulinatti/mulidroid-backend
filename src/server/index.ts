import fastify from "fastify";
import { getServicesRoute } from "./routes/get-services";
import { getEmployeesRoute } from "./routes/get-employees";
import { getVehiclesRoute } from "./routes/get-vehicles";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEmployeesRoute } from "./routes/create-employee";
import { createServiceRoute } from "./routes/create-service";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getEmployeesRoute);
app.register(getServicesRoute);
app.register(getVehiclesRoute);
app.register(createEmployeesRoute);
app.register(createServiceRoute);

app
  .listen({
    port: 4040,
  })
  .then(() => {
    console.log("Server Running at PORT 4040");
  });
