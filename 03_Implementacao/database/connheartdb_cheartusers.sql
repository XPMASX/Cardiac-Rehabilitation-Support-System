-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: connheartdb
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
-- Table structure for table `cheartusers`
--

DROP TABLE IF EXISTS `cheartusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheartusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` binary(16) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `timezone` varchar(50) DEFAULT NULL,
  `locale` varchar(10) DEFAULT NULL,
  `created` datetime(1) DEFAULT NULL,
  `last_api_access` datetime(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_CHeartUsers_uuid` (`uuid`),
  KEY `ix_CHeartUsers_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheartusers`
--

LOCK TABLES `cheartusers` WRITE;
/*!40000 ALTER TABLE `cheartusers` DISABLE KEYS */;
INSERT INTO `cheartusers` VALUES (1,_binary 'h`\ÂÁ“F\åü\ËÆ¸I\ë','Test User','test@user.com','UTC','en_US','2024-06-04 17:32:06.0',NULL),(2,_binary '\ì¤25‡hMŽ£6ÖŽkY4E','Test User','test@user.com','UTC','en_US','2024-06-04 17:32:06.0','2024-07-16 00:26:08.1'),(3,_binary 'ÿ~>\Ò?9NB»GF?Yšv ','Pacient 0','a49247@alunos.isel.pt','UTC','en','2024-07-09 16:07:09.0','2024-07-15 23:38:09.2');
/*!40000 ALTER TABLE `cheartusers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-16  1:26:42
