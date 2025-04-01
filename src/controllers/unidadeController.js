var unidadeModel = require("../models/unidadeModel");

function listar(req, res) {
    unidadeModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) { 
    var cep = req.body.cep;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var fk_empresa = req.body.fk_empresa;

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    }else if (fk_empresa == undefined) {
        res.status(400).send("Seu empresa está undefined!");
    }else{
        unidadeModel.cadastrar(cep, numero, complemento, fk_empresa).then((resultado) => {
                res.status(200).json(resultado);
                res.status(200).send("Unidade criada com sucesso");
              }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })        
    }
    
}

module.exports = {
    listar,
    cadastrar
}