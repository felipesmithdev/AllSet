const jiraService = require('../services/jiraService');

exports.listarChamados = async (req, res) => {
    try {
        console.log("Chamados sendo listados");
        const { lote, periodo } = req.query;
        const dias = parseInt(periodo) || 7;
        const chamados = await jiraService.buscarChamados(lote, dias);
        res.json(chamados);
    } catch (error) {
        console.error('Erro ao listar chamados:', error);
        res.status(500).json({ error: 'Erro ao listar chamados' });
    }
};

exports.obterKPIs = async (req, res) => {
    try {
        const { lote, periodo } = req.query;
        const dias = parseInt(periodo) || 7;
        const kpis = await jiraService.calcularKPIs(lote, dias);
        res.json(kpis);
    } catch (error) {
        console.error('Erro ao obter KPIs:', error);
        res.status(500).json({ error: 'Erro ao obter KPIs' });
    }
};

exports.gerarGrafico = async (req, res) => {
    try {
        const { lote, periodo } = req.query;
        const dias = parseInt(periodo) || 7;
        const grafico = await jiraService.gerarDadosGrafico(lote, dias);
        res.json(grafico);
    } catch (error) {
        console.error('Erro ao gerar gráfico:', error);
        res.status(500).json({ error: 'Erro ao gerar gráfico' });
    }
};

exports.listarLotes = async (req, res) => {
    try {
        const lotes = await jiraService.listarLotes();
        res.json({ lotes });
    } catch (error) {
        console.error('Erro ao listar lotes do Jira:', error);
        res.status(500).json({ error: 'Erro ao listar lotes' });
    }
};

// CORREÇÃO: KPIs globais sem filtro de lote
exports.obterKPIsGlobais = async (req, res) => {
    try {
        // Para KPIs globais, não passamos lote específico
        const kpis = await jiraService.calcularKPIsGlobais();
        
        // Padronizando os nomes das propriedades conforme esperado pelo frontend
        const kpisFormatados = {
            loteComMais: kpis.loteComMais,
            totalAbertos: kpis.totalAbertos,
            resolvidosUltimas24h: kpis.finalizadosUltimas24h,
            tempoMedioHoras: kpis.tempoMedioResolucao
        };
        
        res.json(kpisFormatados);
    } catch (error) {
        console.error('Erro ao obter KPIs globais:', error);
        res.status(500).json({ error: 'Erro ao obter KPIs globais' });
    }
};

// CORREÇÃO: Chamados globais formatados corretamente
exports.listarChamadosGlobais = async (req, res) => {
    try {
        // Buscar todos os chamados em aberto, ordenados por urgência
        const chamados = await jiraService.buscarChamadosGlobais();
        res.json(chamados);
    } catch (error) {
        console.error('Erro ao listar chamados globais:', error);
        res.status(500).json({ error: 'Erro ao listar chamados' });
    }
};