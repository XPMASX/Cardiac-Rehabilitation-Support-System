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
-- Table structure for table `planocliente`
--

DROP TABLE IF EXISTS `planocliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planocliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DadosPlano` json NOT NULL,
  `NumUtenteSaude` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planocliente`
--

LOCK TABLES `planocliente` WRITE;
/*!40000 ALTER TABLE `planocliente` DISABLE KEYS */;
INSERT INTO `planocliente` VALUES (1,'[{\"level\": \"Treino Suave(25%)\", \"title\": \"TREINO 1\", \"duration\": 60, \"description\": \"Plano simples apenas para treinar a respiração e alguma mobilidade com peso\", \"maxHeartRate\": 60, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Levantamento de Peso\"}]}]',201),(2,'[{\"level\": \"Treino Suave(25%)\", \"title\": \"TREINO 1\", \"duration\": 5, \"description\": \"Este treino é projetado para ser suave e ideal para aqueles que estão a começar ou preferem uma abordagem mais leve. \", \"maxHeartRate\": 160, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aeróbio - Ciclismo\"}, {\"exercicioFeito\": \"yes\", \"selectedExercise\": \"Aquecimento - Pular Corda\"}, {\"exercicioFeito\": \"yes\", \"selectedExercise\": \"Aquecimento - Caminhada\"}]}, {\"level\": \"Treino Intenso (75%)\", \"title\": \"TREINO 2\", \"duration\": 10, \"description\": \"Este treino é destinado a indivíduos que desejam um desafio mais intenso.\", \"treinoFeito\": 0, \"maxHeartRate\": 170, \"exercisesList\": [{\"exercicioFeito\": \"yes\", \"selectedExercise\": \"Aeróbio - Corrida\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Prancha\"}, {\"exercicioFeito\": \"yes\", \"selectedExercise\": \"Força - Levantamento de Peso\"}]}, {\"level\": \"Treino Médio (50%)\", \"title\": \"TREINO 3\", \"duration\": 10, \"description\": \"Este treino oferece um equilíbrio entre intensidade e recuperação.\", \"treinoFeito\": 0, \"maxHeartRate\": 120, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aquecimento - Jumping Jacks\"}, {\"exercicioFeito\": \"yes\", \"selectedExercise\": \"Aeróbio - Natação\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Alongamentos - Alongamento de Pescoço\"}]}]',201),(7,'[{\"level\": \"Treino Intenso (75%)\", \"title\": \"TREINO 1\", \"duration\": 14, \"description\": \"Aumentar o gasto calórico, melhorar a aptidão física e promover a saúde cardiovascular.\", \"maxHeartRate\": 150, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aeróbio - Corrida\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Flexões\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Prancha\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Abdominais\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aeróbio - Ciclismo\"}]}]',201),(19,'[{\"level\": \"Treino Suave(25%)\", \"title\": \"TREINO 1\", \"duration\": 7, \"description\": \"Iniciar a prática de atividade física de forma segura e gradual, fortalecer o sistema cardiovascular\", \"maxHeartRate\": 100, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aquecimento - Caminhada\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aquecimento - Pular Corda\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Alongamentos - Alongamento de Isquiotibiais\"}]}, {\"level\": \"Treino Médio (50%)\", \"title\": \"TREINO 2\", \"duration\": 10, \"description\": \"Melhorar a capacidade cardiorrespiratória, aumentar a resistência física e fortalecer o coração.\", \"treinoFeito\": 0, \"maxHeartRate\": 130, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aquecimento - Caminhada\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aeróbio - Natação\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aeróbio - Ciclismo\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aquecimento - Pular Corda\"}]}]',202),(20,'[{\"level\": \"Treino Suave(25%)\", \"title\": \"TREINO 1\", \"duration\": 30, \"description\": \"Desenvolver um condicionamento físico básico, aumentar a resistência cardiovascular e a força muscular e promover o bem-estar geral.\", \"maxHeartRate\": 150, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aeróbio - Corrida\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Prancha\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Flexões\"}, {\"exercicioFeito\": \"no\", \"selectedExercise\": \"Aquecimento - Caminhada\"}]}]',202),(21,'[{\"level\": \"Treino Suave(25%)\", \"title\": \"TREINO 1\", \"duration\": 60, \"description\": \"Plano simples apenas para treinar a respiração e alguma mobilidade com peso\", \"maxHeartRate\": 60, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Levantamento de Peso\"}]}]',2001),(22,'[{\"level\": \"Treino Suave(25%)\", \"title\": \"TREINO 1\", \"duration\": 60, \"description\": \"Plano simples apenas para treinar a respiração e alguma mobilidade com peso\", \"maxHeartRate\": 60, \"exercisesList\": [{\"exercicioFeito\": \"no\", \"selectedExercise\": \"Força - Levantamento de Peso\"}]}]',2001);
/*!40000 ALTER TABLE `planocliente` ENABLE KEYS */;
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
