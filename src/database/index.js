const MySQLDatabase = require("./mysql");
const SQLiteDatabase = require("./sqlite");
const { getConfig } = require("../utils/configManager");

let db;

async function connectDatabase() {

    // Get config
    const config = await getConfig();

    // Choose database type
    if (config.database.type === "mysql") {
        db = new MySQLDatabase(config.database);
    } else if (config.database.type === "sqlite") {
        db = new SQLiteDatabase(config.database);
    } else {
        throw new Error("Invalid database type: ", config.database.type);
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
    
    // --- Users ---

    // Uers table
    db.exec(`CREATE TABLE IF NOT EXISTS Users (
        username        TINYTEXT    PRIMARY KEY,
        display_name    TINYTEXT    NOT NULL,
        email           TINYTEXT    NOT NULL,
        password        TINYTEXT    NOT NULL,
        profile_picture LONGTEXT,
        role            TINYTEXT    NOT NULL,
        settings        LONGTEXT
        );`);

    // --- Mods ---

    // Mods table
    db.exec(`CREATE TABLE IF NOT EXISTS Mods (
        name            TINYTEXT    PRIMARY KEY,
        display_name    TINYTEXT    NOT NULL,
        author          TINYTEXT    NOT NULL,
        description     TINYTEXT    NOT NULL,

        FOREIGN KEY (author) REFERENCES Users(username)
        );`);

    // Mods complementary infos
    db.exec(`CREATE TABLE IF NOT EXISTS ModInfos (
        mod                 TINYTEXT    PRIMARY KEY,
        full_description    TEXT        NOT NULL,
        license             TINYTEXT,
        custom_license      TEXT,       
        links               TEXT,       
        creation_date       TINYTEXT    NOT NULL,
        downloads_count     INT         NOT NULL,

        FOREIGN KEY (mod) REFERENCES Users(username)
        );`);

    // Mods tags
    db.exec(`CREATE TABLE IF NOT EXISTS ModTags (
        mod         TINYTEXT    NOT NULL,
        tag         TINYTEXT    NOT NULL,

        FOREIGN KEY (mod) REFERENCES Mods(name)
        );`);

    // Mods versions
    db.exec(`CREATE TABLE IF NOT EXISTS ModVersions (
        mod                 TINYTEXT        NOT NULL,
        version_number      TINYTEXT        NOT NULL,
        channel             TINYTEXT        NOT NULL,
        changelog           TEXT            NOT NULL,
        release_date        TINYTEXT        NOT NULL,
        game_version        TINYTEXT        NOT NULL,
        platform            TINYTEXT        NOT NULL,
        environment         TINYTEXT        NOT NULL,
        url                 TINYTEXT        NOT NULL,

        FOREIGN KEY (mod) REFERENCES Mods(name)
        );`);

    // User favorites (mods)
    db.exec(`CREATE TABLE IF NOT EXISTS UserFavoriteMods (
        username    TINYTEXT    NOT NULL,
        mod         TINYTEXT    NOT NULL,
        
        FOREIGN KEY (username)    REFERENCES Users(username),
        FOREIGN KEY (mod)         REFERENCES Mods(name)
        );`);

}


function getDatabase() {
    return db;
}


module.exports = { getDatabase, connectDatabase, initDatabase };