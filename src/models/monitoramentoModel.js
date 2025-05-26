var database = require("../database/config");

function buscar_carros(){
    var instrucaoSql = 'SELECT COUNT(id_carro) FROM carro'

    return database.executar(instrucaoSql);
}

function buscar_alertas(){
    var instrucaoSql = 'SELECT COUNT(id_alerta) FROM alerta'

    return database.executar(instrucaoSql)
}

module.exports = {
    buscar_carros,
    buscar_alertas
};