const axios = require('axios'); // Trocar fetch por axios
const SLACK_API_URL = 'https://slack.com/api/chat.postMessage';

function verificarConfiguracao() {
    const token = process.env.SLACK_TOKEN;
    const channel = process.env.SLACK_CHANNEL;
    const erros = [];

    if (!token) {
        erros.push('SLACK_TOKEN não configurado no arquivo .env');
    }
    
    if (!channel) {
        erros.push('SLACK_CHANNEL não configurado no arquivo .env');
    }

    return {
        configurado: erros.length === 0,
        erros: erros
    };
}

async function enviarMensagemAnalise(dados) {
    const config = verificarConfiguracao();
    
    if (!config.configurado) {
        return {
            success: false,
            error: `Configuração inválida: ${config.erros.join(', ')}`
        };
    }

    const token = process.env.SLACK_TOKEN;
    const channel = process.env.SLACK_CHANNEL;

    // Determinar cor baseada na gravidade
    const cor = obterCorPorGravidade(dados.gravidade);

    const mensagem = {
        channel: channel,
        text: `Solicitação de Análise - Carro ${dados.carroId}`,
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: `Solicitação de Análise do Carro`
                }
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*Carro ID:*\n${dados.carroId}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*Marca:*\n${dados.marca}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*Componente:*\n${dados.componente}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*Gravidade:*\n${dados.gravidade}`
                    }
                ]
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*Horário:*\n${dados.timestamp}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*Status:*\nRequer atenção imediata`
                    }
                ]
            },
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `<${dados.dashboardUrl}|🔗 Acessar Dashboard de Monitoramento>`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "_Por favor, verifique o sistema o mais breve possível._"
                }
            }
        ],
        attachments: [
            {
                color: cor,
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `Ação Necessária:* Análise técnica solicitada para o carro *${dados.carroId}*`
                        }
                    }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(SLACK_API_URL, mensagem, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;

        if (data.ok) {
            return {
                success: true,
                message: 'Mensagem enviada com sucesso',
                slackResponse: data
            };
        } else {
            return {
                success: false,
                error: `Erro da API do Slack: ${data.error}`
            };
        }
    } catch (error) {
        console.error('Erro detalhado:', error.response?.data || error.message);
        return {
            success: false,
            error: `Erro de conexão: ${error.message}`
        };
    }
}

function obterCorPorGravidade(gravidade) {
    const cores = {
        'HIGH': '#dc3545',      // Vermelho
        'MEDIUM': '#ffc107',    // Amarelo
    };
    return cores[gravidade?.toUpperCase()] || '#6c757d';
}

module.exports = {
    enviarMensagemAnalise,
    obterCorPorGravidade
};