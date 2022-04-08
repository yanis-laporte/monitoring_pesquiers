-- phpMyAdmin SQL Dump
-- version 5.0.4deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 08 avr. 2022 à 15:57
-- Version du serveur :  10.5.12-MariaDB-0+deb11u1
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `monitoring_pesquiers`
--

-- --------------------------------------------------------

--
-- Structure de la table `alerts`
--

CREATE TABLE `alerts` (
  `alert_id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `template` text NOT NULL,
  `balise_id` tinyint(4) NOT NULL,
  `sensor_id` tinyint(4) NOT NULL,
  `comparateur` float NOT NULL,
  `signe` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `alerts`
--

INSERT INTO `alerts` (`alert_id`, `name`, `template`, `balise_id`, `sensor_id`, `comparateur`, `signe`) VALUES
(1, 'Alerte1 test', 'Template test 1', 1, 1, 10, '>'),
(4, 'Alerte2 test', 'Template test 2', 1, 1, 30, '<'),
(5, 'Alerte3 test', 'Template test 3', 1, 2, 20, '<');

-- --------------------------------------------------------

--
-- Structure de la table `listBalise`
--

CREATE TABLE `listBalise` (
  `balise_id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `sensors_id` varchar(50) NOT NULL,
  `battery_level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `listBalise`
--

INSERT INTO `listBalise` (`balise_id`, `name`, `latitude`, `longitude`, `sensors_id`, `battery_level`) VALUES
(1, 'TestNomBalise1', 43.0632, 6.13975, '1', 0),
(3, 'TestNomBalise1', 43.0671, 6.1338, '1', 0),
(4, 'TestNomBalise1', 43.0728, 6.14264, '1,2,3', 0);

-- --------------------------------------------------------

--
-- Structure de la table `listSensors`
--

CREATE TABLE `listSensors` (
  `sensor_id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `unite` tinytext NOT NULL,
  `symbole` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `listSensors`
--

INSERT INTO `listSensors` (`sensor_id`, `name`, `unite`, `symbole`) VALUES
(1, 'Température', 'degré', '°C'),
(2, 'humiditée', 'pourcent', '%'),
(3, 'temepr', 'ts', 'te');

-- --------------------------------------------------------

--
-- Structure de la table `sensorsCalbr`
--

CREATE TABLE `sensorsCalbr` (
  `id` int(11) NOT NULL,
  `balise_id` tinyint(4) NOT NULL,
  `sensor_id` tinyint(4) NOT NULL,
  `calbr_rect` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `sensorsCalbr`
--

INSERT INTO `sensorsCalbr` (`id`, `balise_id`, `sensor_id`, `calbr_rect`) VALUES
(1, 1, 1, 0.5),
(2, 1, 2, -0.5);

-- --------------------------------------------------------

--
-- Structure de la table `sensorsValues`
--

CREATE TABLE `sensorsValues` (
  `id` int(11) NOT NULL,
  `balise_id` tinytext NOT NULL,
  `sensor_id` tinyint(4) NOT NULL,
  `value` float NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `sensorsValues`
--

INSERT INTO `sensorsValues` (`id`, `balise_id`, `sensor_id`, `value`, `timestamp`) VALUES
(1, '1', 1, 14.9, '2022-03-11 13:44:12'),
(2, '1', 1, 24.4, '2022-03-11 13:46:14'),
(3, '1', 1, 23.8, '2022-03-11 14:46:46'),
(4, '1', 1, 27, '2022-03-18 11:52:29'),
(5, '1', 1, 29.1, '2022-03-18 11:53:16'),
(6, '1', 1, 27.8, '2022-03-18 11:54:19'),
(7, '1', 1, 20.2, '2022-03-18 11:54:26'),
(8, '1', 1, 25.8, '2022-03-18 13:47:21'),
(9, '1', 1, 13.7, '2022-03-24 11:40:16'),
(10, '1', 1, 12.5, '2022-03-24 11:55:16'),
(11, '1', 1, 12.5, '2022-03-24 11:55:18'),
(12, '1', 1, 12.5, '2022-03-24 11:55:18'),
(13, '1', 1, 12.5, '2022-03-24 11:55:18'),
(14, '1', 1, 12.5, '2022-03-24 11:55:19'),
(15, '1', 2, 12.5, '2022-03-24 11:55:19'),
(16, '1', 1, 12.4, '2022-03-25 12:13:28'),
(17, '1', 1, 12.4, '2022-03-25 12:14:05'),
(18, '1', 1, 12.4, '2022-03-25 12:14:42'),
(19, '1', 1, 12.4, '2022-03-25 12:14:43'),
(20, '1', 1, 12.5, '2022-03-25 12:14:45'),
(21, '1', 1, 12.4, '2022-03-25 12:15:37'),
(22, '1', 1, 12.4, '2022-03-25 12:15:38'),
(23, '1', 1, 12.4, '2022-03-25 12:15:38'),
(24, '1', 1, 12.4, '2022-03-25 12:15:39'),
(25, '1', 1, 12.5, '2022-03-25 12:15:40'),
(26, '1', 1, 12.5, '2022-03-25 12:15:41'),
(27, '1', 1, 12.5, '2022-03-25 12:15:41'),
(28, '1', 1, 1.6, '2022-03-25 12:17:07'),
(29, '1', 1, 12.7, '2022-03-25 12:17:14'),
(30, '1', 1, 18.3, '2022-03-25 12:17:14'),
(31, '1', 1, 17.5, '2022-03-25 12:17:15'),
(32, '1', 2, 2.9, '2022-03-25 12:20:01'),
(33, '1', 1, 23.2, '2022-03-25 12:20:01'),
(34, '1', 2, 20.4, '2022-03-25 12:20:01'),
(35, '1', 1, 17, '2022-03-25 12:20:02'),
(36, '1', 1, 17.4, '2022-03-25 12:20:02'),
(37, '1', 2, 6.4, '2022-03-25 12:20:02'),
(38, '1', 1, 11.1, '2022-03-25 12:20:02'),
(39, '1', 1, 1, '2022-04-04 10:16:50'),
(40, '1', 1, 1, '2022-04-04 10:16:50'),
(41, '4', 1, 17.6, '2022-04-04 10:31:22'),
(42, '4', 2, 11.9, '2022-04-04 10:31:22'),
(43, '4', 1, 8.3, '2022-04-04 10:31:48'),
(44, '4', 2, 23.1, '2022-04-04 10:31:48'),
(45, '4', 1, 6.7, '2022-04-04 10:31:52'),
(46, '4', 2, 20.7, '2022-04-04 10:31:52'),
(47, '4', 1, 8.5, '2022-04-04 10:32:33'),
(48, '4', 2, 20.1, '2022-04-04 10:32:33'),
(49, '4', 1, 8.4, '2022-04-04 10:32:50'),
(50, '4', 2, 11.4, '2022-04-04 10:32:50'),
(51, '4', 1, 3.8, '2022-04-04 10:34:05'),
(52, '4', 2, 7.3, '2022-04-04 10:34:05'),
(53, '4', 1, 20.4, '2022-04-04 10:34:52'),
(54, '4', 2, 20.8, '2022-04-04 10:34:52'),
(55, '4', 1, 19.9, '2022-04-04 10:45:47'),
(56, '4', 2, 12.3, '2022-04-04 10:45:47'),
(57, '4', 1, 10.1, '2022-04-04 10:46:15'),
(58, '4', 2, 11.7, '2022-04-04 10:46:15'),
(59, '4', 1, 11.1, '2022-04-04 10:49:08'),
(60, '4', 2, 21.8, '2022-04-04 10:49:08'),
(61, '4', 1, 2.7, '2022-04-04 10:49:15'),
(62, '4', 2, 20, '2022-04-04 10:49:15'),
(63, '1', 1, 19.1, '2022-04-04 10:54:11'),
(64, '1', 2, 1, '2022-04-04 10:54:11'),
(65, '1', 1, 2.3, '2022-04-04 10:54:12'),
(66, '1', 2, 1, '2022-04-04 10:54:12'),
(67, '1', 1, 19.1, '2022-04-04 10:54:13'),
(68, '1', 2, 1, '2022-04-04 10:54:13'),
(69, '1', 1, 11.1, '2022-04-04 10:54:13'),
(70, '1', 2, 1, '2022-04-04 10:54:13'),
(71, '1', 1, 4.8, '2022-04-04 10:54:13'),
(72, '1', 2, 2, '2022-04-04 10:54:13'),
(73, '1', 1, 17.1, '2022-04-04 10:54:13'),
(74, '1', 2, 1, '2022-04-04 10:54:13'),
(75, '1', 1, 4.4, '2022-04-04 10:54:13'),
(76, '1', 2, 2, '2022-04-04 10:54:13'),
(77, '1', 1, 18.9, '2022-04-07 11:18:35'),
(78, '1', 2, 1, '2022-04-07 11:18:35'),
(79, '1', 1, 9.8, '2022-04-07 11:18:37'),
(80, '1', 2, 2, '2022-04-07 11:18:37'),
(81, '4', 1, 12.2, '2022-04-07 11:18:41'),
(82, '4', 2, 21.8, '2022-04-07 11:18:42'),
(83, '4', 1, 14.9, '2022-04-07 11:21:38'),
(84, '4', 2, 3.3, '2022-04-07 11:21:38'),
(85, '4', 1, 6.2, '2022-04-07 11:23:18'),
(86, '4', 2, 9.4, '2022-04-07 11:23:18'),
(87, '4', 1, 11.9, '2022-04-07 11:23:20'),
(88, '4', 2, 17.6, '2022-04-07 11:23:20'),
(89, '4', 1, 18, '2022-04-07 11:23:20'),
(90, '4', 2, 11.3, '2022-04-07 11:23:20'),
(91, '4', 1, 6.4, '2022-04-07 11:23:20'),
(92, '4', 2, 4.8, '2022-04-07 11:23:20'),
(93, '4', 1, 18.4, '2022-04-07 11:23:21'),
(94, '4', 2, 8.7, '2022-04-07 11:23:21'),
(95, '4', 1, 2.5, '2022-04-07 11:23:21'),
(96, '4', 2, 3.6, '2022-04-07 11:23:21'),
(97, '4', 1, 20.7, '2022-04-07 11:25:31'),
(98, '4', 2, 13.8, '2022-04-07 11:25:31'),
(99, '4', 1, 13.3, '2022-04-07 11:26:08'),
(100, '4', 2, 21.6, '2022-04-07 11:26:08'),
(101, '1', 1, 12, '2022-04-07 11:26:58'),
(102, '1', 2, 1, '2022-04-07 11:26:58'),
(103, '1', 1, 19.6, '2022-04-07 11:27:11'),
(104, '1', 2, 2, '2022-04-07 11:27:11'),
(105, '1', 1, 9.7, '2022-04-07 11:27:12'),
(106, '1', 2, 1, '2022-04-07 11:27:12'),
(107, '1', 1, 19.6, '2022-04-07 11:27:13'),
(108, '1', 2, 1, '2022-04-07 11:27:13'),
(109, '1', 1, 21.5, '2022-04-07 11:27:17'),
(110, '1', 2, 1, '2022-04-07 11:27:17'),
(111, '1', 1, 21, '2022-04-07 11:27:26'),
(112, '1', 2, 2, '2022-04-07 11:27:26'),
(113, '1', 1, 14.7, '2022-04-07 11:28:15'),
(114, '1', 2, 1, '2022-04-07 11:28:15'),
(115, '4', 1, 20.2, '2022-04-07 11:28:39'),
(116, '4', 2, 9.5, '2022-04-07 11:28:39'),
(117, '1', 1, 3.4, '2022-04-07 11:28:45'),
(118, '1', 2, 2, '2022-04-07 11:28:45'),
(119, '4', 1, 14.1, '2022-04-07 11:39:19'),
(120, '4', 2, 15.3, '2022-04-07 11:39:19'),
(121, '4', 1, 3.3, '2022-04-07 11:39:20'),
(122, '4', 2, 13.3, '2022-04-07 11:39:20'),
(123, '4', 1, 12, '2022-04-07 11:39:20'),
(124, '4', 2, 11.7, '2022-04-07 11:39:20'),
(125, '4', 1, 17.5, '2022-04-07 11:39:21'),
(126, '4', 1, 17.2, '2022-04-07 11:39:21'),
(127, '4', 2, 15.8, '2022-04-07 11:39:21'),
(128, '4', 2, 11.2, '2022-04-07 11:39:21'),
(129, '1', 1, 1, '2022-04-07 11:44:54'),
(130, '1', 2, 2, '2022-04-07 11:44:54'),
(131, '713706', 1, 16, '2022-04-07 11:56:14'),
(132, '713706', 2, 40, '2022-04-07 11:56:14'),
(133, '713706', 1, 19, '2022-04-07 11:56:15'),
(134, '713706', 2, 31, '2022-04-07 11:56:15'),
(135, '4', 1, 10, '2022-04-07 12:00:03'),
(136, '4', 2, 13.2, '2022-04-07 12:00:03'),
(137, '4', 1, 9.7, '2022-04-07 12:00:04'),
(138, '4', 2, 19.6, '2022-04-07 12:00:04'),
(139, '4', 1, 19.3, '2022-04-07 12:01:01'),
(140, '4', 2, 12.2, '2022-04-07 12:01:01'),
(141, '4', 1, 9.2, '2022-04-07 12:01:12'),
(142, '4', 2, 10.6, '2022-04-07 12:01:12'),
(143, '713706', 1, 20, '2022-04-07 12:01:27'),
(144, '713706', 2, 45, '2022-04-07 12:01:27'),
(145, '713706', 1, 18, '2022-04-07 12:01:29'),
(146, '713706', 2, 43, '2022-04-07 12:01:29'),
(147, '713706', 1, 18, '2022-04-07 12:01:30'),
(148, '713706', 2, 44, '2022-04-07 12:01:30'),
(149, '713706', 1, 21, '2022-04-07 12:01:31'),
(150, '713706', 2, 34, '2022-04-07 12:01:31'),
(151, '713706', 1, 19, '2022-04-07 12:01:32'),
(152, '713706', 2, 45, '2022-04-07 12:01:32'),
(153, '713706', 1, 15, '2022-04-07 12:01:34'),
(154, '713706', 2, 31, '2022-04-07 12:01:34'),
(155, '713706', 1, 15, '2022-04-07 12:01:35'),
(156, '713706', 2, 38, '2022-04-07 12:01:35'),
(157, '713706', 1, 20, '2022-04-07 12:01:36'),
(158, '713706', 2, 48, '2022-04-07 12:01:36'),
(159, '713706', 1, 17, '2022-04-07 12:01:37'),
(160, '713706', 2, 32, '2022-04-07 12:01:37'),
(161, '713706', 1, 19, '2022-04-07 12:01:38'),
(162, '713706', 2, 30, '2022-04-07 12:01:38'),
(163, '713706', 1, 19, '2022-04-07 12:01:40'),
(164, '713706', 2, 30, '2022-04-07 12:01:40'),
(165, '713706', 1, 16, '2022-04-07 12:01:41'),
(166, '713706', 2, 49, '2022-04-07 12:01:41'),
(167, '713706', 1, 17, '2022-04-07 12:01:43'),
(168, '713706', 2, 47, '2022-04-07 12:01:43'),
(169, '713706', 1, 18, '2022-04-07 12:01:44'),
(170, '713706', 2, 48, '2022-04-07 12:01:44'),
(171, '713706', 1, 18, '2022-04-07 12:01:46'),
(172, '713706', 2, 34, '2022-04-07 12:01:46'),
(173, '713706', 1, 15, '2022-04-07 12:01:47'),
(174, '713706', 2, 42, '2022-04-07 12:01:47'),
(175, '713706', 1, 18, '2022-04-07 12:01:49'),
(176, '713706', 2, 45, '2022-04-07 12:01:49'),
(177, '713706', 1, 15, '2022-04-07 12:01:50'),
(178, '713706', 2, 44, '2022-04-07 12:01:50'),
(179, '713706', 1, 20, '2022-04-07 12:01:52'),
(180, '713706', 2, 44, '2022-04-07 12:01:52'),
(181, '713706', 1, 20, '2022-04-07 12:01:53'),
(182, '713706', 2, 31, '2022-04-07 12:01:53'),
(183, '713706', 1, 20, '2022-04-07 12:01:55'),
(184, '713706', 2, 30, '2022-04-07 12:01:55'),
(185, '713706', 1, 21, '2022-04-07 12:01:56'),
(186, '713706', 2, 30, '2022-04-07 12:01:56'),
(187, '713706', 1, 18, '2022-04-07 12:01:57'),
(188, '713706', 2, 43, '2022-04-07 12:01:57'),
(189, '713706', 1, 19, '2022-04-07 12:01:59'),
(190, '713706', 2, 41, '2022-04-07 12:01:59'),
(191, '713706', 1, 18, '2022-04-07 12:02:00'),
(192, '713706', 2, 32, '2022-04-07 12:02:00'),
(193, '713706', 1, 18, '2022-04-07 12:02:01'),
(194, '713706', 2, 45, '2022-04-07 12:02:01'),
(195, '713706', 1, 17, '2022-04-07 12:02:02'),
(196, '713706', 2, 36, '2022-04-07 12:02:02'),
(197, '713706', 1, 20, '2022-04-07 12:02:03'),
(198, '713706', 2, 46, '2022-04-07 12:02:03'),
(199, '713706', 1, 16, '2022-04-07 12:02:05'),
(200, '713706', 2, 47, '2022-04-07 12:02:05'),
(201, '713706', 1, 20, '2022-04-07 12:02:06'),
(202, '713706', 2, 47, '2022-04-07 12:02:06'),
(203, '713706', 1, 20, '2022-04-07 12:02:07'),
(204, '713706', 2, 46, '2022-04-07 12:02:07'),
(205, '713706', 1, 16, '2022-04-07 12:02:08'),
(206, '713706', 2, 40, '2022-04-07 12:02:08'),
(207, '713706', 1, 19, '2022-04-07 12:02:09'),
(208, '713706', 2, 30, '2022-04-07 12:02:09'),
(209, '713706', 1, 18, '2022-04-07 12:02:11'),
(210, '713706', 2, 36, '2022-04-07 12:02:11'),
(215, '713706', 1, 19, '2022-04-08 10:09:43'),
(216, '713706', 2, 44, '2022-04-08 10:09:43'),
(217, '713706', 1, 19, '2022-04-08 10:09:45'),
(218, '713706', 2, 38, '2022-04-08 10:09:45'),
(219, '713705', 1, -21.28, '2022-04-08 10:21:58'),
(220, '713705', 2, -127, '2022-04-08 10:21:58'),
(221, '713705', 3, 0, '2022-04-08 10:21:58'),
(222, '713705', 1, -21.28, '2022-04-08 10:22:00'),
(223, '713705', 2, -127, '2022-04-08 10:22:00'),
(224, '713705', 3, 0, '2022-04-08 10:22:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alerts`
--
ALTER TABLE `alerts`
  ADD PRIMARY KEY (`alert_id`);

--
-- Index pour la table `listBalise`
--
ALTER TABLE `listBalise`
  ADD PRIMARY KEY (`balise_id`);

--
-- Index pour la table `listSensors`
--
ALTER TABLE `listSensors`
  ADD PRIMARY KEY (`sensor_id`);

--
-- Index pour la table `sensorsCalbr`
--
ALTER TABLE `sensorsCalbr`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sensorsValues`
--
ALTER TABLE `sensorsValues`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `alerts`
--
ALTER TABLE `alerts`
  MODIFY `alert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `listBalise`
--
ALTER TABLE `listBalise`
  MODIFY `balise_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `listSensors`
--
ALTER TABLE `listSensors`
  MODIFY `sensor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `sensorsCalbr`
--
ALTER TABLE `sensorsCalbr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `sensorsValues`
--
ALTER TABLE `sensorsValues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
