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
-- Table structure for table `cheartuserroles`
--

DROP TABLE IF EXISTS `cheartuserroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheartuserroles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` binary(16) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `role` int DEFAULT NULL,
  `created` datetime(1) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT NULL,
  `disabled_ts` datetime(1) DEFAULT NULL,
  `clinic_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_CHeartUserRoles_user_id` (`user_id`,`account_id`,`role`),
  UNIQUE KEY `ix_CHeartUserRoles_uuid` (`uuid`),
  KEY `fk_CHeartUserRoles_account_id_Accounts` (`account_id`),
  KEY `ix_CHeartUserRoles_role` (`role`),
  CONSTRAINT `fk_CHeartUserRoles_account_id_Accounts` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `fk_CHeartUserRoles_user_id_CHeartUsers` FOREIGN KEY (`user_id`) REFERENCES `cheartusers` (`id`),
  CONSTRAINT `ck_CHeartUserRoles_disabled` CHECK ((`disabled` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheartuserroles`
--

LOCK TABLES `cheartuserroles` WRITE;
/*!40000 ALTER TABLE `cheartuserroles` DISABLE KEYS */;
INSERT INTO `cheartuserroles` VALUES (1,_binary '\\\"\èýW“Hó‡`\ä\çú\æ¦ö',2,1,3,'2024-06-04 17:32:06.0',0,'2024-06-04 17:32:06.0',NULL),(2,_binary 'ÿ~>\Ò?9NB»GF?Yšv ',3,2,5,'2024-07-09 16:16:33.0',0,'2024-07-09 16:16:33.0',NULL);
/*!40000 ALTER TABLE `cheartuserroles` ENABLE KEYS */;
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
