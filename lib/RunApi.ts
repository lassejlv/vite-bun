import { Hono } from "hono/quick"
import { AddTodo, checkTodos, RemoveTodo } from "./Todos"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { serveStatic } from "hono/bun"



export const RunApi = async () => {

  const app = new Hono()


  app.basePath("/api")
    .get("/todos", async (c) => {
      const { error, data } = await checkTodos()

      if (error) {
        return c.json({ error: true }, 400)
      } else {
        return c.json({ error: false, data })
      }
    })
    .post("/add-todo", zValidator("json", z.object({ task: z.string() })), async (c) => {

      const { task } = c.req.valid("json");

      const { error } = await AddTodo(task)

      if (error) {
        return c.json({ error: true }, 400)
      } else {
        return c.json({ error: false, message: "Added!" })
      }
    })
    .delete("/remove-todo", zValidator("json", z.object({ task: z.string() })), async (c) => {

      const { task } = c.req.valid("json");

      const { error } = await RemoveTodo(task)

      if (error) {
        return c.json({ error: true }, 400)
      } else {
        return c.json({ error: false, message: "Removed!" })
      }
    })


  app.get('*', serveStatic({ root: './frontend/dist' }));
  app.get('*', serveStatic({ path: './frontend/dist/index.html' }));


  console.log('API running on ' + Bun.env.PORT)

  Bun.serve({ port: Bun.env.PORT, fetch: app.fetch })
}
