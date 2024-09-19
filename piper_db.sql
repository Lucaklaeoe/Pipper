CREATE TABLE `pipper`.`pipper_data` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `content` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `like_count` INT NULL,
  PRIMARY KEY (`ID`));
