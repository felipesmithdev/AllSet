const jiraService = require('../services/jiraService');

exports.listarChamados = async (req, res) => {
  const { lote, periodo } = req.query;
  const dias = parseInt(periodo);
  const chamados = await jiraService.buscarChamados(lote, dias);
  res.json(chamados);
};

exports.obterKPIs = async (req, res) => {
  const { lote, periodo } = req.query;
  const dias = parseInt(periodo);
  const kpis = await jiraService.calcularKPIs(lote, dias);
  res.json(kpis);
};

exports.gerarGrafico = async (req, res) => {
  const { lote, periodo } = req.query;
  const dias = parseInt(periodo);
  const grafico = await jiraService.gerarDadosGrafico(lote, dias);
  res.json(grafico);
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
