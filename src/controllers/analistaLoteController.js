var analisaLoteModel = require("../models/analistaLoteModel")

function calcularKpi2(req, res) {
    const { lote, periodo } = req.query;

    analisaLoteModel.calcularKpi2(lote, periodo).then(function (resultado) {
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
    const { lote, periodo } = req.query;

    analisaLoteModel.calcularKpi3(lote, periodo).then(function (resultado) {
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

function plotarGrafico1(req, res) {
    const { categoria, lote, periodo, componente } = req.query;

    analisaLoteModel.plotarGrafico1(categoria, lote, periodo, componente).then(function (resultado) {
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

function plotarGrafico2(req, res) {
    const { categoria2, lote, periodo, componente2 } = req.query;

    analisaLoteModel.plotarGrafico2(categoria2, lote, periodo, componente2).then(function (resultado) {
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
    calcularKpi3,
    plotarGrafico1,
    plotarGrafico2
};