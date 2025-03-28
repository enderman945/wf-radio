const MySQLDatabase = require("./mysql");
const SQLiteDatabase = require("./sqlite");

let db;

async function connectDatabase(config) {
    if (config.type === "mysql") {
      db = new MySQLDatabase(config);
    } else if (config.type === "sqlite") {
      db = new SQLiteDatabase(config);
    } else {
      throw new Error("Invalid database type: ", config.type);
    }
    
    await db.connect();
    return db;
}

function getDatabase() {
    return db;
}
  

module.exports = { getDatabase, connectDatabase };