var mysql = require("mysql");
var dbconfig = require("../config/user-database");

var connection = mysql.createConnection(dbconfig.connection);

connection.query("USE " + dbconfig.database);
connection.query(
  "CREATE TABLE " +
    dbconfig.question_table +
    "(id INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    topic VARCHAR(50) NOT NULL ,\
    question VARCHAR(255) NOT NULL, \
    PRIMARY KEY (id), \
    answer VARCHAR(255) NOT NULL,\
    falseAnswer1 VARCHAR(255) NOT NULL, \
    falseAnswer2 VARCHAR(255) NOT NULL, \
    falseAnswer3 VARCHAR(255) NOT NULL) ENGINE=InnoDB CHARACTER SET=utf8;",
  (err, result) => {
    if (err) {
      console.log(err + "");
    } else {
      console.log("Create table succesful");
    }
  }
);

connection.end();
