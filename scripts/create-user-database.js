var mysql = require("mysql");
var dbconfig = require("../config/user-database");

var connection = mysql.createConnection(dbconfig.connection);

connection.query("CREATE DATABASE " + dbconfig.database);

connection.query(
  "\
CREATE TABLE `" +
    dbconfig.database +
    "`.`" +
    dbconfig.users_table +
    "` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    `email` VARCHAR(50) NOT NULL, \
    `phoneNumber` CHAR(15) NOT NULL, \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)"
);

console.log("Success: Database Created!");

connection.end();
