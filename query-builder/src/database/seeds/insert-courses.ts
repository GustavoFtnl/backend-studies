import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("courses").insert([
        {name: "HTML"},
        {name: "JavaScript"},
        {name: "TypeScript"},
        {name: "Git"},
        {name: "GitHub"},
        {name: "Express.js"},
        {name: "Node.js"},
        {name: "Banco de Dados"},
        {name: "Query Builder"},
        {name: "Culinary"},
    ]);
};
