import { parseRoutePath } from "./utils/parseRoutePath.js";

export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: ({ req, res, database }) => {
      const products = database.select("products");

      return res.end(JSON.stringify(products));
    },
  },
  {
    method: "POST",
    path: "/products",
    controller: ({ req, res, database }) => {
      const { name, price } = req.body;

      database.insert("products", { name, price });

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: "/products/:id",
    controller: (req, res) => {
      return res.end();
    },
  },
].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
