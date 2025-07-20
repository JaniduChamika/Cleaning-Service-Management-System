-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.24 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for csms
CREATE DATABASE IF NOT EXISTS `csms` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `csms`;

-- Dumping structure for table csms.booking
CREATE TABLE IF NOT EXISTS `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `date_time` timestamp NOT NULL,
  `service_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_booking_service_idx` (`service_id`),
  KEY `fk_booking_user1_idx` (`user_id`),
  CONSTRAINT `fk_booking_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  CONSTRAINT `fk_booking_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table csms.booking: ~3 rows (approximately)
INSERT INTO `booking` (`id`, `customer_name`, `address`, `date_time`, `service_id`, `user_id`) VALUES
	(2, 'janidu chamika ', '547/B,Yagoda road,Gampaha', '2025-07-26 03:30:00', 3, 1),
	(3, 'janidu chamika', '127/B,Ja-ela road,Gampaha', '2025-07-23 06:00:00', 5, 1),
	(7, 'Pasindu Kumara', '23/c, Nagahena road, Oruthota', '2025-07-24 10:00:00', 2, 1),
	(8, 'Oshani Maheshika', '23/K,Samagi road,Negambo', '2025-07-22 08:00:00', 1, 1);

-- Dumping structure for table csms.service
CREATE TABLE IF NOT EXISTS `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table csms.service: ~8 rows (approximately)
INSERT INTO `service` (`id`, `name`) VALUES
	(1, 'Residential Cleaning'),
	(2, 'Commercial Cleaning'),
	(3, 'Post-Construction Cleaning'),
	(4, 'Deep Cleaning'),
	(5, 'Carpet Cleaning'),
	(6, 'Window Cleaning'),
	(7, 'Tile and Grout Cleaning'),
	(8, 'Upholstery Cleaning');

-- Dumping structure for table csms.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password_hash` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table csms.user: ~2 rows (approximately)
INSERT INTO `user` (`id`, `username`, `password_hash`) VALUES
	(1, 'Janidu', '$2b$10$3yjyRrFzwVSAn6Lphvi8MuBUTSGWy86d5htWpz4E31Sl2HqatNc4C'),
	(2, 'matheesa', '$2b$10$k7racQloLjh/318jufvQduMCrLVU09uv00kSFJXbdDFOtY7BQY4a2');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
