--
-- ESTRUTURA DO BANCO DE DADOS
--

DROP DATABASE `cefet-shop`;
CREATE DATABASE `cefet-shop`;

USE `cefet-shop`;
CREATE TABLE produto(
`id` INT AUTO_INCREMENT PRIMARY KEY,
`descrico` VARCHAR(255) NOT NULL,
`precoDeVenda` DECIMAL(5,2) NOT NULL,
`lancamento` DATE NOT NULL,
`detalhes` VARCHAR(5000) NOT NULL,
`quantidade` INT NOT NULL,
`taxaDesconto` INT NOT NULL DEFAULT 0
)ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE produto ADD categoria VARCHAR(30) NOT NULL;