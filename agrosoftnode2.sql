-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-04-2025 a las 05:10:37
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agrosoftnode2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` int NOT NULL,
  `fk_Cultivos` int NOT NULL,
  `fk_Usuarios` bigint NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date NOT NULL,
  `estado` enum('Asignada','Completada','Cancelada') NOT NULL DEFAULT (_cp850'Asignada')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id`, `fk_Cultivos`, `fk_Usuarios`, `titulo`, `descripcion`, `fecha`, `estado`) VALUES
(1, 1, 1084331731, 'kkk', 'ghg', '2025-04-01', 'Asignada'),
(20, 20, 1084331730, 'Riego', 'Riego por goteo matutino', '2025-04-10', 'Completada'),
(21, 21, 1084331731, 'Fertilización', 'Aplicación de abono orgánico', '2025-04-12', 'Asignada'),
(22, 22, 1084331732, 'Control plagas', 'Inspección semanal', '2025-04-15', 'Asignada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afecciones`
--

CREATE TABLE `afecciones` (
  `id` int NOT NULL,
  `fk_Plantaciones` int NOT NULL,
  `fk_Plagas` int NOT NULL,
  `fechaEncuentro` date NOT NULL,
  `estado` enum('SinTratamiento','EnControl','Eliminado') NOT NULL DEFAULT (_cp850'SinTratamiento')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `afecciones`
--

INSERT INTO `afecciones` (`id`, `fk_Plantaciones`, `fk_Plagas`, `fechaEncuentro`, `estado`) VALUES
(2, 1, 1, '2025-01-08', 'SinTratamiento'),
(20, 20, 20, '2025-04-08', 'EnControl'),
(21, 21, 21, '2025-04-05', 'SinTratamiento'),
(22, 22, 22, '2025-04-10', 'SinTratamiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `controles`
--

CREATE TABLE `controles` (
  `id` int NOT NULL,
  `fk_Afecciones` int NOT NULL,
  `fk_TiposControl` int NOT NULL,
  `descripcion` text NOT NULL,
  `fechaControl` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `controles`
--

INSERT INTO `controles` (`id`, `fk_Afecciones`, `fk_TiposControl`, `descripcion`, `fechaControl`) VALUES
(20, 20, 20, 'Liberación de crisopas', '2025-04-11'),
(21, 21, 21, 'Aplicación de fungicida', '2025-04-13'),
(22, 22, 22, 'Rotación de cultivos planificada', '2025-04-16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cosechas`
--

CREATE TABLE `cosechas` (
  `id` int NOT NULL,
  `fk_Cultivos` int NOT NULL,
  `unidades` int NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cosechas`
--

INSERT INTO `cosechas` (`id`, `fk_Cultivos`, `unidades`, `fecha`) VALUES
(1, 1, 12, '2025-04-01'),
(20, 20, 120, '2025-06-15'),
(21, 21, 180, '2025-05-25'),
(22, 22, 90, '2025-08-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cultivos`
--

CREATE TABLE `cultivos` (
  `id` int NOT NULL,
  `fk_Especies` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `unidades` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT (1),
  `fechaSiembra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cultivos`
--

INSERT INTO `cultivos` (`id`, `fk_Especies`, `nombre`, `unidades`, `activo`, `fechaSiembra`) VALUES
(1, 1, 'mt 09', 50, 1, '2025-03-03'),
(20, 20, 'Tomate Cherry', 150, 1, '2025-04-01'),
(21, 21, 'Fresa Camarosa', 200, 1, '2025-03-20'),
(22, 22, 'Maíz Amarillo', 100, 1, '2025-04-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desechos`
--

CREATE TABLE `desechos` (
  `id` int NOT NULL,
  `fk_Cultivos` int NOT NULL,
  `fk_TiposDesecho` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `desechos`
--

INSERT INTO `desechos` (`id`, `fk_Cultivos`, `fk_TiposDesecho`, `nombre`, `descripcion`) VALUES
(1, 1, 1, 'mata malezas', 'sdfs'),
(20, 20, 20, 'Restos poda tomate', 'Tallos y hojas de poda'),
(21, 21, 21, 'Cubierta plástica', 'Plástico de acolchado usado'),
(22, 22, 22, 'Envases fertilizante', 'Envases vacíos NPK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eras`
--

CREATE TABLE `eras` (
  `id` int NOT NULL,
  `fk_Lotes` int NOT NULL,
  `tamX` decimal(3,2) NOT NULL,
  `tamY` decimal(3,2) NOT NULL,
  `posX` decimal(3,2) NOT NULL,
  `posY` decimal(3,2) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT (1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `eras`
--

INSERT INTO `eras` (`id`, `fk_Lotes`, `tamX`, `tamY`, `posX`, `posY`, `estado`) VALUES
(1, 1, 1.00, 1.00, 1.00, 1.00, 1),
(20, 20, 2.00, 1.50, 1.00, 1.00, 1),
(21, 21, 1.80, 1.20, 1.00, 1.00, 1),
(22, 22, 1.50, 1.50, 1.00, 1.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especies`
--

CREATE TABLE `especies` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `tiempoCrecimiento` int NOT NULL,
  `fk_TiposEspecie` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `especies`
--

INSERT INTO `especies` (`id`, `nombre`, `descripcion`, `img`, `tiempoCrecimiento`, `fk_TiposEspecie`) VALUES
(1, 'asd', 'asd', 'asd', 23, 1),
(20, 'Tomate', 'Solanum lycopersicum', 'tomate.jpg', 90, 20),
(21, 'Fresa', 'Fragaria × ananassa', 'fresa.jpg', 60, 21),
(22, 'Maíz', 'Zea mays', 'maiz.jpg', 120, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evapotranspiraciones`
--

CREATE TABLE `evapotranspiraciones` (
  `id` int NOT NULL,
  `fk_Lotes` int NOT NULL,
  `fecha` datetime NOT NULL,
  `milimetrosMCuadrado` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `herramientas`
--

CREATE TABLE `herramientas` (
  `id` int NOT NULL,
  `fk_Lotes` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `unidades` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `herramientas`
--

INSERT INTO `herramientas` (`id`, `fk_Lotes`, `nombre`, `descripcion`, `unidades`) VALUES
(1, 1, 'asd', 'asd', 12),
(20, 20, 'Pala', 'Pala de mango corto', 5),
(21, 21, 'Tijeras podar', 'Tijeras profesionales', 3),
(22, 22, 'Rastrillo', 'Rastrillo metálico', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horasmensuales`
--

CREATE TABLE `horasmensuales` (
  `id` int NOT NULL,
  `fk_Pasantes` int NOT NULL,
  `minutos` int NOT NULL,
  `salario` int NOT NULL,
  `mes` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` int NOT NULL,
  `unidades` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`id`, `nombre`, `descripcion`, `precio`, `unidades`) VALUES
(20, 'Fertilizante NPK', '15-15-15 balanceado', 45000, 25),
(21, 'Sustrato', 'Mezcla para semilleros', 18000, 40),
(22, 'Macetas', 'Macetas biodegradables', 1200, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `id` int NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `descripcion` text NOT NULL,
  `tamX` tinyint NOT NULL,
  `tamY` tinyint NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT (1),
  `posX` decimal(3,2) NOT NULL,
  `posY` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `lotes`
--

INSERT INTO `lotes` (`id`, `nombre`, `descripcion`, `tamX`, `tamY`, `estado`, `posX`, `posY`) VALUES
(1, 'm1', 'asdsad', 1, 1, 1, 2.40, 2.20),
(20, 'Lote A', 'Principal de hortalizas', 2, 2, 1, 0.00, 0.00),
(21, 'Lote B', 'Secundario frutales', 2, 1, 1, 1.00, 0.00),
(22, 'Lote C', 'Experimental', 2, 1, 1, 2.00, 2.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasantes`
--

CREATE TABLE `pasantes` (
  `id` int NOT NULL,
  `fk_Usuarios` bigint NOT NULL,
  `fechaInicioPasantia` date NOT NULL,
  `fechaFinalizacion` date NOT NULL,
  `salarioHora` int NOT NULL,
  `area` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plagas`
--

CREATE TABLE `plagas` (
  `id` int NOT NULL,
  `fk_TiposPlaga` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plagas`
--

INSERT INTO `plagas` (`id`, `fk_TiposPlaga`, `nombre`, `descripcion`, `img`) VALUES
(1, 1, 'mt 09', 'asd', 'aa'),
(20, 20, 'Mosca blanca', 'Bemisia tabaci', 'mosca-blanca.jpg'),
(21, 21, 'Mildiu', 'Phytophthora infestans', 'mildiu.jpg'),
(22, 22, 'Marchitez', 'Ralstonia solanacearum', 'marchitez.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantaciones`
--

CREATE TABLE `plantaciones` (
  `id` int NOT NULL,
  `fk_Cultivos` int NOT NULL,
  `fk_Eras` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plantaciones`
--

INSERT INTO `plantaciones` (`id`, `fk_Cultivos`, `fk_Eras`) VALUES
(1, 1, 1),
(20, 20, 20),
(21, 21, 21),
(22, 22, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precipitaciones`
--

CREATE TABLE `precipitaciones` (
  `id` int NOT NULL,
  `fk_Lotes` int NOT NULL,
  `fecha` datetime NOT NULL,
  `mm` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productoscontrol`
--

CREATE TABLE `productoscontrol` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `precio` int NOT NULL,
  `compuestoActivo` varchar(20) NOT NULL,
  `fichaTecnica` text NOT NULL,
  `contenido` int NOT NULL,
  `tipoContenido` varchar(10) NOT NULL,
  `unidades` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productoscontrol`
--

INSERT INTO `productoscontrol` (`id`, `nombre`, `precio`, `compuestoActivo`, `fichaTecnica`, `contenido`, `tipoContenido`, `unidades`) VALUES
(20, 'Insecticida Bio', 35000, 'Bacillus ', 'Para larvas de lepidópteros', 500, 'ml', 10),
(21, 'Fungicida Cobre', 28000, 'Oxicloruro', 'Preventivo de hongos', 250, 'g', 15),
(22, 'Jabón Potásico', 15000, 'Potasio', 'Control de insectos blandos', 1000, 'ml', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semilleros`
--

CREATE TABLE `semilleros` (
  `id` int NOT NULL,
  `fk_Especies` int NOT NULL,
  `unidades` int NOT NULL,
  `fechaSiembra` date NOT NULL,
  `fechaEstimada` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `semilleros`
--

INSERT INTO `semilleros` (`id`, `fk_Especies`, `unidades`, `fechaSiembra`, `fechaEstimada`) VALUES
(1, 1, 12, '2025-04-08', '2025-04-01'),
(20, 20, 200, '2025-04-01', '2025-04-20'),
(21, 21, 300, '2025-03-25', '2025-04-15'),
(22, 22, 150, '2025-04-05', '2025-04-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensores`
--

CREATE TABLE `sensores` (
  `id` int NOT NULL,
  `tipo_sensor` enum('Temperatura','Iluminación','Humedad Ambiental','Humedad del Terreno','Nivel de PH','Viento','Lluvia') NOT NULL,
  `datos_sensor` float NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `era_id` int DEFAULT NULL,
  `lote_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sensores`
--

INSERT INTO `sensores` (`id`, `tipo_sensor`, `datos_sensor`, `fecha`, `era_id`, `lote_id`) VALUES
(2, 'Temperatura', 52.25, '2025-04-06 22:29:36', NULL, 1),
(3, 'Humedad del Terreno', 33.5, '2025-04-06 22:29:36', 1, NULL),
(4, 'Iluminación', 51.26, '2025-04-06 22:29:36', NULL, 1),
(5, 'Temperatura', 4.19, '2025-04-06 22:29:26', 1, 1),
(7, 'Temperatura', 14.86, '2025-04-06 22:29:36', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposcontrol`
--

CREATE TABLE `tiposcontrol` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tiposcontrol`
--

INSERT INTO `tiposcontrol` (`id`, `nombre`, `descripcion`) VALUES
(20, 'Biológico', 'Control con depredadores naturales'),
(21, 'Químico', 'Uso de pesticidas autorizados'),
(22, 'Cultural', 'Métodos de prevención agrícola');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposdesecho`
--

CREATE TABLE `tiposdesecho` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tiposdesecho`
--

INSERT INTO `tiposdesecho` (`id`, `nombre`, `descripcion`) VALUES
(1, 'ARBENCE', 'asda'),
(20, 'Orgánico', 'Restos vegetales compostables'),
(21, 'Plástico', 'Materiales de invernadero'),
(22, 'Químico', 'Envases de productos fitosanitarios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposespecie`
--

CREATE TABLE `tiposespecie` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tiposespecie`
--

INSERT INTO `tiposespecie` (`id`, `nombre`, `descripcion`, `img`) VALUES
(1, 'mksks', 'asdasd', 'adas'),
(20, 'Hortaliza', 'Vegetales de huerta', 'hortaliza.jpg'),
(21, 'Fruta', 'Árboles frutales', 'fruta.jpg'),
(22, 'Cereal', 'Granos básicos', 'cereal.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposplaga`
--

CREATE TABLE `tiposplaga` (
  `id` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tiposplaga`
--

INSERT INTO `tiposplaga` (`id`, `nombre`, `descripcion`, `img`) VALUES
(1, 'ARBENCE', 'assa', 'nada'),
(20, 'Insecto', 'Plagas de insectos', 'insecto.jpg'),
(21, 'Hongo', 'Enfermedades fúngicas', 'hongo.jpg'),
(22, 'Bacteria', 'Infecciones bacterianas', 'bacteria.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `umbrales`
--

CREATE TABLE `umbrales` (
  `id` int NOT NULL,
  `sensor_id` int NOT NULL,
  `valor_minimo` float NOT NULL,
  `valor_maximo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `umbrales`
--

INSERT INTO `umbrales` (`id`, `sensor_id`, `valor_minimo`, `valor_maximo`) VALUES
(8, 2, 15, 61);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidadmedida`
--

CREATE TABLE `unidadmedida` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `unidadmedida`
--

INSERT INTO `unidadmedida` (`id`, `nombre`) VALUES
(1, 'celcius'),
(2, 'farenheith');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usoproductocontrol`
--

CREATE TABLE `usoproductocontrol` (
  `id` int NOT NULL,
  `fk_ProductosControl` int NOT NULL,
  `fk_Controles` int NOT NULL,
  `cantidadProducto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usoproductocontrol`
--

INSERT INTO `usoproductocontrol` (`id`, `fk_ProductosControl`, `fk_Controles`, `cantidadProducto`) VALUES
(20, 20, 20, 2),
(21, 21, 21, 3),
(22, 22, 22, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usosherramientas`
--

CREATE TABLE `usosherramientas` (
  `id` int NOT NULL,
  `fk_Herramientas` int NOT NULL,
  `fk_Actividades` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usosherramientas`
--

INSERT INTO `usosherramientas` (`id`, `fk_Herramientas`, `fk_Actividades`) VALUES
(20, 20, 20),
(21, 21, 21),
(22, 22, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usosproductos`
--

CREATE TABLE `usosproductos` (
  `id` int NOT NULL,
  `fk_Insumos` int NOT NULL,
  `fk_Actividades` int NOT NULL,
  `cantidadProducto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usosproductos`
--

INSERT INTO `usosproductos` (`id`, `fk_Insumos`, `fk_Actividades`, `cantidadProducto`) VALUES
(20, 20, 20, 5),
(21, 21, 21, 10),
(22, 22, 22, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `identificacion` bigint NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correoElectronico` varchar(200) NOT NULL,
  `passwordHash` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT (0),
  `estado` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`identificacion`, `nombre`, `apellidos`, `fechaNacimiento`, `telefono`, `correoElectronico`, `passwordHash`, `admin`, `estado`) VALUES
(1084331730, 'maiber', 'cordoba', '2025-03-04', '3202020220', 'maiber@gmail.com', '123', 1, 'activo'),
(1084331731, 'admin', 'cordoba', '1993-08-05', '3198765432', 'admin@gmail.com', '$2b$10$1MAQ8K.jXpJ6mTHAsNBL5uhiTSYY.WCrAhhk7IpAc1VGQgaSfl9tK', 0, 'activo'),
(1084331732, 'prueba', 'jwt', '1993-08-05', '3198765432', 'prueba@gmail.com', '$2y$10$MRzcFDpQxg02VI2wH1Nv4ujBHhUygdf5/qrERSqDMnRKgJE4jL2pi', 0, 'activo'),
(1084331733, 'asd', 'asd', '2025-04-09', '32333213213321', 'asd@gmail.com', '$2b$10$WeEStjfmKQFZuDoxS6WOWOXupoIz0g9owNWvT9pO1eoci1UoNQWuO', 0, 'inactivo'),
(10545454554, 'keiner', 'asd', '2025-05-01', '3243232322', 'keiner@gmail.com', '$2b$10$.2aQd8gGCLboBSikqeAvyukfqcX0WsfOT14kfGSkZV8yB3sBqYBGG', 0, 'inactivo'),
(105454545541, 'asddd', 'asd', '2025-04-16', '3243232322', 'Laiber@gmail.com', '$2b$10$IU.Y8ytfiJxqm8a1lsTPn.ylG7ENyjpZXjSCqfSrt6Xzdk8sonesG', 0, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int NOT NULL,
  `fk_Cosechas` int NOT NULL,
  `precioUnitario` int NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `fk_Cosechas`, `precioUnitario`, `fecha`) VALUES
(1, 1, 233333, '2024-10-10'),
(20, 20, 5000, '2025-06-20'),
(21, 21, 8000, '2025-05-30'),
(22, 22, 3000, '2025-08-15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Cultivos` (`fk_Cultivos`),
  ADD KEY `fk_Usuarios` (`fk_Usuarios`);

--
-- Indices de la tabla `afecciones`
--
ALTER TABLE `afecciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Plantaciones` (`fk_Plantaciones`),
  ADD KEY `fk_Plagas` (`fk_Plagas`);

--
-- Indices de la tabla `controles`
--
ALTER TABLE `controles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Afecciones` (`fk_Afecciones`),
  ADD KEY `fk_TiposControl` (`fk_TiposControl`);

--
-- Indices de la tabla `cosechas`
--
ALTER TABLE `cosechas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Cultivos` (`fk_Cultivos`);

--
-- Indices de la tabla `cultivos`
--
ALTER TABLE `cultivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Especies` (`fk_Especies`);

--
-- Indices de la tabla `desechos`
--
ALTER TABLE `desechos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Cultivos` (`fk_Cultivos`),
  ADD KEY `fk_TiposDesecho` (`fk_TiposDesecho`);

--
-- Indices de la tabla `eras`
--
ALTER TABLE `eras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Lotes` (`fk_Lotes`);

--
-- Indices de la tabla `especies`
--
ALTER TABLE `especies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `esUna` (`fk_TiposEspecie`);

--
-- Indices de la tabla `evapotranspiraciones`
--
ALTER TABLE `evapotranspiraciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Lotes` (`fk_Lotes`);

--
-- Indices de la tabla `herramientas`
--
ALTER TABLE `herramientas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Lotes` (`fk_Lotes`);

--
-- Indices de la tabla `horasmensuales`
--
ALTER TABLE `horasmensuales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Pasantes` (`fk_Pasantes`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pasantes`
--
ALTER TABLE `pasantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Usuarios` (`fk_Usuarios`);

--
-- Indices de la tabla `plagas`
--
ALTER TABLE `plagas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_TiposPlaga` (`fk_TiposPlaga`);

--
-- Indices de la tabla `plantaciones`
--
ALTER TABLE `plantaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Cultivos` (`fk_Cultivos`),
  ADD KEY `fk_Eras` (`fk_Eras`);

--
-- Indices de la tabla `precipitaciones`
--
ALTER TABLE `precipitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Lotes` (`fk_Lotes`);

--
-- Indices de la tabla `productoscontrol`
--
ALTER TABLE `productoscontrol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `semilleros`
--
ALTER TABLE `semilleros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `esDe` (`fk_Especies`);

--
-- Indices de la tabla `sensores`
--
ALTER TABLE `sensores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_era_id` (`era_id`),
  ADD KEY `fk_lote_id` (`lote_id`);

--
-- Indices de la tabla `tiposcontrol`
--
ALTER TABLE `tiposcontrol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiposdesecho`
--
ALTER TABLE `tiposdesecho`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiposespecie`
--
ALTER TABLE `tiposespecie`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiposplaga`
--
ALTER TABLE `tiposplaga`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `umbrales`
--
ALTER TABLE `umbrales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sensor_id` (`sensor_id`);

--
-- Indices de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `usoproductocontrol`
--
ALTER TABLE `usoproductocontrol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ProductosControl` (`fk_ProductosControl`),
  ADD KEY `fk_Controles` (`fk_Controles`);

--
-- Indices de la tabla `usosherramientas`
--
ALTER TABLE `usosherramientas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Herramientas` (`fk_Herramientas`),
  ADD KEY `fk_Actividades` (`fk_Actividades`);

--
-- Indices de la tabla `usosproductos`
--
ALTER TABLE `usosproductos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Insumos` (`fk_Insumos`),
  ADD KEY `fk_Actividades` (`fk_Actividades`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`identificacion`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Cosechas` (`fk_Cosechas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `afecciones`
--
ALTER TABLE `afecciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `controles`
--
ALTER TABLE `controles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `cosechas`
--
ALTER TABLE `cosechas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `cultivos`
--
ALTER TABLE `cultivos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `desechos`
--
ALTER TABLE `desechos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `eras`
--
ALTER TABLE `eras`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `especies`
--
ALTER TABLE `especies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `evapotranspiraciones`
--
ALTER TABLE `evapotranspiraciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `herramientas`
--
ALTER TABLE `herramientas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `horasmensuales`
--
ALTER TABLE `horasmensuales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `pasantes`
--
ALTER TABLE `pasantes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plagas`
--
ALTER TABLE `plagas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `plantaciones`
--
ALTER TABLE `plantaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `precipitaciones`
--
ALTER TABLE `precipitaciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productoscontrol`
--
ALTER TABLE `productoscontrol`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `semilleros`
--
ALTER TABLE `semilleros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `sensores`
--
ALTER TABLE `sensores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tiposcontrol`
--
ALTER TABLE `tiposcontrol`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tiposdesecho`
--
ALTER TABLE `tiposdesecho`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tiposespecie`
--
ALTER TABLE `tiposespecie`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tiposplaga`
--
ALTER TABLE `tiposplaga`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `umbrales`
--
ALTER TABLE `umbrales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usoproductocontrol`
--
ALTER TABLE `usoproductocontrol`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usosherramientas`
--
ALTER TABLE `usosherramientas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usosproductos`
--
ALTER TABLE `usosproductos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`fk_Cultivos`) REFERENCES `cultivos` (`id`),
  ADD CONSTRAINT `actividades_ibfk_2` FOREIGN KEY (`fk_Usuarios`) REFERENCES `usuarios` (`identificacion`);

--
-- Filtros para la tabla `afecciones`
--
ALTER TABLE `afecciones`
  ADD CONSTRAINT `afecciones_ibfk_1` FOREIGN KEY (`fk_Plantaciones`) REFERENCES `plantaciones` (`id`),
  ADD CONSTRAINT `afecciones_ibfk_2` FOREIGN KEY (`fk_Plagas`) REFERENCES `plagas` (`id`);

--
-- Filtros para la tabla `controles`
--
ALTER TABLE `controles`
  ADD CONSTRAINT `controles_ibfk_1` FOREIGN KEY (`fk_Afecciones`) REFERENCES `afecciones` (`id`),
  ADD CONSTRAINT `controles_ibfk_2` FOREIGN KEY (`fk_TiposControl`) REFERENCES `tiposcontrol` (`id`);

--
-- Filtros para la tabla `cosechas`
--
ALTER TABLE `cosechas`
  ADD CONSTRAINT `cosechas_ibfk_1` FOREIGN KEY (`fk_Cultivos`) REFERENCES `cultivos` (`id`);

--
-- Filtros para la tabla `cultivos`
--
ALTER TABLE `cultivos`
  ADD CONSTRAINT `cultivos_ibfk_1` FOREIGN KEY (`fk_Especies`) REFERENCES `especies` (`id`);

--
-- Filtros para la tabla `desechos`
--
ALTER TABLE `desechos`
  ADD CONSTRAINT `desechos_ibfk_1` FOREIGN KEY (`fk_Cultivos`) REFERENCES `cultivos` (`id`),
  ADD CONSTRAINT `desechos_ibfk_2` FOREIGN KEY (`fk_TiposDesecho`) REFERENCES `tiposdesecho` (`id`);

--
-- Filtros para la tabla `eras`
--
ALTER TABLE `eras`
  ADD CONSTRAINT `eras_ibfk_1` FOREIGN KEY (`fk_Lotes`) REFERENCES `lotes` (`id`);

--
-- Filtros para la tabla `especies`
--
ALTER TABLE `especies`
  ADD CONSTRAINT `esUna` FOREIGN KEY (`fk_TiposEspecie`) REFERENCES `tiposespecie` (`id`);

--
-- Filtros para la tabla `evapotranspiraciones`
--
ALTER TABLE `evapotranspiraciones`
  ADD CONSTRAINT `evapotranspiraciones_ibfk_1` FOREIGN KEY (`fk_Lotes`) REFERENCES `lotes` (`id`);

--
-- Filtros para la tabla `herramientas`
--
ALTER TABLE `herramientas`
  ADD CONSTRAINT `herramientas_ibfk_1` FOREIGN KEY (`fk_Lotes`) REFERENCES `lotes` (`id`);

--
-- Filtros para la tabla `horasmensuales`
--
ALTER TABLE `horasmensuales`
  ADD CONSTRAINT `horasmensuales_ibfk_1` FOREIGN KEY (`fk_Pasantes`) REFERENCES `pasantes` (`id`);

--
-- Filtros para la tabla `pasantes`
--
ALTER TABLE `pasantes`
  ADD CONSTRAINT `pasantes_ibfk_1` FOREIGN KEY (`fk_Usuarios`) REFERENCES `usuarios` (`identificacion`);

--
-- Filtros para la tabla `plagas`
--
ALTER TABLE `plagas`
  ADD CONSTRAINT `plagas_ibfk_1` FOREIGN KEY (`fk_TiposPlaga`) REFERENCES `tiposplaga` (`id`);

--
-- Filtros para la tabla `plantaciones`
--
ALTER TABLE `plantaciones`
  ADD CONSTRAINT `plantaciones_ibfk_1` FOREIGN KEY (`fk_Cultivos`) REFERENCES `cultivos` (`id`),
  ADD CONSTRAINT `plantaciones_ibfk_2` FOREIGN KEY (`fk_Eras`) REFERENCES `eras` (`id`);

--
-- Filtros para la tabla `precipitaciones`
--
ALTER TABLE `precipitaciones`
  ADD CONSTRAINT `precipitaciones_ibfk_1` FOREIGN KEY (`fk_Lotes`) REFERENCES `lotes` (`id`);

--
-- Filtros para la tabla `semilleros`
--
ALTER TABLE `semilleros`
  ADD CONSTRAINT `esDe` FOREIGN KEY (`fk_Especies`) REFERENCES `especies` (`id`);

--
-- Filtros para la tabla `sensores`
--
ALTER TABLE `sensores`
  ADD CONSTRAINT `fk_era_id` FOREIGN KEY (`era_id`) REFERENCES `eras` (`id`),
  ADD CONSTRAINT `fk_lote_id` FOREIGN KEY (`lote_id`) REFERENCES `lotes` (`id`);

--
-- Filtros para la tabla `umbrales`
--
ALTER TABLE `umbrales`
  ADD CONSTRAINT `umbrales_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensores` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usoproductocontrol`
--
ALTER TABLE `usoproductocontrol`
  ADD CONSTRAINT `usoproductocontrol_ibfk_1` FOREIGN KEY (`fk_ProductosControl`) REFERENCES `productoscontrol` (`id`),
  ADD CONSTRAINT `usoproductocontrol_ibfk_2` FOREIGN KEY (`fk_Controles`) REFERENCES `controles` (`id`);

--
-- Filtros para la tabla `usosherramientas`
--
ALTER TABLE `usosherramientas`
  ADD CONSTRAINT `usosherramientas_ibfk_1` FOREIGN KEY (`fk_Herramientas`) REFERENCES `herramientas` (`id`),
  ADD CONSTRAINT `usosherramientas_ibfk_2` FOREIGN KEY (`fk_Actividades`) REFERENCES `actividades` (`id`);

--
-- Filtros para la tabla `usosproductos`
--
ALTER TABLE `usosproductos`
  ADD CONSTRAINT `usosproductos_ibfk_1` FOREIGN KEY (`fk_Insumos`) REFERENCES `insumos` (`id`),
  ADD CONSTRAINT `usosproductos_ibfk_2` FOREIGN KEY (`fk_Actividades`) REFERENCES `actividades` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`fk_Cosechas`) REFERENCES `cosechas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
