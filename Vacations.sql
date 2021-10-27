-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `follower_id` bigint NOT NULL,
  `vacation_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=723 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (32,32,251),(33,30,253),(33,32,255),(33,29,256),(34,31,257),(34,27,259),(36,27,260),(36,31,261),(36,30,262),(37,32,263),(37,31,264),(37,30,265),(38,29,266),(38,31,267),(38,32,268),(39,29,269),(39,31,270),(39,27,271),(41,32,277),(27,26,292),(47,27,432),(49,29,448),(49,27,449),(40,27,518),(40,31,519),(40,29,600),(26,39,702),(26,29,703),(26,40,706),(32,30,713),(32,29,715),(32,39,716),(26,30,717);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `idx_user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (26,'test10','766342084f4872910acc23a16dcf14c1','ddd','ddd','CUSTOMER'),(29,'test40','766342084f4872910acc23a16dcf14c1','name','name','CUSTOMER'),(30,'admin@gmail.com','766342084f4872910acc23a16dcf14c1','Aviezer','Epstein','Admin'),(31,'test100','766342084f4872910acc23a16dcf14c1','test100','test100','CUSTOMER'),(32,'test200','766342084f4872910acc23a16dcf14c1','test200','test200','CUSTOMER'),(33,'test300','766342084f4872910acc23a16dcf14c1','test300','test300','CUSTOMER'),(34,'test400','766342084f4872910acc23a16dcf14c1','test400','test400','CUSTOMER'),(35,'test500','d5d915a3dae6bd29a6bb1446e1b22754','test500','test500','CUSTOMER'),(36,'test600','766342084f4872910acc23a16dcf14c1','test500','test500','CUSTOMER'),(37,'test700','766342084f4872910acc23a16dcf14c1','test700','test700','CUSTOMER'),(38,'test800','766342084f4872910acc23a16dcf14c1','test800','test800','CUSTOMER'),(39,'test900','766342084f4872910acc23a16dcf14c1','test900','test900','CUSTOMER'),(40,'test1000','766342084f4872910acc23a16dcf14c1','test1000','test1000','CUSTOMER'),(41,'test2000','766342084f4872910acc23a16dcf14c1','test2000','test2000','CUSTOMER'),(42,'test3000','766342084f4872910acc23a16dcf14c1','test3000','test3000','CUSTOMER'),(43,'test2100','766342084f4872910acc23a16dcf14c1','test2100','test2100','CUSTOMER'),(45,'test2300','766342084f4872910acc23a16dcf14c1','test2300','test2300','CUSTOMER'),(46,'test3500','766342084f4872910acc23a16dcf14c1','test3500','test3500','CUSTOMER'),(47,'test','766342084f4872910acc23a16dcf14c1','test','test','CUSTOMER'),(48,'sss','766342084f4872910acc23a16dcf14c1','sssssssssssssssssssss','sss','CUSTOMER'),(49,'michael','766342084f4872910acc23a16dcf14c1','michael','epstein','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `number_of_followers` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (27,'Located in New York, Moxy NYC East Village is in the entertainment district. ','New York','https://image.shutterstock.com/image-photo/st-pauls-cathedralthe-anglican-river-600w-1932702254.jpg','2022-10-27','2023-04-07',845,7),(29,'Courtyard by Marriott Fort Lauderdale East/Lauderdale-by-the-Sea','Israel','https://image.shutterstock.com/image-photo/temple-mount-western-wall-golden-600w-519093583.jpg','2022-01-27','2022-04-07',770,7),(30,'Holiday Inn Manhattan-Financial District, an IHG Hotel','Berlin','https://image.shutterstock.com/image-photo/panoramic-view-berlin-city-center-600w-1174014040.jpg','2022-01-27','2022-05-27',400,5),(31,'Located in New York, Moxy NYC East Village is in the entertainment district. ','San Diego','https://image.shutterstock.com/image-photo/downtown-san-diego-sunset-southern-600w-665895496.jpg','2022-01-27','2022-03-29',800,7),(32,'Courtyard by Marriott Fort Lauderdale East/Lauderdale-by-the-Sea','California','https://image.shutterstock.com/image-photo/panoramic-view-neighborhood-anaheim-orange-600w-1427562989.jpg','2022-02-10','2022-03-02',700,5),(39,'Located in New York, Moxy NYC East Village is in the entertainment district.','London','https://image.shutterstock.com/image-photo/panorama-tower-bridge-sunset-london-600w-750033364.jpg','2022-03-11','2022-06-02',520,2),(40,'Located in New York, Moxy NYC East Village is in the entertainment district. ','New York','https://image.shutterstock.com/image-photo/panorama-tower-bridge-sunset-london-600w-750033364.jpg','2022-02-04','2022-05-27',380,1),(41,'Holiday Inn Manhattan-Financial District, an IHG Hotel','Berlin','https://image.shutterstock.com/image-photo/st-pauls-cathedralthe-anglican-river-600w-1932702254.jpg','2022-01-07','2022-01-27',842,0),(42,'Located in New York, Moxy NYC East Village is in the entertainment district.','Rome','https://image.shutterstock.com/image-photo/panoramic-view-neighborhood-anaheim-orange-600w-1427562989.jpg','2022-03-12','2022-04-23',809,0);
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-27 22:27:52
