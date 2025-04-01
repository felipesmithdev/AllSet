var express = require("express");
var router = express.Router();

// Aqui criamos uma referência à Controller de endereços (já que usamos um método que está nesse arquivo)
var enderecoController = require("../controllers/enderecoController");

//Aqui eu defino que minha rota /cadastrar receberá uma requisição do tipo "POST", que receberá 2 argumentos (req, res) 
// e que redirecionará esses argumentos para a função "cadastrar" da página enderecoController
router.post("/cadastrar", function (req, res) {
    enderecoController.cadastrar(req, res);
})


module.exports = router;