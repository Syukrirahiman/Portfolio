-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 17, 2018 at 12:48 PM
-- Server version: 5.7.20
-- PHP Version: 7.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie`
--
CREATE DATABASE IF NOT EXISTS `movie` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `movie`;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
CREATE TABLE `participants` (
  `name` varchar(64) NOT NULL,
  `planid` int(100) NOT NULL,
  `showtimeVoted` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`name`, `planid`, `showtimeVoted`) VALUES
('John','1', NULL);


DROP TABLE IF EXISTS `plan`;
CREATE TABLE `plan` (
  `showtime` varchar(64) NOT NULL,
  `id` int(100) NOT NULL,
  `cinema` varchar(64) NOT NULL,
  `movie` varchar(64) NOT NULL,
  `counter` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`showtime`, `id`,  `cinema`, `movie`,`counter`) VALUES
('2019-11-03T10:25:00+08:00', 1, 'AMK HUB','Maleficent: Mistress of Evil', 0),
('2019-11-03T15:35:00+08:00', 1, 'AMK HUB','Maleficent: Mistress of Evil', 0);


-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`name`, `planid`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`,`showtime`);




