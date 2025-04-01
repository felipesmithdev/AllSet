var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(logradouro, bairro, cidade, uf, estado, fk_agencia_endereco) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO endereco (logradouro, bairro, cidade, uf, estado, fk_agencia_endereco) VALUES ('${logradouro}', '${bairro}', '${cidade}', '${uf}', '${estado}', '${fk_agencia_endereco}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};