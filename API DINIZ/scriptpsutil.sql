CREATE DATABASE IF NOT EXISTS pythonsim;

USE pythonsim;

CREATE TABLE IF NOT EXISTS dados(
idDado INT auto_increment,
fkCarro	char(7),
bateria varchar(5),
memoriaPercentual varchar(4),
memoriaLivre varchar(10),
memoriaUsada varchar(10),
discoPercentual varchar(12),
discoLivre varchar (12),
discoUsado varchar(12),
cpuPercentual varchar(4),
primary key (idDado, fkCarro)
);

CREATE TABLE  IF NOT EXISTS carros(
idCarro char(7) primary key,
ramTotal varchar(10),
discoTotal varchar(10)
);

