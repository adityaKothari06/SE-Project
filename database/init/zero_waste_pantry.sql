-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: zero_waste_pantry
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `institution_name` varchar(255) DEFAULT NULL,
  `address` varchar(500) NOT NULL,
  `city` varchar(255) NOT NULL,
  `poc_name` varchar(255) NOT NULL,
  `poc_mobile` varchar(10) NOT NULL,
  `food_type` enum('veg','non-veg') NOT NULL,
  `food_quantity` int NOT NULL,
  `duration_minutes` int NOT NULL,
  `pickup_end` datetime NOT NULL,
  `status` enum('active','reserved','expired') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `donor_firebase_uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_events_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 2, Ward 1, Chandigarh, 160012, India','Delhi','Hitesh','789654123','veg',100,2,'2026-04-13 09:58:56','expired','2026-04-13 09:56:56','USER123'),(2,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 2, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',100,10,'2026-04-13 10:14:48','expired','2026-04-13 10:04:48','USER123'),(3,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 2, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',400,25,'2026-04-13 10:43:11','expired','2026-04-13 10:18:11','USER123'),(4,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 2, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',400,5,'2026-04-13 16:25:45','expired','2026-04-13 10:50:45','USER123'),(5,'PEC','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',1999,5,'2026-04-14 21:28:01','expired','2026-04-14 15:53:01','USER123'),(6,'Aravalli Mess','Punjab Engineering College, Vigyan Path, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','ABC','7896541230','veg',2001,10,'2026-04-14 23:01:23','expired','2026-04-14 17:21:23','USER123'),(7,'PEC','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','ABC','7896541230','veg',200,5,'2026-04-14 18:06:20','expired','2026-04-14 18:01:20','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(8,'PEC','Punjab Engineering College, Vigyan Path, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','ABC','7896541230','veg',200,15,'2026-04-14 18:26:50','expired','2026-04-14 18:11:50','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(9,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 2, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',300,4,'2026-04-17 12:30:54','expired','2026-04-17 12:26:54','3XISzX94TvTIMIDNsisUGDbeaw33'),(10,'aravalli','Punjab Engineering College, Vigyan Path, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',199,25,'2026-04-17 13:20:22','expired','2026-04-17 12:55:22','3XISzX94TvTIMIDNsisUGDbeaw33'),(11,'aravalli','Punjab Engineering College, Vidya Marg, Sector 2, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',800,30,'2026-04-19 12:48:57','expired','2026-04-19 12:18:57','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(12,'aravalli','Punjab Engineering College, Vigyan Path, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',500,28,'2026-04-19 13:25:11','expired','2026-04-19 12:57:11','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(13,'aravalli','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',800,30,'2026-04-19 13:41:26','expired','2026-04-19 13:11:26','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(14,'aravalli','Punjab Engineering College, Vigyan Path, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',100,50,'2026-04-19 16:10:42','expired','2026-04-19 15:20:42','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(15,'aravalli','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',499,60,'2026-04-19 16:43:12','expired','2026-04-19 15:43:12','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(16,'aravalli','Punjab Engineering College, Vigyan Path, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',61,30,'2026-04-19 16:51:05','expired','2026-04-19 16:21:05','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(17,'aravalli','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',99,20,'2026-04-19 16:45:12','expired','2026-04-19 16:25:12','3XISzX94TvTIMIDNsisUGDbeaw33'),(18,'aravalli','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',80,50,'2026-04-19 17:16:51','expired','2026-04-19 16:26:51','3XISzX94TvTIMIDNsisUGDbeaw33'),(19,'aravalli','Vidya Marg, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','harshpreet','9638527410','veg',600,20,'2026-04-22 10:25:52','expired','2026-04-22 10:05:52','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(20,'aravalli','Punjab Engineering College, Vidya Marg, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','Hitesh','9638527410','veg',750,10,'2026-04-28 10:58:11','expired','2026-04-28 10:48:11','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(21,'','Sector 12 Gandhi Nagar, Delhi','','Hitesh','7896541230','veg',500,20,'2026-04-29 02:34:55','expired','2026-04-29 02:14:55','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(22,'','Sector 12 Chandigarh 160012','','Hitesh','7896541230','veg',498,10,'2026-04-29 02:28:04','expired','2026-04-29 02:18:04','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(23,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',500,10,'2026-04-29 02:30:32','expired','2026-04-29 02:20:32','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(24,'PEC','Punjab Engineering College, Vidya Marg, Sector 11, Ward 1, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',500,5,'2026-04-29 02:39:57','expired','2026-04-29 02:34:57','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(25,'Aravalli Mess','Punjab Engineering College, Vidya Marg, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','Hitesh','7896541230','veg',350,36,'2026-04-29 04:15:34','expired','2026-04-29 03:39:34','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(26,'aravalli','Punjab Engineering College, Vidya Marg, Sector 12, Ward 2, Chandigarh, 160012, India','Chandigarh','Hitesh','9638527410','veg',100,5,'2026-04-29 04:10:08','expired','2026-04-29 04:05:08','53QZ4W81gLXfE5qzn4RYJB4jUdC2'),(27,'PEC','Aravalli Mess PEC Chandigarh','','Hitesh','7896541230','veg',100,15,'2026-07-09 07:03:03','expired','2026-07-09 06:48:03','53QZ4W81gLXfE5qzn4RYJB4jUdC2');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `recipient_firebase_uid` varchar(255) NOT NULL,
  `quantity_requested` int NOT NULL,
  `reserved_at` datetime DEFAULT NULL,
  `is_collected` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `ix_reservations_id` (`id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (2,18,'3XISzX94TvTIMIDNsisUGDbeaw33',20,'2026-04-19 22:00:20',0),(3,19,'53QZ4W81gLXfE5qzn4RYJB4jUdC2',100,'2026-04-22 15:36:24',1),(4,20,'53QZ4W81gLXfE5qzn4RYJB4jUdC2',50,'2026-04-28 16:18:50',1),(5,25,'53QZ4W81gLXfE5qzn4RYJB4jUdC2',50,'2026-04-29 09:11:25',1),(6,25,'53QZ4W81gLXfE5qzn4RYJB4jUdC2',100,'2026-04-29 09:32:48',1);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-09 18:47:24
