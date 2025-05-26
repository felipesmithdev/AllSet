var monitoramentoModel = require('../models/monitoramentoModel');

function buscar_carros(req, res){
    monitoramentoModel.buscar_carros().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscar_alertas(req,res){
    monitoramentoModel.buscar_alertas().then((resultado)=> {
        res.status(200).json(resultado)
    })
}

module.exports = {
    buscar_carros,
    buscar_alertas
};