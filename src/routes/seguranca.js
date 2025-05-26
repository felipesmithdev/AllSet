var express = require("express")
var router = express.Router();

var monitoramentoController = require("../controllers/monitoramentoController");

router.get("/buscar_carros", function (req, res){
    console.log("TO NA ROTA PORRA")
    monitoramentoController.buscar_carros(req, res)
});

router.get("/buscar_alertas", function(req, res) {
    console.log("OS ALERTA VAO VIR PAPAI")
    monitoramentoController.buscar_alertas(req,res)
})

router.get("/dados_tempo_real", function(req, res) {
    console.log("OS DADOS TAO VINDO MALUCO")
    monitoramentoController.dados_tempo_real(req, res)
})


module.exports = router;