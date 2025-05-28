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
            console.error('Deu erro ai parceirinho, faz o L ', err);
            res.status(500).json({ erro: 'Erro ao trazer os dados mano' });
        });
}

function buscar_lotes(req,res) {
    monitoramentoModel.buscar_lotes()
    .then((resultado) => {
        if (Array.isArray(resultado)) {
            res.status(200).json(resultado.map(item => ({
                lote_id: item.id_lote,
                carros: item.total_carro,
                alertas: item.alertas,
                alertas_graves: item.alertas_graves
            })));
        } else {
            res.status(200).json([{
                lote_id: resultado.id_lote,
                carros: resultado.total_carro,
                alertas: resultado.alertas,
                alertas_graves: resultado.alertas_graves
            }])
        }
    })
    .catch(err => {
        console.error("Deu erro ai parceiro, na parte de trazer lote (controller) ", err);
        res.status(500).json({ erro: "Erro ao trazer os lote mano"})
    })
}


module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real,
    buscar_lotes
};