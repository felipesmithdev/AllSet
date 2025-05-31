var analisaLoteModel = require("../models/analistaLoteModel")

function calcularKpi2(req, res) {
    analisaLoteModel.calcularKpi2().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o valor da segunda kpi: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function calcularKpi3(req, res) {
    analisaLoteModel.calcularKpi3().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o valor da segunda kpi: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    calcularKpi2,
    calcularKpi3
};