const { listarArquivosPorPrefixo, buscarArquivo } = require("../services/s3Service");

async function buscarTodosJsonsDeChuva(req, res) {
  try {
    const arquivos = await listarArquivosPorPrefixo("allset-dados-client", "chuva/");

    const jsonPromises = arquivos.map(obj =>
      buscarArquivo("allset-dados-client", obj.Key).then(conteudo => JSON.parse(conteudo))
    );

    const todosOsDados = await Promise.all(jsonPromises);

    res.status(200).json(todosOsDados);
  } catch (err) {
    console.error("Erro ao buscar arquivos de chuva:", err);
    res.status(500).send("Erro ao buscar arquivos de chuva");
  }
}

module.exports = { buscarTodosJsonsDeChuva };
