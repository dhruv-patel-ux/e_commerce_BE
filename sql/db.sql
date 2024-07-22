-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2024 at 10:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `productId` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Mobile', 'This Is mobile Categpry.', '2024-07-21 11:37:24.029784', '2024-07-21 12:33:10.000000'),
(3, 'T.V', 'T.V', '2024-07-21 21:33:38.249104', '2024-07-21 21:33:38.249104');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `shippingAddress` varchar(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `uuid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `totalAmount`, `shippingAddress`, `paymentMethod`, `status`, `userId`, `createdAt`, `updatedAt`, `uuid`) VALUES
(1, 24000.00, '', 'stripe', 'shipped', 1, '2024-07-22 06:14:44.840561', '2024-07-22 06:50:46.000000', ''),
(2, 32000.00, 'Ahmedabad', 'stripe', 'processing', 1, '2024-07-22 06:18:14.704486', '2024-07-22 06:50:37.000000', '664a2dba-3c0b-48f5-88d0-68c396f48ad9'),
(3, 8000.00, 'nidhi apartment 24', 'stripe', 'pending', 1, '2024-07-22 06:59:15.137267', '2024-07-22 06:59:15.000000', 'dc9f8199-58e5-42fd-9f9a-0480ae59e130'),
(4, 16000.00, 'palanpur, 385520', 'stripe', 'pending', 1, '2024-07-22 08:37:16.635566', '2024-07-22 08:37:16.000000', '19607052-91c6-481c-8641-c8ac3355463c');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `ordersId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `quantity`, `price`, `orderId`, `productId`, `ordersId`) VALUES
(2, 2, 12000.00, 1, 4, 1),
(3, 2, 12000.00, 2, 4, 2),
(4, 1, 8000.00, 2, 5, 2),
(5, 1, 8000.00, 3, 5, 3),
(6, 2, 8000.00, 4, 5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `tag` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `inStock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `image`, `createdAt`, `updatedAt`, `tag`, `category`, `inStock`) VALUES
(4, 'oppo', 'oppo A24', 12000, '/products/1721584083807-png-transparent-vivo-2023-smartphone-feature-phone-mobile-phones-artist-growth-smartphone-android-phone.png', '2024-07-21 17:48:03.820215', '2024-07-21 17:48:03.820215', 2, 1, 1),
(5, 'mi', 'mi note8', 8000, '/products/1721584113114-pngtree-mobile-phone-png-smartphone-camera-mockup-png-image_3009179.jpg', '2024-07-21 17:48:33.121779', '2024-07-21 17:48:33.121779', 2, 1, 1),
(6, 'vivo', 'vivo', 1233, '/products/1721584439270-png-transparent-vivo-2023-smartphone-feature-phone-mobile-phones-artist-growth-smartphone-android-phone.png', '2024-07-21 17:53:59.278661', '2024-07-21 17:53:59.278661', 2, 1, 1),
(7, 'vivo y20', 'vivoy20', 12000, '/products/1721584465293-pngtree-mobile-phone-png-smartphone-camera-mockup-png-image_3009179.jpg', '2024-07-21 17:54:25.301992', '2024-07-21 17:54:25.301992', 2, 1, 1),
(8, 'T.V', 'T.v', 12000, '/products/1721597658025-speed.jpg', '2024-07-21 21:34:18.033247', '2024-07-21 21:34:18.033247', 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `rating` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `orderId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `userId`, `rating`, `comment`, `createdAt`, `updatedAt`, `orderId`) VALUES
(1, '1', '4', 'This is good product', '2024-07-22 08:15:27.245902', '2024-07-22 08:15:27.245902', ''),
(2, '1', '4', 'Review', '2024-07-22 08:36:26.987571', '2024-07-22 08:36:26.987571', 'dc9f8199-58e5-42fd-9f9a-0480ae59e130');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `colour` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`, `colour`, `createdAt`, `updatedAt`) VALUES
(2, 'Test Tag', '#cd8989', '2024-07-21 13:40:21.888848', '2024-07-21 13:40:21.888848');

-- --------------------------------------------------------

--
-- Table structure for table `transection_history`
--

CREATE TABLE `transection_history` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `sessionId` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transection_history`
--

INSERT INTO `transection_history` (`id`, `uuid`, `name`, `price`, `quantity`, `status`, `sessionId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '28427495-5bb7-441b-9c74-5f14f1ca9656', 'oppo', 20000, 1, 'pending', 'cs_test_a1uGLtGvmkfv1iaA2p2RBlSe0cxftI918a7GUmunmhmyhhT1GC6g9gU8KL', 2, '2024-07-21 20:35:32.475164', '2024-07-21 20:35:34.000000'),
(2, '7316c414-74ed-4746-a3b1-c995e94414ac', 'oppo', 20000, 1, 'complete', 'cs_test_a1ieVN8ZQiaeZ5FP5JnKX6cVZabgErqKBHVDRP4VQCmi3eP7XAYkWrmHOT', 2, '2024-07-21 20:38:18.252330', '2024-07-21 20:45:26.000000'),
(3, 'f82c12d9-5840-4902-be18-833e757a830b', 'oppo', 36000, 1, 'complete', 'cs_test_a1PJHhn2h8IFePpiFLOlU8qGihuk5sOcokkKkeCcdSkuKVJZQjJwXB0OAM', 2, '2024-07-21 21:31:29.041793', '2024-07-21 21:31:48.000000'),
(4, 'a9b64f86-73cf-409e-8fa1-4521d62409c2', 'dhruv', 24000, 1, 'complete', 'cs_test_a1vQIvJGGU24x2IcjutJuEVdqh7ycMTF6XBQG9753SNSbNey4CO4dHzgH6', 2, '2024-07-22 05:47:10.643443', '2024-07-22 05:47:59.000000'),
(5, 'b9c6e4b7-d3f0-46b4-8ace-a187ea3bdf8d', 'admin', 24000, 1, 'complete', 'cs_test_a14IAVgUWWtbubTyKAqPHOti5Yoze5vqdIr1FllXGD89LhF5RtGNpLFbVa', 1, '2024-07-22 06:14:44.877863', '2024-07-22 06:15:05.000000'),
(6, '664a2dba-3c0b-48f5-88d0-68c396f48ad9', 'admin', 32000, 1, 'complete', 'cs_test_a1i6Y08WIJhuyZjPiZDXZWwmpYosLssJjzPyfSWBarfPKgZz7nThF5GOlJ', 1, '2024-07-22 06:18:14.762956', '2024-07-22 06:18:34.000000'),
(7, 'dc9f8199-58e5-42fd-9f9a-0480ae59e130', 'admin', 8000, 1, 'complete', 'cs_test_a1FCYCSzKWoarkSXqu5fFEV7l2In5vxXtRa0MINiFiD6y8uXuhXVeIAGzI', 1, '2024-07-22 06:59:15.168580', '2024-07-22 06:59:35.000000'),
(8, '19607052-91c6-481c-8641-c8ac3355463c', 'admin', 16000, 1, 'complete', 'cs_test_a1SG9sn3Kwt4JhVEv7uQpPalFlPPRIv4x8h14mZ6Vbs1KtA1nAo7RQakot', 1, '2024-07-22 08:37:16.680861', '2024-07-22 08:37:42.000000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `roleId`, `firstname`, `lastname`, `email`, `password`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'admin', 'admin', 'admin@gmail.com', '$2b$10$NRN4jHP3W97wHj8/zeF1TOjBLb02oTlt8sKvFAc9Bb6EBU9yDF8Ue', '8799067316', '2024-07-20 08:46:47.314996', '2024-07-20 16:58:15.485609'),
(2, 2, 'dhruv', 'patel', 'dhruv@123.com', '$2b$10$h5o6Oyt2UrDIzXc56/nVr.SPI5gEI2nvCPHnLeVCoTrvxc9/8Rigm', '1234567890', '2024-07-21 19:48:13.063045', '2024-07-21 19:48:13.063045');

-- --------------------------------------------------------

--
-- Table structure for table `users_roles_roles`
--

CREATE TABLE `users_roles_roles` (
  `usersId` int(11) NOT NULL,
  `rolesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_151b79a83ba240b0cb31b2302d1` (`userId`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_06d0e6e384ec14ec04a319356c6` (`ordersId`),
  ADD KEY `FK_904370c093ceea4369659a3c810` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transection_history`
--
ALTER TABLE `transection_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- Indexes for table `users_roles_roles`
--
ALTER TABLE `users_roles_roles`
  ADD PRIMARY KEY (`usersId`,`rolesId`),
  ADD KEY `IDX_df951a64f09865171d2d7a502b` (`usersId`),
  ADD KEY `IDX_b2f0366aa9349789527e0c36d9` (`rolesId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transection_history`
--
ALTER TABLE `transection_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_151b79a83ba240b0cb31b2302d1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FK_06d0e6e384ec14ec04a319356c6` FOREIGN KEY (`ordersId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_904370c093ceea4369659a3c810` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_roles_roles`
--
ALTER TABLE `users_roles_roles`
  ADD CONSTRAINT `FK_b2f0366aa9349789527e0c36d97` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_df951a64f09865171d2d7a502b1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
