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
-- Table structure for table `cheartdataposts`
--

DROP TABLE IF EXISTS `cheartdataposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheartdataposts` (
  `uuid` binary(16) NOT NULL,
  `role_id` int DEFAULT NULL,
  `created` datetime(1) DEFAULT NULL,
  `ts` datetime(3) DEFAULT NULL,
  `dtype` varchar(50) DEFAULT NULL,
  `columns` json DEFAULT NULL,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `ix_CHeartDataPosts_ts` (`ts`),
  KEY `ix_CHeartDataPosts_role_id` (`role_id`),
  KEY `ix_CHeartDataPosts_dtype` (`dtype`),
  CONSTRAINT `fk_CHeartDataPosts_role_id_CHeartUserRoles` FOREIGN KEY (`role_id`) REFERENCES `cheartuserroles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheartdataposts`
--

LOCK TABLES `cheartdataposts` WRITE;
/*!40000 ALTER TABLE `cheartdataposts` DISABLE KEYS */;
INSERT INTO `cheartdataposts` VALUES (_binary 'h=sd\ÑIP‡9¶¦÷\ã4c',1,'2024-06-04 17:32:06.0','2024-06-04 17:32:06.037','Test Data','\"[\\\"column1\\\", \\\"column2\\\"]\"','\"[\\\"data1\\\", \\\"data2\\\"]\"');
/*!40000 ALTER TABLE `cheartdataposts` ENABLE KEYS */;
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
