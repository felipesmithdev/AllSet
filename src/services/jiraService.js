const axios = require('axios');
const dayjs = require('dayjs');

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const auth = {
    username: JIRA_EMAIL,
    password: JIRA_TOKEN
};

const fetchChamados = async () => {
    const jql = `project=${JIRA_PROJECT_KEY}`;
    const response = await axios.get(`${JIRA_BASE_URL}/rest/api/3/search`, {
        params: {
            jql,
            maxResults: 100,
            fields: 'summary,status,priority,created,resolutiondate,customfield_10058'
        },
        auth
    });

    return response.data.issues;
};

exports.buscarChamados = async (lote, dias) => {
    const chamados = await fetchChamados();
    const filtroDias = dayjs().subtract(dias, 'day');

    return chamados
        .filter(issue => {
            const criado = dayjs(issue.fields.created);
            return (!lote || issue.fields.customfield_10058 === lote) && criado.isAfter(filtroDias);
        })
        .sort((a, b) => {
            const prioridades = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return prioridades[b.fields.priority.name] - prioridades[a.fields.priority.name];
        })
        .map(issue => ({
            id: issue.id,
            lote: issue.fields.customfield_10058,
            descricao: issue.fields.summary,
            data: issue.fields.created,
            resolucao: issue.fields.resolutiondate,
            status: issue.fields.status.name,
            prioridade: issue.fields.priority.name
        }));
};

exports.calcularKPIs = async (lote, dias) => {
    const chamados = await exports.buscarChamados(lote, dias);
    const agora = dayjs();
    let loteMaisChamados = {};
    let totalAbertos = 0;
    let resolvidosUltimas24h = 0;
    let tempoTotalResolucao = 0;
    let resolvidos = 0;

    chamados.forEach(c => {
        const loteChamado = c.lote;
        loteMaisChamados[loteChamado] = (loteMaisChamados[loteChamado] || 0) + 1;

        if (c.status !== 'Done') totalAbertos++;

        if (c.status === 'Done' && c.resolucao) {
            const resolucao = dayjs(c.resolucao);
            if (agora.diff(resolucao, 'hour') <= 24) {
                resolvidosUltimas24h++;
            }

            const criado = dayjs(c.data);
            tempoTotalResolucao += resolucao.diff(criado, 'hour');
            resolvidos++;
        }
    });

    const tempoMedioHoras = resolvidos ? (tempoTotalResolucao / resolvidos).toFixed(1) : 0;
    const loteComMais = Object.entries(loteMaisChamados).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
        loteComMais,
        totalAbertos,
        resolvidosUltimas24h,
        tempoMedioHoras
    };
};

exports.gerarDadosGrafico = async (lote, dias) => {
    const chamados = await exports.buscarChamados(lote, dias);
    const diasArray = [];

    for (let i = dias - 1; i >= 0; i--) {
        const dia = dayjs().subtract(i, 'day').format('DD/MM');
        diasArray.push(dia);
    }

    const dadosPorDia = diasArray.map(dia => {
        const count = chamados.filter(c => dayjs(c.data).format('DD/MM') === dia).length;
        return count;
    });

    return {
        labels: diasArray,
        data: dadosPorDia
    };
};


const axios = require('axios');
const { authJira, baseUrl } = require('../config/jiraConfig'); // Exemplo

async function listarLotes() {
    const jql = `project = AL ORDER BY created DESC`;
    const res = await axios.get(`${baseUrl}/rest/api/3/search`, {
        headers: authJira,
        params: {
            jql,
            fields: ['customfield_10049'], // substitua pelo campo real de "lote"
            maxResults: 100
        }
    });

    const lotes = new Set();
    res.data.issues.forEach(issue => {
        const lote = issue.fields.customfield_10049; // ajuste aqui
        if (lote) lotes.add(lote);
    });

    return Array.from(lotes);
}

module.exports = {
    listarLotes,
};
