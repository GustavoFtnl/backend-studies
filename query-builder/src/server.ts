import express, { Request, Response } from "express";
import { knex } from "./database/knex";

const app = express();
app.use(express.json());

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body;

  await knex("courses").insert({ name });

  return response.status(201).json();
});

app.get("/courses", async (request: Request, response: Response) => {
  const courses = await knex("courses").select().orderBy("name", "asc");

  return response.json(courses);
});

app.put("/courses/:id", async (request: Request, response: Response) => {
  const { name } = request.body;
  const { id } = request.params;

  await knex("courses").update({ name }).where({ id });

  return response.json();
});

app.delete("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  await knex("courses").delete().where({ id });

  return response.json();
});

app.post("/modules", async (request: Request, response: Response) => {
  const { name, course_id } = request.body;

  await knex("courses_modules").insert({ name, course_id });

  return response.status(201).json();
});

app.get("/modules", async (request: Request, response: Response) => {
  const modules = await knex("courses_modules").select();

  return response.json(modules);
});

app.get("/courses/modules", async (request: Request, response: Response) => {
  const courses = await knex("courses")
    .select(
      "courses.id AS course_id",
      "courses_modules.id AS module_id",
      "courses_modules.name AS module",
      "courses.name AS course",
    )
    .join("courses_modules", "courses.id", "courses_modules.course_id");

  return response.json(courses);
});

app.listen(3333, () => console.log(`Server is running on port 3333`));
