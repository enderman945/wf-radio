const MySQLDatabase = require("./mysql");
const SQLiteDatabase = require("./sqlite");

function getDatabase(config) {
    if (config.type === "mysql") {
      return new MySQLDatabase(config);
    } else if (config.type === "sqlite") {
      return new SQLiteDatabase(config);
    } else {
      throw new Error("Invalid database type: ", config.type);
    }
}
  

module.exports = { getDatabase };