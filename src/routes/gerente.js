var express = require("express")
var router = express.Router();


var gerenteController = require("../controllers/gerenteController");

router.get("/lotesMaisOcorrencias", function (req, res){
    console.log("rota dos lotes com mais ocorrencias")
    gerenteController.lotesMaisOcorrencia(req, res)
})

router.get("/lotesMaisOcorrencias7", function (req, res){
    console.log("rota dos lotes com mais ocorrencias")
    gerenteController.lotesMaisOcorrencia(req, res)
})

router.get("/lotesMaisOcorrencias15", function (req, res){
    console.log("rota dos lotes com mais ocorrencias")
    gerenteController.lotesMaisOcorrencia(req, res)
})

router.get("/lotesMaisOcorrencias30", function (req, res){
    console.log("rota dos lotes com mais ocorrencias")
    gerenteController.lotesMaisOcorrencia(req, res)
})


module.exports = router