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


exports.obterKPIsGlobais = async (req, res) => {
    try {
        const kpis = await jiraService.calcularKPIsGlobais();
        
        const kpisFormatados = {
            loteComMais: kpis.loteComMais,
            totalAbertos: kpis.totalAbertos,
            finalizadosUltimas24h: kpis.finalizadosUltimas24h, 
            tempoMedioResolucao: kpis.tempoMedioResolucao  
        };
        
        res.json(kpisFormatados);
    } catch (error) {
        console.error('Erro ao obter KPIs globais:', error);
        res.status(500).json({ error: 'Erro ao obter KPIs globais' });
    }
};

exports.listarChamadosGlobais = async (req, res) => {
    try {
        const chamados = await jiraService.buscarChamadosGlobais();
        res.json(chamados);
    } catch (error) {
        console.error('Erro ao listar chamados globais:', error);
        res.status(500).json({ error: 'Erro ao listar chamados' });
    }
};