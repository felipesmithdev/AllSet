-- -----------------------------------------------------
DROP DATABASE IF EXISTS allset;
CREATE DATABASE IF NOT EXISTS allset ;
USE allset ;


CREATE TABLE IF NOT EXISTS pais (
  id_pais INT PRIMARY KEY AUTO_INCREMENT ,
  nome VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS estado (
  id_estado INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  uf CHAR(2) NOT NULL,
  fk_pais INT NOT NULL,
  CONSTRAINT fkPais foreign key (fk_pais) references pais(id_pais)
  );


CREATE TABLE IF NOT EXISTS cidade (
  id_cidade INT PRIMARY KEY auto_increment,
  nome VARCHAR(45) NOT NULL,
  fk_estado int not null,
  constraint fkEstado foreign key (fk_estado) references estado (id_estado)
  );
  

CREATE TABLE IF NOT EXISTS empresa (
  id_empresa INT primary key auto_increment,
  nome VARCHAR(45) not NULL,
  cnpj CHAR(14) not NULL,
  dt_cadastro DATE not NULL
  );

CREATE TABLE IF NOT EXISTS agencia (
  id_agencia INT primary key auto_increment ,
  endereco VARCHAR(45) NOT NULL,
  endereco2 VARCHAR(45) NULL,
  cep CHAR(8) NOT NULL,
  numero CHAR(10) NOT NULL,
  fk_cidade INT NOT NULL,
  fk_empresa INT NOT NULL,
  constraint fkCidadeAgencia foreign key (fk_cidade) references cidade(id_cidade),
  constraint fkEmpresaAgencia foreign key (fk_empresa) references empresa(id_empresa)
  );


CREATE TABLE IF NOT EXISTS pessoa (
  id_pessoa INT primary key auto_increment,
  nome VARCHAR(45) not NULL,
  cpf CHAR(11) not NULL,
  email VARCHAR(45) not NULL,
  senha VARCHAR(45) not NULL,
  nivel_permissao TINYINT not NULL,
  ativo TINYINT not NULL,
  fk_agencia INT NOT NULL,
  constraint chkNivel check(nivel_permissao in(0,1,2,3)),
  constraint chkAtivo check(ativo in(0 or 1)),
  constraint fkAgenciaPessoa foreign key (fk_agencia) references agencia(id_agencia)
  );
  

CREATE TABLE IF NOT EXISTS carro (
  id_carro INT primary key auto_increment,
  modelo VARCHAR(45) not NULL,
  marca VARCHAR(45) not NULL,
  ano CHAR(4) not NULL,
  identificador CHAR(45) not NULL,
  sistema_operacional VARCHAR(45) not NULL,
  fk_agenciaCarro INT NOT NULL,
  constraint foreign key fkAgenciaCarro (fk_agenciaCarro) references agencia(id_agencia)
  );


CREATE TABLE IF NOT EXISTS componente (
  id_componente INT primary key auto_increment ,
  tipo VARCHAR(45) not NULL,
  metrica CHAR(2) not NULL
);



CREATE TABLE IF NOT EXISTS configuracao (
  pk_componente INT NOT NULL,
  pk_carro int NOT NULL,
  dt_pedido DATE not NULL,
  limite DOUBLE not NULL,
  PRIMARY KEY (`pk_componente`, `pk_carro`),
  CONSTRAINT fkComponentePK FOREIGN KEY (`pk_componente`) REFERENCES componente (id_componente),
  CONSTRAINT fkCarroPK FOREIGN KEY (pk_carro) REFERENCES carro (id_carro)
);


CREATE TABLE IF NOT EXISTS carro_captura_n (
  id_captura_n INT primary key auto_increment,
  cpu float not NULL,
  ram float not NULL
);