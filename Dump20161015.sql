-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: trip-site
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dblogin`
--

DROP TABLE IF EXISTS `dblogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dblogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `e-mail_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dblogin`
--

LOCK TABLES `dblogin` WRITE;
/*!40000 ALTER TABLE `dblogin` DISABLE KEYS */;
INSERT INTO `dblogin` VALUES (56,'bbbbbb','bbbbbb','bbbbbb@abv.bg'),(57,'vvvvvv','555555','v@abv.bg'),(58,'wwwwww','wwwwww','w@abv.bg'),(61,'kkkkkk','kkkkkk','k@abv.bg'),(62,'iiiiii','iiiiii','i@abv.bg'),(63,'yyyyyy','yyyyyy','y@abv.bg'),(64,'ttttttt','ttttttt','ttttttt@abv.bg'),(66,'llllll','llllll','llllll@abv.bg'),(69,'kjdskl;gk','nnnnnn','n@abv.nh'),(70,'777777','777777','7@abv.bg'),(71,'123456','123456','1@avb.bg'),(74,'hhhhhh','hhhhhh','h@abv.bg');
/*!40000 ALTER TABLE `dblogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(6) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `waypoints` varchar(255) NOT NULL,
  `optimize_waypoints` varchar(45) NOT NULL,
  `travel_mode` varchar(255) NOT NULL,
  `message` varchar(225) DEFAULT NULL,
  `route_name` varchar(45) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `dblogin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (37,74,'42.72888030000001, 23.295010100000013','42.72888030000001, 23.295010100000013','42.73241, 23.290129999999976, 42.731662, 23.285221999999976','1','WALKING','shop','nadezda',2),(38,74,'42.7302076, 23.28635929999996','42.7265249, 23.29824389999999','42.7265249, 23.29824389999999, 42.73000270000001, 23.29454110000006','1','WALKING','k;jlkjkl','jkj;kl',4),(39,64,'42.73432, 23.29237999999998','42.731662, 23.285221999999976','42.731662, 23.285221999999976, 42.7265249, 23.29824389999999','1','WALKING','my trip1','tttrip1',2),(40,56,'42.73241, 23.290129999999976','42.72888030000001, 23.295010100000013','42.72888030000001, 23.295010100000013, 42.7265249, 23.29824389999999','1','WALKING','b big trip','b - my trip1',3),(41,56,'42.73565, 23.291680000000042','42.73241, 23.290129999999976','42.7302076, 23.28635929999996, 42.73565, 23.291680000000042','1','WALKING','b big trip2','b - my trip2',4),(42,56,'42.72888030000001, 23.295010100000013','42.73565, 23.291680000000042','42.7302076, 23.28635929999996, 42.73565, 23.291680000000042','1','WALKING','b big trip3','b - my trip3',1),(43,56,'42.73565, 23.291680000000042','42.73241, 23.290129999999976','42.7302076, 23.28635929999996, 42.73565, 23.291680000000042','1','WALKING','b big trip4','b - my trip4',4),(44,56,'42.731662, 23.285221999999976','42.73432, 23.29237999999998','42.72888030000001, 23.295010100000013, 42.7265249, 23.29824389999999','1','WALKING','this is 5','b my-trip5',5),(45,56,'42.73432, 23.29237999999998','42.72888030000001, 23.295010100000013','42.72888030000001, 23.295010100000013, 42.7265249, 23.29824389999999','1','WALKING','this is 6','b my-trip6',1),(46,56,'42.73432, 23.29237999999998','42.72888030000001, 23.295010100000013','42.72888030000001, 23.295010100000013, 42.7265249, 23.29824389999999','1','WALKING','this is 7','b my-trip7',2);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-15 14:33:13
