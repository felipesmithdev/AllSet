var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.login;
    var senha = req.body.senha;
  
    if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
    } else {
      usuarioModel
        .autenticar(email, senha)
        .then(function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
  
          if (resultadoAutenticar.length == 1) {
            res.status(200).json(resultadoAutenticar);
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o login! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
  }

function listar(req, res) {
    usuarioModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var email = req.body.email;
    var senha = req.body.senha;
    var nivel_permissao = req.body.nivel_permissao;
    var ativo = req.body.ativo;
    var fk_agencia = req.body.fk_agencia

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    }else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }else if (fk_agencia == undefined) {
        res.status(400).send("Sua fkUnidade está undefined!");
    }else{
        usuarioModel.cadastrar(nome, cpf, email, senha, nivel_permissao, ativo, fk_agencia).then((resultado) => {
                res.status(200).json(resultado);
                res.status(200).send("Usuario cadastrado com sucesso");
              }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })        
    }
}

module.exports = {
    listar,
    cadastrar,
    autenticar
}