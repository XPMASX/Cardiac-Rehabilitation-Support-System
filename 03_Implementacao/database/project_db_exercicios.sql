-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: project_db
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercicios`
--

DROP TABLE IF EXISTS `exercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios` (
  `id_exercicio` int NOT NULL AUTO_INCREMENT,
  `JSON` json DEFAULT NULL,
  PRIMARY KEY (`id_exercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios`
--

LOCK TABLES `exercicios` WRITE;
/*!40000 ALTER TABLE `exercicios` DISABLE KEYS */;
INSERT INTO `exercicios` VALUES (8,'{\"TIPO\": \"Aquecimento\", \"duracao\": \"30 minutos\", \"objetivos\": \"Melhorar a resistência\", \"repeticoes\": 5, \"nome_do_exercicio\": \"Caminhada\", \"descricao_do_exercicio\": \"Caminhada leve de 30 minutos, 5 vezes por semana\"}'),(9,'{\"TIPO\": \"Aeróbio\", \"duracao\": \"20 minutos\", \"objetivos\": \"Aumentar capacidade cardiovascular\", \"repeticoes\": 3, \"nome_do_exercicio\": \"Corrida\", \"descricao_do_exercicio\": \"Corrida moderada de 20 minutos, 3 vezes por semana\"}'),(10,'{\"TIPO\": \"Força\", \"duracao\": \"40 minutos\", \"objetivos\": \"Fortalecer músculos\", \"repeticoes\": 4, \"nome_do_exercicio\": \"Levantamento de Peso\", \"descricao_do_exercicio\": \"Levantamento de peso por 40 minutos, 4 vezes por semana\"}'),(11,'{\"TIPO\": \"Alongamentos\", \"duracao\": \"10 minutos\", \"objetivos\": \"Melhorar flexibilidade\", \"repeticoes\": 2, \"nome_do_exercicio\": \"Alongamento de Isquiotibiais\", \"descricao_do_exercicio\": \"Alongamento de isquiotibiais por 10 minutos, 2 vezes por semana\"}'),(12,'{\"TIPO\": \"Aquecimento\", \"duracao\": \"25 minutos\", \"objetivos\": \"Preparação para exercícios intensos\", \"repeticoes\": 3, \"nome_do_exercicio\": \"Jumping Jacks\", \"descricao_do_exercicio\": \"Séries de jumping jacks por 25 minutos, 3 vezes por semana\"}'),(13,'{\"TIPO\": \"Aeróbio\", \"duracao\": \"15 minutos\", \"objetivos\": \"Queimar calorias\", \"repeticoes\": 5, \"nome_do_exercicio\": \"Ciclismo\", \"descricao_do_exercicio\": \"Pedalar em bicicleta por 15 minutos, 5 vezes por semana\"}'),(14,'{\"TIPO\": \"Força\", \"duracao\": \"45 minutos\", \"objetivos\": \"Desenvolver força muscular\", \"repeticoes\": 4, \"nome_do_exercicio\": \"Flexões\", \"descricao_do_exercicio\": \"Flexões por 45 minutos, 4 vezes por semana\"}'),(15,'{\"TIPO\": \"Alongamentos\", \"duracao\": \"15 minutos\", \"objetivos\": \"Alongamento geral\", \"repeticoes\": 3, \"nome_do_exercicio\": \"Alongamento de Pescoço\", \"descricao_do_exercicio\": \"Alongamento de pescoço por 15 minutos, 3 vezes por semana\"}'),(16,'{\"TIPO\": \"Aquecimento\", \"duracao\": \"20 minutos\", \"objetivos\": \"Preparação para atividades físicas\", \"repeticoes\": 4, \"nome_do_exercicio\": \"Pular Corda\", \"descricao_do_exercicio\": \"Pular corda por 20 minutos, 4 vezes por semana\"}'),(17,'{\"TIPO\": \"Aeróbio\", \"duracao\": \"30 minutos\", \"objetivos\": \"Melhorar resistência cardiovascular\", \"repeticoes\": 3, \"nome_do_exercicio\": \"Natação\", \"descricao_do_exercicio\": \"Nadar por 30 minutos, 3 vezes por semana\"}'),(20,'{\"TIPO\": \"Força\", \"duracao\": \"1 minuto\", \"objetivos\": \"Fortalecer os músculos do core e melhorar a estabilidade\", \"repeticoes\": \"4\", \"nome_do_exercicio\": \"Prancha\", \"descricao_do_exercicio\": \"Manter a posição de prancha com as mão no chão.\"}'),(21,'{\"TIPO\": \"Força\", \"duracao\": \"15 minutos\", \"objetivos\": \" Fortalecer os músculos abdominais, melhorar a postura e a estabilidade do tronco.\", \"repeticoes\": \"20 3x\", \"nome_do_exercicio\": \"Abdominais\", \"descricao_do_exercicio\": \"Deite-se de costas no chão, com os joelhos dobrasdos e os pés apoiados no chão. Cruze os braços sobre o peito. Eleve o tronco do chão, contraindo os músculos abdominais. Retorne lentamente à posição inicial.\"}'),(22,'{\"TIPO\": \"Força\", \"duracao\": \"10 minutos\", \"objetivos\": \" Fortalecer os músculos das pernas, melhorar a flexibilidade.\", \"repeticoes\": \"10, 3x\", \"nome_do_exercicio\": \"Agachamentos\", \"descricao_do_exercicio\": \"Posicione-se em pé, com os pés na largura dos ombros. Dobre os joelhos como se estivesse a sentar numa cadeira. Evite que os joelhos ultrapassem a ponta dos pés. Empurre o chão com os calcanhares para retornar à posição inicial.\"}');
/*!40000 ALTER TABLE `exercicios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-16  1:26:43
