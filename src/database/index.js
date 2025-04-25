const MySQLDatabase = require("./mysql");
const SQLiteDatabase = require("./sqlite");
const { getConfig } = require("../utils/configManager");

let db;

async function connectDatabase() {

    // Get config
    const config = await getConfig();

    // Choose database type
    if (config.type === "mysql") {
        db = new MySQLDatabase(config);
    } else if (config.type === "sqlite") {
        db = new SQLiteDatabase(config);
    } else {
        throw new Error("Invalid database type: ", config.type);
    }
    
    // Connect
    await db.connect();
    return db;
}


// Setups the database by creating the tables and the default objects
async function initDatabase() {

    if (!db) {
        throw new Error("Database is not connected");
    }
    
    // Create mods table
    db.exec("CREATE TABLE IF NOT EXISTS Mods ( \
        name tinytext PRIMARY KEY, \
        display_name tinytext, \
        author tinytext\
        );");
    
    // Insert example mod
    // if (!(await db.exists("mods", "Name", "example"))) {
    //     console.debug("Creating default mod");
    //     db.exec(`INSERT INTO Mods (name, display_name, author, versions) \
    //         VALUES ('example', 'Example mod', '${config.users.admin.username}', '');`);
    // }


    // Create users table
    db.exec("CREATE TABLE IF NOT EXISTS Users ( \
        username tinytext PRIMARY KEY, \
        display_name tinytext, \
        email tinytext,\
        password tinytext,\
        profile_picture longtext,\
        preferences longtext, \
        favorites longtext \
        );");

      // Insert default admin account
    //   if (!(await db.exists("users", "Username", config.users.admin.username))) {
    //     console.debug("Creating default admin user");
    //     db.exec(`INSERT INTO users (Username, DisplayName, Email, Password, ProfilePicture, Preferences, Favorites) \
    //         VALUES ('${config.users.admin.username}', 'Admin', '', '${config.users.admin.password}', '',  '', '' );`);
    // }
}


function getDatabase() {
    return db;
}


module.exports = { getDatabase, connectDatabase, initDatabase };