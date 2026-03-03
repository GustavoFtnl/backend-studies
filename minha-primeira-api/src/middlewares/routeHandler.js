import { Database } from "../database.js";
import { routes } from "../routes.js";
import { extractQueryParams } from "../utils/extract-query-params.js";

const database = new Database()

export function routeHandler(req, res) {
  //criamos a rota buscando-a no arquivo de rotas, a rota que bater com o método e url da requisição será a capturada
  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url);
  });
  
  //se a rota existir, seu controller será retornado e executado
  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    
    return route.controller({req, res, database});
  }

  //se a rota não existir, retornará que não foi encontrada
  return res.writeHead(404).end("Pagina não encontrada.");
}
