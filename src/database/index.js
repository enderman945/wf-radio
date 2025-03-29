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

// Setups the database by creating the tables and the default objects
function initDatabase() {
    if (db == null) {
        throw new Error("Database is not connected");
    }
    
    db.exec("CREATE TABLE mods ( \
                Name tinytext PRIMARY KEY, \
                DisplayName tinytext, \
                Author tinytext FOREIGN KEY,\
                Versions longtext,\
                OtherInfos longtext \
                )");
}

module.exports = { getDatabase, connectDatabase, initDatabase };