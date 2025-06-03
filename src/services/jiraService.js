const axios = require('axios');
const dayjs = require('dayjs');
require('dotenv').config();

const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_TOKEN, JIRA_PROJECT_KEY = 'AL' } = process.env;

const auth = {
    auth: {
        username: JIRA_EMAIL,
        password: JIRA_TOKEN,
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

async function fetchChamados() {
    const jql = `project=${JIRA_PROJECT_KEY} ORDER BY created DESC`;
    let allIssues = [];
    let startAt = 0;
    const maxResultsPerPage = 100;
    let totalIssues;
    let fetchedCount = 0;


    do {
        try {
            const response = await axios.get(
                `${JIRA_BASE_URL}/rest/api/3/search`,
                {
                    ...auth,
                    params: {
                        jql,
                        startAt,
                        maxResults: maxResultsPerPage,
                        fields: 'summary,status,priority,created,resolutiondate,customfield_10091'
                    }
                }
            );

            const issues = response.data.issues;
            if (issues && issues.length > 0) {
                allIssues = allIssues.concat(issues);
                fetchedCount += issues.length;
            }
            totalIssues = response.data.total;
            startAt += maxResultsPerPage;

            if (issues && issues.length === 0 && fetchedCount < totalIssues) {

            }
            if (!issues || issues.length < maxResultsPerPage) {
                break;
            }


        } catch (error) {
            console.error('❌ Erro detalhado ao buscar chamados (pagina atual):', error.response?.data || error.message);
            throw new Error(`Erro ao buscar chamados na paginação: ${error.response?.status} - ${error.response?.statusText || error.message}`);
        }
    } while (fetchedCount < totalIssues);

    return allIssues;
}

async function buscarChamados(lote, dias) {
    const todosChamados = await fetchChamados();
    const filtroDias = dayjs().subtract(dias, 'day').startOf('day');

    return todosChamados
        .filter(issue => {
            const criado = dayjs(issue.fields.created);
            const matchLote = !lote || issue.fields.customfield_10091 === lote;
            const matchPeriodo = criado.isAfter(filtroDias) || criado.isSame(filtroDias, 'day');
            return matchLote && matchPeriodo;
        })
        .sort((a, b) => {
            const prioridades = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return (prioridades[b.fields.priority?.name] || 0) - (prioridades[a.fields.priority?.name] || 0);
        })
        .map(issue => ({
            id: issue.key,
            lote: issue.fields.customfield_10091,
            descricao: issue.fields.summary,
            data: issue.fields.created,
            resolucao: issue.fields.resolutiondate,
            status: issue.fields.status.name,
            prioridade: issue.fields.priority?.name
        }));
}

async function calcularKPIs(lote, dias) {
    const chamadosFiltrados = await buscarChamados(lote, dias);
    let totalAbertos = 0;
    let tempoTotalResolucaoHoras = 0;
    let totalResolvidosNoPeriodo = 0;

    const statusFechados = ['concluído', 'done', 'resolved', 'closed', 'finalizado', 'resolvido', 'encerrado', 'completo', 'complete'];
    const dataLimiteFiltro = dayjs().subtract(dias, 'day').startOf('day');

    chamadosFiltrados.forEach(c => {
        const status = c.status?.toLowerCase();
        const resolvidoEm = c.resolucao ? dayjs(c.resolucao) : null;
        const criadoEm = dayjs(c.data);

        if (!statusFechados.includes(status)) {
            totalAbertos++;
        }

        if (statusFechados.includes(status) && resolvidoEm) {
            if (resolvidoEm.isAfter(dataLimiteFiltro) || resolvidoEm.isSame(dataLimiteFiltro, 'day')) {
                tempoTotalResolucaoHoras += resolvidoEm.diff(criadoEm, 'hour', true);
                totalResolvidosNoPeriodo++;
            }
        }
    });

    const tempoMedioHoras = totalResolvidosNoPeriodo > 0
        ? parseFloat((tempoTotalResolucaoHoras / totalResolvidosNoPeriodo).toFixed(1))
        : 0;

    return {
        totalAbertos: totalAbertos,
        totalFinalizados: totalResolvidosNoPeriodo,
        tempoMedioResolucaoFiltrado: `${tempoMedioHoras}h`
    };
}

async function calcularKPIsGlobais() {
    const chamados = await fetchChamados();
    const agora = dayjs();
    const lotesContagem = new Map();
    let totalAbertos = 0;
    let resolvidosUltimas24h = 0;
    let tempoTotalResolucao = 0;
    let totalResolvidosGeral = 0;
    const statusFechados = ['concluído', 'done', 'resolved', 'closed', 'finalizado', 'resolvido', 'encerrado', 'completo', 'complete'];

    chamados.forEach(issue => {
        const loteAtual = issue.fields.customfield_10091 || 'Não definido';
        const status = issue.fields.status.name.toLowerCase();
        const resolvidoEm = issue.fields.resolutiondate ? dayjs(issue.fields.resolutiondate) : null;
        const criadoEm = dayjs(issue.fields.created);

        if (!statusFechados.includes(status)) {
            lotesContagem.set(loteAtual, (lotesContagem.get(loteAtual) || 0) + 1);
            totalAbertos++;
        }

        if (statusFechados.includes(status) && resolvidoEm) {
            if (agora.diff(resolvidoEm, 'hour') <= 24) {
                resolvidosUltimas24h++;
            }
            tempoTotalResolucao += resolvidoEm.diff(criadoEm, 'hour', true);
            totalResolvidosGeral++;
        }
    });

    const tempoMedioHorasGeral = totalResolvidosGeral > 0
        ? parseFloat((tempoTotalResolucao / totalResolvidosGeral).toFixed(1))
        : 0;

    const loteComMais = [...lotesContagem.entries()]
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
        loteComMais,
        totalAbertos,
        finalizadosUltimas24h: resolvidosUltimas24h,
        tempoMedioResolucao: `${tempoMedioHorasGeral}h`
    };
}

async function buscarChamadosGlobais() {
    const todosChamados = await fetchChamados();
    const statusFechados = ['concluído', 'done', 'resolved', 'closed', 'finalizado', 'resolvido', 'encerrado', 'completo', 'complete'];

    const chamadosFiltrados = todosChamados
        .filter(issue => {
            const status = issue.fields.status.name.toLowerCase();
            return !statusFechados.includes(status);
        })
        .sort((a, b) => {
            const prioridades = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return (prioridades[b.fields.priority?.name] || 0) - (prioridades[a.fields.priority?.name] || 0);
        })
        .map(issue => ({
            id: issue.key,
            lote: issue.fields.customfield_10091 || 'N/A',
            descricao: issue.fields.summary,
            data: issue.fields.created,
            status: issue.fields.status.name,
            prioridade: issue.fields.priority?.name || 'Indefinida'
        }));
    return chamadosFiltrados;
}

async function gerarDadosGrafico(lote, dias) {
    const chamadosFiltrados = await buscarChamados(lote, dias);
    const diasArray = [];
    const hoje = dayjs();

    for (let i = dias - 1; i >= 0; i--) {
        const dia = hoje.subtract(i, 'day').format('DD/MM');
        diasArray.push(dia);
    }

    const dadosPorDia = diasArray.map(diaLabel => {
        const count = chamadosFiltrados.filter(c => dayjs(c.data).format('DD/MM') === diaLabel).length;
        return count;
    });

    return {
        labels: diasArray,
        data: dadosPorDia
    };
}

async function listarLotes() {
    try {
        const todosChamados = await fetchChamados();
        const lotes = new Set();

        if (todosChamados && todosChamados.length > 0) {
            todosChamados.forEach(issue => {
                const lote = issue.fields.customfield_10091;
                if (lote) { 
                    lotes.add(lote);
                }
            });
        }
        const lotesArray = Array.from(lotes).sort();
        return lotesArray;

    } catch (error) {
        console.error('Erro ao listar lotes (usando fetchChamados):', error.message);
        return [];
    }
}

module.exports = {
    buscarChamados,
    buscarChamadosGlobais,
    calcularKPIs,
    calcularKPIsGlobais,
    gerarDadosGrafico,
    listarLotes,
    fetchChamados
};
