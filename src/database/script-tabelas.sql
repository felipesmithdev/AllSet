-- Active: 1732573765546@@127.0.0.1@3306@allset
USE allset;
CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45),
    cnpj VARCHAR(45),
    dtCadastro DATE
);
-- Criação da tabela Unidade
CREATE TABLE Unidade (
    idUnidade INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT,
    nome VARCHAR(45),
    estado VARCHAR(45),
    cidade VARCHAR(45),
    bairro VARCHAR(45),
    contato VARCHAR(45),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Criação da tabela Carro
CREATE TABLE Carro (
    idCarro INT PRIMARY KEY AUTO_INCREMENT,
    fkUnidade INT,
    modelo VARCHAR(45),
    marca VARCHAR(45),
    ano VARCHAR(45),
    identificador VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade)
);

-- Criação da tabela Componente
CREATE TABLE Componente (
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    fkCarro INT,
    nome VARCHAR(45),
    medida VARCHAR(45),
    limiarAlerta DOUBLE,
    FOREIGN KEY (fkCarro) REFERENCES Carro(idCarro)
);

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkUnidade INT,
    nome VARCHAR(45),
    senha VARCHAR(45),
    cpf VARCHAR(45),
    email VARCHAR(45),
    perfil VARCHAR(45),
    ativo TINYINT(1),
    FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade)
);

-- Criação da tabela EventoAlerta
CREATE TABLE EventoAlerta (
    idEventoAlerta INT PRIMARY KEY AUTO_INCREMENT,
    fkComponente INT,
    dataHora VARCHAR(45),
    valor DOUBLE,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

-- Criação da tabela MediaRegistros
CREATE TABLE MediaRegistros (
    idMediaRegistros INT PRIMARY KEY AUTO_INCREMENT,
    fkComponente INT,
    qtdRegistros INT,
    valor DOUBLE,
    unidadeTempo VARCHAR(45),
    tempo VARCHAR(45),
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

INSERT INTO Empresa (idEmpresa, razaoSocial, cnpj, dtCadastro)
VALUES (DEFAULT, 'Empresa Exemplo Ltda', '12.345.678/0001-99', '2023-04-07');

select * from unidade;
select * from usuario;
select * from empresa;

