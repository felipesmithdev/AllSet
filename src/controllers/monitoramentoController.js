var monitoramentoModel = require('../models/monitoramentoModel');

monitoramento = {};

function buscar_carros(req, res){
    const fk_agencia = req.query.fk_agencia
    monitoramentoModel.buscar_carros(fk_agencia).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function buscar_alertas(req,res){
    const fk_agencia = req.query.fk_agencia
    monitoramentoModel.buscar_alertas(fk_agencia).then((resultado)=> {
        res.status(200).json(resultado)
    })
}

function dados_tempo_real(req, res) {
    const fk_agencia = req.query.fk_agencia;

    monitoramentoModel.dados_tempo_real(fk_agencia)
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
    const fk_agencia = req.query.fk_agencia;
    
    console.log("fk_agencia recebida:", fk_agencia);
    monitoramentoModel.buscar_lotes(fk_agencia)
    .then((resultado) => {
        if (Array.isArray(resultado)) {
            res.status(200).json(resultado.map(item => ({
                lote_id: item.id_lote,
                carros: item.total_carro,
                alertas: item.alertas,
                alertas_graves: item.alertas_graves,
                ultimo_alerta: item.ultimo_alerta
            })));
        } else {
            res.status(200).json([{
                lote_id: resultado.id_lote,
                carros: resultado.total_carro,
                alertas: resultado.alertas,
                alertas_graves: resultado.alertas_graves,
                ultimo_alerta: resultado.ultimo_alerta
            }])
        }
    })
    .catch(err => {
        console.error("Deu erro ai parceiro, na parte de trazer lote (controller) ", err);
        res.status(500).json({ erro: "Erro ao trazer os lote mano"})
    })
}
function buscarDadosComponentes(req, res){
    const fk_agencia = req.query.fk_agencia;

    monitoramentoModel.buscarDadosComponentes(fk_agencia)
    .then((resultado) => {
        if (Array.isArray(resultado)) {
            res.status(200).json(resultado.map(item => ({
                cpu_medio: item.cpu_medio,
                cpu_grave: item.cpu_grave,
                ram_medio: item.ram_medio,
                ram_grave: item.ram_grave,
                disco_medio: item.disco_medio,
                disco_grave: item.disco_grave
            })));
        } else {
            res.status(200).json([{
                cpu_medio: resultado.cpu_medio,
                cpu_grave: resultado.cpu_grave,
                ram_medio: resultado.ram_medio,
                ram_grave: resultado.ram_grave,
                disco_medio: resultado.disco_medio,
                disco_grave: resultado.disco_grave
            }])
        }
    })
    .catch(err => {
        console.error("Deu erro ai parceiro, na parte de trazer os componentes (controller) ", err);
        res.status(500).json({ erro: "Erro ao trazer os componentes mano"})
    })
}

// aqui será para a página de carros

function trazerCarros(req, res) {  // 
    const fk_lote = req.query.fk_lote || req.params.fk_lote;      
    monitoramentoModel.trazerCarros(fk_lote)
    .then((resultado) => {
        if(Array.isArray(resultado)){
            res.status(200).json(resultado.map(item => ({
                id_carro: item.macadress,
                marca: item.marca,
                componente: item.componente,
                gravidade: item.gravidade,
                ultimo_alerta: item.ultimo_alerta
            })));   
        } else {
            res.status(200).json([{
                id_carro: resultado.macadress,
                marca: resultado.marca,
                componente: resultado.componente,
                gravidade: resultado.gravidade,
                ultimo_alerta: resultado.ultimo_alerta
            }])
        }
    })
    .catch(err => {
        console.log("Deu erro aqui mano, ao trazer os dados dos carros relacionados ao lote ", err);
        res.status(500).json({ erro: "Erro ao trazer os carros" })
    })
}


function fecharAlerta(req, res) {
    console.log("Estou no controller");

    const macadress = req.query.macadress || req.params.macadress;
    const componente = req.query.componente;
    const gravidade = req.query.gravidade;

    if (!macadress || !componente || !gravidade) {
        return res.status(400).json({ erro: "Parâmetros ausentes: macadress, componente ou gravidade." });
    }

    monitoramentoModel.fecharAlerta(macadress, componente, gravidade)
        .then(() => {
            res.status(200).json({ mensagem: "Alertas fechados com sucesso." });
        })
        .catch(erro => {
            console.error("Erro ao fechar alerta:", erro);
            res.status(500).json({ erro: "Erro ao fechar alerta." });
        });
}

// Controller modificado para manter apenas 6 elementos
function cadastrarDados(req, res){
    const dados = req.body
    
    if(dados.dadosCaptura != undefined){
        // Inicializa o array se não existir
        if(monitoramento[dados.macadress] == undefined){
            monitoramento[dados.macadress] = []
        }

        if(monitoramento[dados.macadress].length == 6){
            monitoramento[dados.macadress].shift()
        }
        
        // Adiciona o novo dado no final
        monitoramento[dados.macadress].push(dados)

        return res.status(200).json(monitoramento[dados.macadress])
    }

    return res.status(400).json({ "mensagem": "Dados da captura não encontrados" })
}

// pegar os dados no front
function getCapturas(req, res){
    const macadress = req.params.macadress;

    if (macadress == undefined) {
        return res.status(400).json({ "mensagem": "macadress indefinido" });
    }

    if (monitoramento[macadress] == undefined) {
        return res.status(404).json({ "mensagem": "Dados do macadress não encontrado" });
    }

    console.log("monitoramento", monitoramento);

    let dadosServidor = monitoramento[`${macadress}`];

    return res.status(200).json(dadosServidor);
}

module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real,
    buscar_lotes,
    buscarDadosComponentes,
    trazerCarros,
    fecharAlerta,
    cadastrarDados,
    getCapturas
};