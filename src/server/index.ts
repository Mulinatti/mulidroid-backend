import fastify from "fastify";
import { getEmployees } from "../services/get-employees";

const app = fastify();

app.get("/employees", async () => {
  const result = await getEmployees();
  return result;
});

app
  .listen({
    port: 4040,
  })
  .then(() => {
    console.log("Server Running at PORT 4040");
  });
