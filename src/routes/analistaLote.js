var express = require("express");
var router = express.Router();

var analistaLoteController = require("../controllers/analistaLoteController");

router.get("/calcularKpi2", function(req, res) {
    analistaLoteController.calcularKpi2(req, res);
}); 

router.get("/calcularKpi3", function(req, res) {
    analistaLoteController.calcularKpi3(req, res);
}); 

router.get("/plotarGrafico1", function(req, res) {
    analistaLoteController.plotarGrafico1(req, res);
}); 

router.get("/plotarGrafico2", function(req, res) {
    analistaLoteController.plotarGrafico2(req, res);
}); 

router.get("/plotarGrafico3", function(req, res) {
    analistaLoteController.plotarGrafico3(req, res);
}); 

module.exports = router;

