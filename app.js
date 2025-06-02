var ambiente_processo = 'desenvolvimento';
// var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'desenvolvimento' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });


var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresasRouter = require("./src/routes/empresas");
var unidadesRouter = require("./src/routes/unidades");
var enderecoRouter = require("./src/routes/enderecos");
var segurancaRouter = require("./src/routes/seguranca");
var gerenteRouter = require("./src/routes/gerente");
var jiraRouter = require("./src/routes/chamados");
var regressaoRouter = require("./src/routes/regressao");
var s3Router = require("./src/routes/s3");
var slackRouter = require("./src/routes/slack");
var analistaLoteRouter = require("./src/routes/analistaLote")
var custosRoutes = require("./src/routes/custos");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/unidades", unidadesRouter);
app.use("/enderecos", enderecoRouter);
app.use("/seguranca", segurancaRouter);
app.use("/gerente", gerenteRouter);
app.use("/jira", jiraRouter);
app.use("/regressao", regressaoRouter);
app.use("/s3", s3Router);
app.use("/slack", slackRouter); 
app.use("/analistaLote", analistaLoteRouter)
app.use("/custos", custosRoutes);


app.listen(PORTA_APP, function () {
    console.log(`
     ####     ##      ##          ####   ######  ######  
    ##  ##    ##      ##         ##  ##  ##        ##    
    ##  ##    ##      ##         ##      ##        ##    
    ######    ##      ##          ####   ####      ##    
    ##  ##    ##      ##             ##  ##        ##    
    ##  ##    ##      ##         ##  ##  ##        ##    
    ##  ##    ######  ######      ####   ######    ##    
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
