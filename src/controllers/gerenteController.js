var gerenteModel = require('../models/gerenteModel');

function lotesMaisOcorrencia(req, res) {
    let { idAgencia, dias } = req.body;

    if (!idAgencia) {
        return res.status(400).json({ erro: "idAgencia é obrigatório" });
    }

    gerenteModel.lotesMaisOcorrencia(idAgencia, dias)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            console.error("Erro ao listar lotes com mais ocorrências", err);
            res.status(500).json({ erro: "Erro ao buscar dados" });
        });
}



module.exports = {
    lotesMaisOcorrencia
};