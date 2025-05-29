var express = require("express")
var router = express.Router();


var gerenteController = require("../controllers/gerenteController");

router.post("/lotesMaisOcorrencias", function (req, res) {
    gerenteController.lotesMaisOcorrencia(req, res);
});



module.exports = router