/* 
 Aqui é feita referência do arquivo de model do Endereço, para podermos usar os métodos que acessam o banco de dados
*/
var enderecoModel = require("../models/enderecoModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo login.html (note o nome após o ".body")
    var logradouro = req.body.logradouro;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;
    var fk_agencia_endereco = req.body.fk_agencia_endereco;

    console.log(req.body)
 
    // Faça as validações dos valores
    if (logradouro == undefined || bairro == undefined || cidade == undefined || uf == undefined || fk_agencia_endereco == undefined) {
        // Caso algum valor vier como indefinido, devolvo a requisição sem efetuá-la
        res.status(400).send("Alguma informação veio como undefined!")
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        enderecoModel.cadastrar(logradouro, bairro, cidade, uf, fk_agencia_endereco)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de endereços! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}