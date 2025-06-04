const { buscarArquivo } = require("../services/s3Service");

async function buscarDadosPorMes(req, res) {
  const { mes } = req.params;
  console.log("Mês recebido:", mes);

  try {
    const dadosChuva = await buscarArquivo("client-allset", `dadosExternos/chuva/${mes}.json`);
    const dadosTrafego = await buscarArquivo("client-allset", `dadosExternos/trafego/${mes}.json`);

    console.log("Dados chuva:", dadosChuva);
    console.log("Dados tráfego:", dadosTrafego);

    res.status(200).json({
      chuva: JSON.parse(dadosChuva),
      trafego: JSON.parse(dadosTrafego),
    });
  } catch (err) {
    console.error("Erro ao buscar dados do mês:", err);
    res.status(500).json({ erro: "Erro ao buscar dados do mês", detalhe: err.message });
  }
}

module.exports = { buscarDadosPorMes };
