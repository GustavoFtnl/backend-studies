export async function jsonBodyHandler(req, res) {
  //adiciona os chunks.
  const buffers = [];

  //concatena os chunks na array buffers
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  //converte os chunks concatenados em string, depois em JSON e os armazena no body da requisição
  try {
    //caso haja conteúdo nos chunks, será adicionado ao body da requisição em formato JSON
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    //caso não haja dados, o body fica nulo. Sem dados.
    req.body = null;
  }

  //define o header de resposta como JSON
  res.setHeader("Content-Type", "application/json");
}
