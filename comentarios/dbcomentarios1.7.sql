-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 29-11-2011 a las 05:40:45
-- Versión del servidor: 5.1.53
-- Versión de PHP: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `comentarios`
--
CREATE DATABASE `comentarios` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci;
USE `comentarios`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE IF NOT EXISTS `comentario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `nombre` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `correo` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `comentario` varchar(400) COLLATE latin1_general_ci NOT NULL,
  `web` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `logo` varchar(100) COLLATE latin1_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=2 ;

--
-- Volcar la base de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `title`, `nombre`, `correo`, `comentario`, `web`, `logo`) VALUES
(1, 'Duda sobre tu tutorial', 'carver', 'correo@hotmail.com', 'comentarios...', 'www.google.com.mx', 'logo3.png');
