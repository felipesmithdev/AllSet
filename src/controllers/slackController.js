var slackModel = require("../models/slackModel");

function solicitarAnalise(req, res) {
    const { dashboardUrl, carroId, marca, componente, gravidade } = req.body;

    // Validação básica dos dados
    if (!carroId) {
        return res.status(400).json({
            success: false,
            error: "macadress do carro é obrigatório"
        });
    }

    // Preparar dados para envio
    const dadosSlack = {
        dashboardUrl: dashboardUrl || req.get('origin') || 'N/A',
        carroId,
        marca: marca || 'N/A',
        componente: componente || 'N/A',
        gravidade: gravidade || 'N/A',
        timestamp: new Date().toLocaleString('pt-BR')
    };

    slackModel.enviarMensagemAnalise(dadosSlack)
        .then(resultado => {
            if (resultado.success) {
                console.log(`[SLACK] Mensagem enviada com sucesso para análise do carro ${carroId}`);
                res.json({
                    success: true,
                    message: "Análise solicitada com sucesso! Equipe notificada via Slack."
                });
            } else {
                console.error(`[SLACK] Erro ao enviar mensagem:`, resultado.error);
                res.status(400).json({
                    success: false,
                    error: resultado.error
                });
            }
        })
        .catch(error => {
            console.error(`[SLACK] Erro interno:`, error);
            res.status(500).json({
                success: false,
                error: "Erro interno do servidor ao solicitar análise"
            });
        });
}

module.exports = {
    solicitarAnalise
}