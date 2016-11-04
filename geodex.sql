-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 21, 2016 at 07:47 PM
-- Server version: 5.6.30-0ubuntu0.14.04.1
-- PHP Version: 5.6.21-1+donate.sury.org~trusty+4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `geodex`
--

-- --------------------------------------------------------

--
-- Table structure for table `gx_categories`
--

CREATE TABLE IF NOT EXISTS `gx_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `added_by` varchar(50) NOT NULL,
  `last_updated` datetime NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `gx_categories`
--

INSERT INTO `gx_categories` (`id`, `category_name`, `status`, `added_by`, `last_updated`, `date_created`) VALUES
(3, 'hCdfddf', 1, 'admin', '2016-10-21 13:34:19', '2016-10-21 13:34:19');

-- --------------------------------------------------------

--
-- Table structure for table `gx_pages`
--

CREATE TABLE IF NOT EXISTS `gx_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `meta_tags` text,
  `meta_description` text,
  `status` smallint(6) NOT NULL,
  `last_updated` datetime NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `gx_users`
--

CREATE TABLE IF NOT EXISTS `gx_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `is_authenticated` smallint(6) NOT NULL,
  `verify_token` text,
  `forgot_password_token` text,
  `last_updated` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `gx_users`
--

INSERT INTO `gx_users` (`id`, `user_name`, `email`, `password`, `role`, `is_authenticated`, `verify_token`, `forgot_password_token`, `last_updated`, `date_created`) VALUES
(1, 'test', 'test@gmail.com', '$2a$10$hoWWak6PKuOmbG0SXb0Huusf8n/ydiD9XbcJ9NVKh6CXAFEWdglka', 'admin', 0, NULL, '6wmfGwJVF3tkPwxF', '2016-10-12 18:15:51', '2016-10-12 18:15:51');

-- --------------------------------------------------------

--
-- Table structure for table `gx_user_details`
--

CREATE TABLE IF NOT EXISTS `gx_user_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `gender` enum('m','f') NOT NULL,
  `address` text NOT NULL,
  `latitude` varchar(200) NOT NULL,
  `longitude` varchar(200) NOT NULL,
  `zip` int(11) NOT NULL,
  `profile_image` int(11) NOT NULL,
  `last_updated` datetime NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
