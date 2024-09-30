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
-- Table structure for table `cheartquestionnaireanswers`
--

DROP TABLE IF EXISTS `cheartquestionnaireanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheartquestionnaireanswers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `fill_role_id` int DEFAULT NULL,
  `ts` datetime(1) DEFAULT NULL,
  `answers` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_CHeartQuestionnaireAnswers_questionnaire_id_Questionnaires` (`questionnaire_id`),
  KEY `fk_CHeartQuestionnaireAnswers_fill_role_id_CHeartUserRoles` (`fill_role_id`),
  KEY `ix_CHeartQuestionnaireAnswers_role_id` (`role_id`),
  KEY `ix_CHeartQuestionnaireAnswers_ts` (`ts`),
  CONSTRAINT `fk_CHeartQuestionnaireAnswers_fill_role_id_CHeartUserRoles` FOREIGN KEY (`fill_role_id`) REFERENCES `cheartuserroles` (`id`),
  CONSTRAINT `fk_CHeartQuestionnaireAnswers_questionnaire_id_Questionnaires` FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`id`),
  CONSTRAINT `fk_CHeartQuestionnaireAnswers_role_id_CHeartUserRoles` FOREIGN KEY (`role_id`) REFERENCES `cheartuserroles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheartquestionnaireanswers`
--

LOCK TABLES `cheartquestionnaireanswers` WRITE;
/*!40000 ALTER TABLE `cheartquestionnaireanswers` DISABLE KEYS */;
INSERT INTO `cheartquestionnaireanswers` VALUES (1,1,1,1,'2024-06-04 17:32:06.0','\"{\\\"question1\\\": \\\"answer1\\\", \\\"question2\\\": \\\"answer2\\\"}\"');
/*!40000 ALTER TABLE `cheartquestionnaireanswers` ENABLE KEYS */;
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
