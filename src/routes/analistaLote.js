var express = require("express");
var router = express.Router();

var analistaLoteController = require("../controllers/analistaLoteController");

router.get("/calcularKpi2", function(req, res) {
    analistaLoteController.calcularKpi2(req, res);
}); 

module.exports = router;

