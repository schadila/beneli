/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

# Dump of table likes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `id`          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rezept`      INT(11) UNSIGNED NOT NULL,
  `fingerprint` VARCHAR(32)      NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fingerprint` (`fingerprint`),
  KEY `rezept` (`rezept`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`rezept`) REFERENCES `rezepte` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

# Dump of table rezepte
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rezepte`;

CREATE TABLE `rezepte` (
  `id`   INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200)     NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

LOCK TABLES `rezepte` WRITE;
/*!40000 ALTER TABLE `rezepte`
  DISABLE KEYS */;

INSERT INTO `rezepte` (`id`, `name`)
VALUES
  (1, 'Flammkuchen mit Räucherforelle'),
  (2, 'Sennenrösti'),
  (3, 'Spinat-Käsesuppe'),
  (4, 'Appenzeller Käse mit Salat'),
  (5, 'Käsefladen'),
  (6, 'Gemüseauflauf'),
  (7, 'Gefüllte Kalbsschnitzel');

/*!40000 ALTER TABLE `rezepte`
  ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table teilnehmer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teilnehmer`;

CREATE TABLE `teilnehmer` (
  `id`          INT(11)                 NOT NULL AUTO_INCREMENT,
  `rezept`      INT(11) UNSIGNED        NOT NULL,
  `gender`      ENUM ('male', 'female') NOT NULL,
  `firstName`   VARCHAR(100)            NOT NULL,
  `lastName`    VARCHAR(100)            NOT NULL,
  `street`      VARCHAR(100)            NOT NULL,
  `zip`         VARCHAR(100)            NOT NULL,
  `city`        VARCHAR(50)             NOT NULL,
  `email`       VARCHAR(100)            NOT NULL,
  `newsletter`  TINYINT(1)              NOT NULL,
  `platform`    VARCHAR(300)            NOT NULL,
  `language`    VARCHAR(2)              NOT NULL DEFAULT 'de',
  `ip`          VARCHAR(15)             NOT NULL,
  `fingerprint` VARCHAR(32)             NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rezept` (`rezept`),
  CONSTRAINT `teilnehmer_ibfk_1` FOREIGN KEY (`rezept`) REFERENCES `rezepte` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;


/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
