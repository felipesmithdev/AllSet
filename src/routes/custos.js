var express = require("express");
var router = express.Router();

var custosController = require("../controllers/s3CustosController");

router.get("/infra", custosController.buscarTodosJsonsDeCustos);

module.exports = router;
