// --- Imports ---

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { getDatabase, connectDatabase  } = require('./src/database/index');
const handleError = require('./src/middleware/errors');

// --- Define constants ---

const config_folder = "config";
const config_file_name = "config.json"
const data_folder = "data";
const sqlite_file_name = "sqlite.db"

const default_port = 8000

// --- Load configuration ---

// var declaration
let db;
let config;

// Load config
try {
    config = JSON.parse(fs.readFileSync(path.join(config_folder, config_file_name)));
    console.debug("Loaded config");
} catch (err) {
    console.error("Couldn't read config file: ", err);
    process.exit(1);
}

// vars definition
const port = config.port || default_port;
console.debug("Port: ", port);

// Database connection
db = connectDatabase(config.database);

// --- Routing ---

app.use("/", require("./src/routes/root"));
app.use("/mods", require("./src/routes/mods"));

// -- Error handling ---

app.use(handleError);

// --- Launch ---

app.listen(port, () => {
    console.log("Server listening on port " + port + "...");
})