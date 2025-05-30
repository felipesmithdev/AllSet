var express = require("express");
var router = express.Router();

var regressaoController = require("../controllers/regressaoController");

router.get("/selecionarMeses", function(req, res) {
    regressaoController.selecionarMeses(req, res);
})

router.get("/mediaDiariaCPU/:mes", function(req, res) {
    regressaoController.mediaDiariaCPU(req, res);
});

router.get("/mediaDiariaRAM/:mes", function(req, res) {
    regressaoController.mediaDiariaRAM(req, res);
});

module.exports = router;