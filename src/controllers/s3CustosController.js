var { listarArquivosPorPrefixo, buscarArquivo } = require("../services/s3Service");

monitoramento = {};

async function buscarTodosJsonsDeCustos(req, res) {
  try {
    var arquivos = await listarArquivosPorPrefixo("bucket-teste-trusted-captura", "custos/");

    var jsonPromises = arquivos.map(obj =>
      buscarArquivo("bucket-teste-trusted-captura", obj.Key).then(conteudo => JSON.parse(conteudo))
    );

    var todosOsCustos = await Promise.all(jsonPromises);

    res.status(200).json(todosOsCustos);
  } catch (err) {
    console.error("Erro ao buscar arquivos de custos:", err);
    res.status(500).send("Erro ao buscar arquivos de custos");
  }
}

function getUltimoInstanceID(req, res) {
  const ids = Object.keys(monitoramento);
  if (ids.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum INSTANCE_ID registrado ainda" });
  }

  const ultimoId = ids[ids.length - 1];
  return res.status(200).json({ INSTANCE_ID: ultimoId });
}

function capturarDados(req, res){
    const dados = req.body
    
    if(dados.dadosCaptura != undefined){
        
        if(monitoramento[dados.INSTANCE_ID] == undefined){
            monitoramento[dados.INSTANCE_ID] = []
        }

        if(monitoramento[dados.INSTANCE_ID].length == 6){
            monitoramento[dados.INSTANCE_ID].shift()
        }
        
       
        monitoramento[dados.INSTANCE_ID].push(dados)

        return res.status(200).json(monitoramento[dados.INSTANCE_ID])
    }

    return res.status(400).json({ "mensagem": "Dados da captura não encontrados" })
}


function getDados(req, res){
    const INSTANCE_ID = req.params.INSTANCE_ID;

    if (INSTANCE_ID == undefined) {
        return res.status(400).json({ "mensagem": "INSTANCE_ID indefinido" });
    }

    if (monitoramento[INSTANCE_ID] == undefined) {
        return res.status(404).json({ "mensagem": "Dados do INSTANCE_ID não encontrado" });
    }

    console.log("monitoramento", monitoramento);

    let dadosServidor = monitoramento[`${INSTANCE_ID}`];

    return res.status(200).json(dadosServidor);
}

module.exports = { buscarTodosJsonsDeCustos,
  capturarDados,
  getDados,
  getUltimoInstanceID
 };
