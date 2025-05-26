const express = require('express');
const router = express.Router();
const jiraController = require('../controllers/jiraController');

router.get('/listar', jiraController.listarChamados);
router.get('/kpis', jiraController.obterKPIs);
router.get('/grafico', jiraController.gerarGrafico);
router.get('/lotes', jiraController.listarLotes);
router.get('/chamados-globais', jiraController.listarChamadosGlobais);
router.get('/kpis-globais', jiraController.obterKPIsGlobais);


module.exports = router;
