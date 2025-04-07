var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrar2", function (req, res) {
    usuarioController.cadastrar2(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/selecionarFuncionarioDaEmpresa/:fk_agencia", function (req, res) {
    usuarioController.selecionarFuncionarioDaEmpresa(req, res);
});

module.exports = router;