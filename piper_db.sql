CREATE TABLE `pipper`.`pipper_data` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `content` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `like_count` INT NULL,
  PRIMARY KEY (`ID`));

insert into pipper_data values (default, 'Emil', '', 'I fuking did it babyyy', '2024-10-03 10:10:11', 14);
insert into pipper_data values (default, 'Luca', '', 'Det fuckin virker ikkeeee', '2024-10-03 10:11:15', 20);