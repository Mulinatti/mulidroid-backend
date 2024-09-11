import fastify from "fastify";

const app = fastify();

app.get("/ajudantes", () => {
  return "Ajudantes"
})

app.listen({
  port: 4040
})
.then(() => {
  console.log("Server Running at PORT 4040")
});