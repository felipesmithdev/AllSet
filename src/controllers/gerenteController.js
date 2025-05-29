var gerenteModel = require('../models/gerenteModel');

function lotesMaisOcorrencia(req, res){
    let fkAgencia = req.body.idAgencia
    gerenteModel.lotesMaisOcorrencia(fkAgencia)
    .then((resultado) => {
        if(Array.isArray(resultado)){
            res.status(200).json(resultado.map(item => ({
                lote: resultado.lote,
                ocorrencias: resultado.ocorrencias
            })))
        }else{
            res.status(200).json([{
                lote: resultado.lote,
                ocorrencias: resultado.ocorrencias
            }])
        }
    })
    .catch(err => {
        console.error("Erro ao listar lotes com mais ocorrencias (controller)", err);
        res.status(500).json({erro: "erro ao trazer lotes e ocorrencias"})
    });
}


module.exports = {
    lotesMaisOcorrencia
};