import express from "express";

const app = express();

//indicar para o express ler body com json
app.use(express.json());

//mock
const postagens = [
  {
    uuid: 1,
    titulo: "post 1",
    descricao: "eh uma postagem",
    createdAt: new Date(2024 - 5 - 21),
    upadatedAt: new Date(2024 - 5 - 22),
    tipoPostagem: "edital",
    imagem:
      "https://static.wikia.nocookie.net/pokepediabr/images/3/3c/001Bulbassauro.png/revision/latest?cb=20210330173024&path-prefix=pt-br",
  },
  {
    uuid: 2,
    titulo: "post 2",
    descricao: "eh uma postagem",
    createdAt: new Date(2024 - 5 - 21),
    upadatedAt: new Date(2024 - 5 - 22),
    tipoPostagem: "noticia",
    imagem:
      "https://static.wikia.nocookie.net/pokepediabr/images/3/3c/001Bulbassauro.png/revision/latest?cb=20210330173024&path-prefix=pt-br",
  },
  {
    uuid: 3,
    titulo: "post 3",
    descricao: "eh uma postagem",
    createdAt: new Date(2024 - 5 - 21),
    upadatedAt: new Date(2024 - 5 - 22),
    tipoPostagem: "divulgacao",
    imagem:
      "https://static.wikia.nocookie.net/pokepediabr/images/3/3c/001Bulbassauro.png/revision/latest?cb=20210330173024&path-prefix=pt-br",
  },
];

//busca uma postagem por id, retornando um json
function buscarPostagemPorId(id) {
  return postagens.filter((postagem) => postagem.uuid == id);
}

//encontrar o indice de uma postagem na array de postagens pelo ID
function buscaIndexPostagem(id) {
  return postagens.findIndex((postagem) => postagem.uuid == id);
}

//checar se uma URL é válida
function checkUrl(string) {
  try {
    let url = new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

//checar se uma variavel é tipo Date
function isDateValid(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

//criar rota padrão ou raiz
app.get("/", (req, res) => {
  try {
    res.status(200).send("Servidor rodando no endereço http://localhost:3000");
  } catch {
    res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
  }
});

//lista todas as postagens
app.get("/postagens", (req, res) => {
  try {
    res.status(200).send(postagens);
  } catch {
    res.status(500).send("Ocorreu um erro inesperado, tente novamente.");
  }
});

//lista postagem por id
app.get("/postagens/:id", (req, res) => {
  try {
    const idd = parseInt(req.params.id, 10);
    if (isNaN(idd)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const item = postagens.find((item) => item.uuid === idd);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//cria postagem
app.post("/postagens", (req, res) => {
  if (req.body.uuid != undefined && Number.isInteger(req.body.uuid)) {
    if (req.body.titulo != undefined) {
      if (req.body.descricao != undefined) {
        if (
          req.body.createdAt != undefined &&
          isDateValid(req.body.createdAt)
        ) {
          if (
            req.body.upadatedAt != undefined &&
            isDateValid(req.body.upadatedAt)
          ) {
            if (
              req.body.tipoPostagem != undefined &&
              (req.body.tipoPostagem == "divulgacao" ||
                req.body.tipoPostagem == "edital" ||
                req.body.tipoPostagem == "noticia")
            ) {
              if (req.body.imagem != undefined && checkUrl(req.body.imagem)) {
                postagens.push(req.body);
                res.status(201).send("postagem cadastrada com sucesso!");
              } else {
                res.send("A URL da imagem não é válida");
              }
            } else {
              res.send(
                'O tipo da postagem deve ser: "edital", "noticia" ou "divulgacao".'
              );
            }
          } else {
            res.send("updateAt não é válida");
          }
        } else {
          res.send("createdAt não é válida");
        }
      } else {
        res.send("A postagem deve ter uma descrição");
      }
    } else {
      res.send("A postagem deve ter um titulo");
    }
  } else {
    res.send("uuid invalido");
  }
});

//exclui postagem por id
app.delete("/postagens/:id", (req, res) => {
  try {
    const idd = parseInt(req.params.id, 10);
    if (isNaN(idd)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const item = postagens.find((item) => item.uuid === idd);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    let index = buscaIndexPostagem(req.params.id);
    postagens.splice(index, 1);
    res
      .status(200)
      .send("Postagem com id " + req.params.id + " excluida com sucesso!");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//atualiza postagem por id
app.put("/postagens/:id", (req, res) => {
  try {
    let index = buscaIndexPostagem(req.params.id);
    postagens[index].titulo = req.body.titulo;
    postagens[index].imagem = req.body.descricao;
    postagens[index].imagem = req.body.createdAt;
    postagens[index].imagem = req.body.upadatedAt;
    postagens[index].imagem = req.body.tipoPostagem;
    postagens[index].imagem = req.body.imagem;
    res.status(200).json(postagens);
  } catch (e) {
    res.status(500).send("Falha ao atualizar a postagem.");
  }
});

//listar paginado
app.get("/postagens/pagina/:page", (req, res) => {
  try {
    const pagina = req.params.page || 1;
    const limit = 3;

    const indexInicio = (pagina - 1) * limit;

    const postagensPaginadas = postagens.slice(
      indexInicio,
      indexInicio + limit
    );

    res.status(200).json(postagensPaginadas);
  } catch (e) {
    res.status(500).send("Falha ao exibir paginas.");
  }
});

export default app;
