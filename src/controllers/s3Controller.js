const { buscarArquivo } = require("../services/s3Service");

async function buscarDadosPorMes(req, res) {
  const { mes } = req.params;

  try {
    const dadosChuva = await buscarArquivo("allset-dados-client", `chuva/${mes}.json`);
    const dadosTrafego = await buscarArquivo("allset-dados-client", `trafego/${mes}.json`);

    res.status(200).json({
      chuva: JSON.parse(dadosChuva),
      trafego: JSON.parse(dadosTrafego),
    });
  } catch (err) {
    console.error("Erro ao buscar dados do mês:", err);
    res.status(500).send("Erro ao buscar dados do mês");
  }
}

module.exports = { buscarDadosPorMes };
