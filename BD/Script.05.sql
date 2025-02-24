CREATE DATABASE IF NOT EXISTS Allset;

USE Allset;

CREATE TABLE IF NOT EXISTS Empresa(
idEmpresa INT PRIMARY KEY auto_increment,
nome varchar(45),
CNPJ char(14)
);

CREATE TABLE IF NOT EXISTS Funcionario(
idFunc INT,
fkEmpresa INT NOT NULL,
nome VARCHAR(45),
email VARCHAR(255),
senha VARCHAR(255),
PRIMARY KEY (idFunc, fkEmpresa),
CONSTRAINT nomeNum CHECK (nome NOT LIKE '%[^0-9]%')
);

