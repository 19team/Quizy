
var env = process.env.NODE_ENV || "development";

module.exports = {
  "development" : {
    "username": process.env.USER ||"root",
    "password":  process.env.PASSWORD || "",
    "database": process.env.DB || "my_schema",
    "host": process.env.DBHOST || "localhost",
    "dialect": "mysql",
    "connection": {
      "host": process.env.DBHOST || "localhost",
      "user": process.env.USER ||"root",
      "password": process.env.PASSWORD || ""
    }
  }
  
}[env];