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

// -------------------------
// Busca todos os chamados do projeto
// -------------------------
async function fetchChamados() {
    const jql = `project=${JIRA_PROJECT_KEY}`;
    console.log('🔍 Executando JQL:', jql);
    console.log('🌐 URL base:', JIRA_BASE_URL);
    console.log('👤 Email:', JIRA_EMAIL);

    try {
        const response = await axios.get(
            `${JIRA_BASE_URL}/rest/api/3/search`,
            {
                ...auth,
                params: {
                    jql,
                    maxResults: 100,
                    fields: 'summary,status,priority,created,resolutiondate,customfield_10091'
                }
            }
        );

        const chamados = response.data.issues;

        console.log("🔍 Total de chamados encontrados:", chamados.length);

        if (chamados.length > 0) {
            console.log("🧾 Exemplo de chamado completo:", JSON.stringify(chamados[0], null, 2));

            const statusUnicos = [...new Set(chamados.map(c => c.fields.status.name))];
            console.log("📊 Status únicos encontrados:", statusUnicos);

            const prioridadesUnicas = [...new Set(chamados.map(c => c.fields.priority?.name).filter(Boolean))];
            console.log("🎯 Prioridades únicas encontradas:", prioridadesUnicas);
        } else {
            console.log("⚠️ Nenhum chamado encontrado no projeto:", JIRA_PROJECT_KEY);
        }

        return chamados;
    } catch (error) {
        console.error('❌ Erro detalhado ao buscar chamados:');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Data:', error.response?.data);
        console.error('Headers:', error.response?.headers);
        console.error('Message:', error.message);

        throw new Error(`Erro ao buscar chamados: ${error.response?.status} - ${error.response?.statusText || error.message}`);
    }
}

// -------------------------
// Buscar chamados filtrando por lote e período (dias)
// -------------------------
async function buscarChamados(lote, dias) {
    const chamados = await fetchChamados();
    const filtroDias = dayjs().subtract(dias, 'day');

    return chamados
        .filter(issue => {
            const criado = dayjs(issue.fields.created);
            return (!lote || issue.fields.customfield_10091 === lote) && criado.isAfter(filtroDias);
        })
        .sort((a, b) => {
            const prioridades = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return (prioridades[b.fields.priority.name] || 0) - (prioridades[a.fields.priority.name] || 0);
        })
        .map(issue => ({
            id: issue.id,
            lote: issue.fields.customfield_10091,
            descricao: issue.fields.summary,
            data: issue.fields.created,
            resolucao: issue.fields.resolutiondate,
            status: issue.fields.status.name,
            prioridade: issue.fields.priority.name
        }));
}

// -------------------------
// Buscar chamados globais em aberto ordenados por urgência
// -------------------------
async function buscarChamadosGlobais() {
    console.log('🔄 Iniciando busca de chamados globais...');

    const chamados = await fetchChamados();
    console.log('📊 Total de chamados buscados:', chamados.length);

    if (chamados.length > 0) {
        console.log('📋 Exemplo de chamado bruto:', {
            id: chamados[0].id,
            summary: chamados[0].fields.summary,
            status: chamados[0].fields.status.name,
            priority: chamados[0].fields.priority.name,
            customfield_10091: chamados[0].fields.customfield_10091
        });
    }

    const chamadosFiltrados = chamados
        .filter(issue => {
            const status = issue.fields.status.name.toLowerCase();
            console.log(`🔍 Status do chamado ${issue.id}: "${status}"`);

            const statusFechados = [
                'concluído', 'done', 'resolved', 'closed', 'finalizado',
                'resolvido', 'encerrado', 'completo', 'complete'
            ];

            const isAberto = !statusFechados.includes(status);
            console.log(`${isAberto ? '✅' : '❌'} Chamado ${issue.id} está ${isAberto ? 'ABERTO' : 'FECHADO'}`);

            return isAberto;
        })
        .sort((a, b) => {
            const prioridades = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return (prioridades[b.fields.priority?.name] || 0) - (prioridades[a.fields.priority?.name] || 0);
        })
        .map(issue => ({
            id: issue.id,
            lote: issue.fields.customfield_10091 || 'N/A',
            descricao: issue.fields.summary,
            data: issue.fields.created,
            status: issue.fields.status.name
        }));

    console.log('📋 Chamados em aberto após filtro:', chamadosFiltrados.length);

    if (chamadosFiltrados.length > 0) {
        console.log('📄 Exemplo de chamado filtrado:', chamadosFiltrados[0]);
    }

    return chamadosFiltrados;
}

// -------------------------
// Calcular KPIs do projeto (para lote específico)
// -------------------------
async function calcularKPIs(lote, dias) {
    const chamados = await buscarChamados(lote, dias);
    const agora = dayjs();
    let totalAbertos = 0;
    let resolvidosUltimas24h = 0;
    let tempoTotalResolucao = 0;
    let totalResolvidos = 0;

    chamados.forEach(c => {
        const status = c.status?.toLowerCase();
        const resolvidoEm = c.resolucao ? dayjs(c.resolucao) : null;
        const criadoEm = dayjs(c.data);

        if (!['concluído', 'done', 'resolved', 'closed'].includes(status)) {
            totalAbertos++;
        }

        if (['concluído', 'done', 'resolved', 'closed'].includes(status) && resolvidoEm) {

            if (agora.diff(resolvidoEm, 'hour') <= 24) {
                resolvidosUltimas24h++;
            }

            tempoTotalResolucao += resolvidoEm.diff(criadoEm, 'hour');
            totalResolvidos++;
        }
    });

    const tempoMedioHoras = totalResolvidos > 0
        ? parseFloat((tempoTotalResolucao / totalResolvidos).toFixed(1))
        : 0;

    return {
        totalAbertos,
        totalFinalizados: totalResolvidos,
        finalizadosUltimas24h: resolvidosUltimas24h,
        tempoMedioResolucao: `${tempoMedioHoras}h`
    };
}

// -------------------------
// Calcular KPIs globais (todos os lotes)
// -------------------------
async function calcularKPIsGlobais() {
    const chamados = await fetchChamados();
    const agora = dayjs();
    const lotesContagem = new Map();
    let totalAbertos = 0;
    let resolvidosUltimas24h = 0;
    let tempoTotalResolucao = 0;
    let totalResolvidos = 0;

    chamados.forEach(issue => {
        const loteAtual = issue.fields.customfield_10091 || 'Não definido';
        const status = issue.fields.status.name.toLowerCase();
        const resolvidoEm = issue.fields.resolutiondate ? dayjs(issue.fields.resolutiondate) : null;
        const criadoEm = dayjs(issue.fields.created);

        if (!['concluído', 'done', 'resolved', 'closed'].includes(status)) {
            lotesContagem.set(loteAtual, (lotesContagem.get(loteAtual) || 0) + 1);
            totalAbertos++;
        }

        if (['concluído', 'done', 'resolved', 'closed'].includes(status) && resolvidoEm) {
            if (agora.diff(resolvidoEm, 'hour') <= 24) {
                resolvidosUltimas24h++;
            }

            tempoTotalResolucao += resolvidoEm.diff(criadoEm, 'hour');
            totalResolvidos++;
        }
    });

    const tempoMedioHoras = totalResolvidos > 0
        ? parseFloat((tempoTotalResolucao / totalResolvidos).toFixed(1))
        : 0;

    const loteComMais = [...lotesContagem.entries()]
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
        loteComMais,
        totalAbertos,
        totalFinalizados: totalResolvidos,
        finalizadosUltimas24h: resolvidosUltimas24h,
        tempoMedioResolucao: `${tempoMedioHoras}h`
    };
}

// -------------------------
// Gerar dados para gráfico de linha por dias
// -------------------------
async function gerarDadosGrafico(lote, dias) {
    const chamados = await buscarChamados(lote, dias);
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
}

// -------------------------
// Listar lotes distintos (customfield_10091)
// -------------------------
async function listarLotes() {
    const jql = `project = ${JIRA_PROJECT_KEY} ORDER BY created DESC`;
    try {
        const res = await axios.get(
            `${JIRA_BASE_URL}/rest/api/3/search`,
            {
                ...auth,
                params: {
                    jql,
                    fields: ['customfield_10091'],
                    maxResults: 100
                }
            }
        );

        const lotes = new Set();
        res.data.issues.forEach(issue => {
            const lote = issue.fields.customfield_10091;
            if (lote) lotes.add(lote);
        });

        return Array.from(lotes).sort();
    } catch (error) {
        console.error('Erro ao listar lotes:', error.response?.data || error.message);
        throw new Error('Erro ao listar lotes');
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