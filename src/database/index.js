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


// Setups the database by creating the tables and the default objects
async function initDatabase(config) {
    if (db == null) {
        throw new Error("Database is not connected");
    }
    
    // Create mods table
    db.exec("CREATE TABLE IF NOT EXISTS mods ( \
                Name tinytext PRIMARY KEY, \
                DisplayName tinytext, \
                Author tinytext,\
                Versions longtext,\
                OtherInfos longtext \
                );");
    
    // Insert example mod
    if (!(await db.exists("mods", "Name", "example"))) {
        console.debug("Creating default mod");
        db.exec(`INSERT INTO mods (Name, DisplayName, Author, Versions, OtherInfos) \
            VALUES ('example', 'Example mod', '${config.users.admin.username}', '', '');`);
    }
}


function getDatabase() {
  return db;
}


module.exports = { getDatabase, connectDatabase, initDatabase };