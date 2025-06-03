var express = require("express");
var router = express.Router();

var custosController = require("../controllers/s3CustosController");

router.get("/infra", custosController.buscarTodosJsonsDeCustos);

router.post(`/infra/cadastrar/status`, function(req, res) {
    custosController.capturarDados(req, res)
})

router.get(`/infra/coletar/status/:INSTANCE_ID`, function (req, res) {
    custosController.getDados(req, res)
})
router.get("/infra/ultimo-instance-id", function (req, res) {
  custosController.getUltimoInstanceID(req, res);
});


module.exports = router;
