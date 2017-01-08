/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

# Dump of table likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `submits`;

CREATE TABLE `submits` (
  `id`      INT(11) UNSIGNED  NOT NULL AUTO_INCREMENT,
  `name`    VARCHAR(200)      NOT NULL DEFAULT '',
  `prename` VARCHAR(200)      NOT NULL DEFAULT '',
  `product` INT(11) UNSIGNED        NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

# Dump of table rezepte
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id`      INT(11) UNSIGNED  NOT NULL  AUTO_INCREMENT,
  `name`    VARCHAR(200)      NOT NULL  DEFAULT '',
  `text`    TEXT(1000)        NOT NULL  DEFAULT '',
  `image`   VARCHAR(200)      NOT NULL  DEFAULT '',
  `url`     VARCHAR(200)                DEFAULT '',
  `price`   decimal(6,2)      NOT NULL  DEFAULT 0,
  `rest`    decimal(6,2),
  `partial` BOOLEAN           NOT NULL  DEFAULT 1,
  `type`    BOOLEAN           NOT NULL  DEFAULT 0,
  `active`  BOOLEAN           NOT NULL  DEFAULT 0,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
#
# LOCK TABLES `rezepte` WRITE;
# /*!40000 ALTER TABLE `rezepte`
#   DISABLE KEYS */;
#
# INSERT INTO `rezepte` (`id`, `name`)
# VALUES
#   (1, 'Flammkuchen mit Räucherforelle'),
#   (2, 'Sennenrösti'),
#   (3, 'Spinat-Käsesuppe'),
#   (4, 'Appenzeller Käse mit Salat'),
#   (5, 'Käsefladen'),
#   (6, 'Gemüseauflauf'),
#   (7, 'Gefüllte Kalbsschnitzel');
#
# /*!40000 ALTER TABLE `rezepte`
#   ENABLE KEYS */;
# UNLOCK TABLES;

# Dump of table teilnehmer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teilnehmer`;

CREATE TABLE `teilnehmer` (
  `id`          INT(11)                 NOT NULL AUTO_INCREMENT,
  `firstName`   VARCHAR(100)            NOT NULL,
  `lastName`    VARCHAR(100)            NOT NULL,
  `street`      VARCHAR(100)            NOT NULL,
  `zip`         VARCHAR(100)            NOT NULL,
  `city`        VARCHAR(50)             NOT NULL,
  `email`       VARCHAR(100)            NOT NULL,
  `confirm`       BOOLEAN            NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
