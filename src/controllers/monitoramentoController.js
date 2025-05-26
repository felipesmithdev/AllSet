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

function dados_tempo_real(req, res) {
    monitoramentoModel.dados_tempo_real()
        .then((resultado) => {
            if (Array.isArray(resultado)) {
                // Garante que sempre será um array com objetos no formato correto
                res.status(200).json(resultado.map(item => ({
                    horario: item.horario,
                    alertas_medios: item.alertas_medios,
                    alertas_graves: item.alertas_graves,
                    carros_sem_alertas: item.carros_sem_alertas
                })));
            } else {
                // fallback se vier objeto
                res.status(200).json([{
                    horario: resultado.horario,
                    alertas_medios: resultado.alertas_medios,
                    alertas_graves: resultado.alertas_graves,
                    carros_sem_alertas: resultado.carros_sem_alertas
                }]);
            }
        })
        .catch(err => {
            console.error('Erro ao obter dados tempo real:', err);
            res.status(500).json({ erro: 'Erro ao obter dados tempo real' });
        });
}


module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real
};