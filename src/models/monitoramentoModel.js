var database = require("../database/config");

function buscar_carros(){
    var instrucaoSql = 'SELECT COUNT(id_carro) FROM carro'

    return database.executar(instrucaoSql);
}

function buscar_alertas(){
    var instrucaoSql = 'SELECT COUNT(id_alerta) FROM alerta'

    return database.executar(instrucaoSql)
}

function dados_tempo_real(){
    var instrucaoSql = `
    SELECT 
    DATE_FORMAT(NOW(), '%H:%i') AS horario,
    (SELECT COUNT(*) FROM alerta WHERE gravidade = 'medio') AS alertas_medios,
    (SELECT COUNT(*) FROM alerta WHERE gravidade = 'grave') AS alertas_graves,
    (SELECT COUNT(*) FROM carro c WHERE NOT EXISTS (SELECT 1 FROM alerta a WHERE a.fk_carro_macadress = c.macadress)) AS carros_sem_alertas
`;
    return database.executar(instrucaoSql)
}

module.exports = {
    buscar_carros,
    buscar_alertas,
    dados_tempo_real
};