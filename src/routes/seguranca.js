var express = require("express")
var router = express.Router();

var monitoramentoController = require("../controllers/monitoramentoController");

router.get("/buscar_carros", function (req, res){
    // console.log("rota dos carros, recebendo fk_agencia:", req.query.fk_agencia);
    monitoramentoController.buscar_carros(req, res)
});

router.get("/buscar_alertas", function(req, res) {
    // console.log("rota do alertas, recebendo fk_agencia:", req.query.fk_agencia);
    monitoramentoController.buscar_alertas(req,res)
})

router.get("/dados_tempo_real", function(req, res) {
    // console.log(req.query.fk_agencia);
    // console.log("OS DADOS TAO VINDO MALUCO")
    monitoramentoController.dados_tempo_real(req, res)
})

router.get("/buscar_lotes", function(req, res) {
    // console.log("rota do lote, recebendo fk_agencia:", req.query.fk_agencia);
    monitoramentoController.buscar_lotes(req, res)
})


router.get("/buscarDadosComponentes", function(req, res){
    console.log("Estou aqui na rota mano, meio caminho andado AHAHAHAHAHA estou surtando")
    // console.log(req.query.fk_agencia);
    monitoramentoController.buscarDadosComponentes(req, res)
})

router.get("/trazerCarros", function(req,res) {
    // console.log("Estou trazendo os dados, fk_lote = ", req.query.fk_lote)
    monitoramentoController.trazerCarros(req, res)
})

router.post("/fecharAlerta", function(req, res) {
    console.log("estou na rota", req.query.macadress)
    monitoramentoController.fecharAlerta(req, res)
})

module.exports = router;