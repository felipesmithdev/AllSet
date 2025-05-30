var regressaoModel = require("../models/regressaoModel");

function selecionarMeses(req, res) {

    regressaoModel.selecionarMeses()
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((err) => {
            console.error("Erro ao listar os meses", err);
            res.status(500).json({erro: "Erro ao buscar dados"})
        });

}

function mediaDiariaCPU(req, res) {
    let mes = req.params.mes;

    regressaoModel.mediaDiariaCPU(mes)
    .then(resultado => {
        res.status(200).json(resultado);
    })
    .catch(err => {
        console.error("Erro mediaDiariaCPU:", err);
        res.status(500).json({erro: "Erro ao buscar dados"});
    });
}

function mediaDiariaRAM(req, res) {
    let mes = req.params.mes;

    regressaoModel.mediaDiariaRAM(mes)
    .then(resultado => {
        res.status(200).json(resultado);
    })
    .catch(err => {
        console.error("Erro mediaDiariaRAM:", err);
        res.status(500).json({erro: "Erro ao buscar dados"});
    });
}

module.exports = {
    selecionarMeses,
    mediaDiariaCPU,
    mediaDiariaRAM
}