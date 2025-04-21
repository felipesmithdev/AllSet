CREATE DATABASE IF NOT EXISTS allset ;
USE allset ;

CREATE TABLE IF NOT EXISTS empresa (
  id_empresa INT primary key auto_increment,
  nome VARCHAR(45) not NULL,
  cnpj CHAR(14) not NULL,
  dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS endereco (
	id_endereco int primary key auto_increment,
    logradouro varchar(100) not null,
    bairro varchar(50) not null,
    uf char(2) not null
	);

CREATE TABLE IF NOT EXISTS agencia(
  id_agencia INT primary key auto_increment ,
  cep CHAR(8) NOT NULL,
  numero CHAR(10) NOT NULL,
  complemento varchar(45),
  fk_empresa INT NOT NULL,
  fk_endereco INT NOT NULL,
  constraint fkEmpresaAgencia foreign key (fk_empresa) references empresa(id_empresa),
  constraint fkEnderecoAgencia foreign key (fk_endereco) references endereco(id_endereco)
  );

CREATE TABLE IF NOT EXISTS pessoa (
  id_pessoa INT primary key auto_increment,
  nome VARCHAR(45) not NULL,
  cpf CHAR(11) not NULL,
  email VARCHAR(45) not NULL,
  senha VARCHAR(45) not NULL,
  nivel_permissao TINYINT not NULL DEFAULT 1,
  ativo TINYINT not NULL DEFAULT 1,
  fk_agencia INT NOT NULL,
  constraint chkNivel check(nivel_permissao in(0,1,2,3)),
  constraint chkAtivo check(ativo in(0,1)),
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

CREATE TABLE IF NOT EXISTS pedido (
  id_pedido INT auto_increment,
  pk_componente INT NOT NULL,
  pk_carro INT NOT NULL,
  dt_pedido DATETIME not NULL,
  limite DOUBLE not NULL,
  PRIMARY KEY (id_pedido, pk_componente, pk_carro),
  CONSTRAINT fkComponentePK FOREIGN KEY (pk_componente) REFERENCES componente (id_componente),
  CONSTRAINT fkCarroPK FOREIGN KEY (pk_carro) REFERENCES carro (id_carro)
);

CREATE TABLE IF NOT EXISTS captura_componente_n (
  id INT primary key auto_increment,
  valor float not NULL,
  dt_captura datetime,
  fk_pedido INT,
  constraint fkCapPedido foreign key (fk_pedido) references pedido(id_pedido)
);

INSERT INTO componente (tipo, metrica) VALUES
('CPU', '%'),
('RAM', '%'),
('RAM', 'B'),
('DISCO', '%'),
('DISCO', 'B'),
('BATERIA', '%');

INSERT INTO empresa (nome, cnpj) VALUES ('TechMobility Ltda', '12345678000199');

INSERT INTO endereco (logradouro, bairro, uf) VALUES ('Rua das Inovações, 123', 'Centro', 'SP');

INSERT INTO agencia (cep, numero, complemento, fk_empresa, fk_endereco) VALUES ('01001000', '100', 'Térreo', 1, 1);

INSERT INTO pessoa (nome, cpf, email, senha, nivel_permissao, ativo, fk_agencia) VALUES ('João Silva', '12345678901', 'joao.silva@email.com', 'senha123', 2, 1, 1);

INSERT INTO carro (modelo, marca, ano, identificador, sistema_operacional, fk_agenciaCarro) VALUES ('Model S', 'Tesla', '2022', 'ABC123XYZ', 'Linux AutoOS', 1);

SELECT * FROM empresa;

SELECT * FROM endereco;

SELECT * FROM agencia;

SELECT * FROM pessoa;

SELECT * FROM carro;

SELECT * FROM pedido;

