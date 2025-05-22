const express = require('express');
const router = express.Router();
const jiraController = require('../controllers/jiraController');

router.get('/listar', jiraController.listarChamados);
router.get('/kpis', jiraController.obterKPIs);
router.get('/grafico', jiraController.gerarGrafico);
router.get('/lotes', jiraController.listarLotes);


module.exports = router;
