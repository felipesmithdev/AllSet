// var monitoramentoModel = require('../models/instanciaModel');

// monitoramento = {};

// function capturarDados(req, res){
//     const dados = req.body
    
//     if(dados.dadosCaptura != undefined){
        
//         if(monitoramento[dados.INSTANCE_ID] == undefined){
//             monitoramento[dados.INSTANCE_ID] = []
//         }

//         if(monitoramento[dados.INSTANCE_ID].length == 6){
//             monitoramento[dados.INSTANCE_ID].shift()
//         }
        
       
//         monitoramento[dados.INSTANCE_ID].push(dados)

//         return res.status(200).json(monitoramento[dados.INSTANCE_ID])
//     }

//     return res.status(400).json({ "mensagem": "Dados da captura não encontrados" })
// }


// function getDados(req, res){
//     const INSTANCE_ID = req.params.INSTANCE_ID;

//     if (INSTANCE_ID == undefined) {
//         return res.status(400).json({ "mensagem": "INSTANCE_ID indefinido" });
//     }

//     if (monitoramento[INSTANCE_ID] == undefined) {
//         return res.status(404).json({ "mensagem": "Dados do INSTANCE_ID não encontrado" });
//     }

//     console.log("monitoramento", monitoramento);

//     let dadosServidor = monitoramento[`${INSTANCE_ID}`];

//     return res.status(200).json(dadosServidor);
// }

// module.exports = {
//     capturarDados,
//     getDados
// };