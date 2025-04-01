var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var nome = req.body.nome;
  var cnpj = req.body.cnpj;
  var dt_cadastro = req.body.dt_cadastro;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Nome da empresa está undefined!");
    }else{
        empresaModel.cadastrar(nome, cnpj, dt_cadastro).then((resultado) => {
                res.status(200).json(resultado);
                res.status(200).send("Empresa cadastrada com sucesso");
              }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })        
    }
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
