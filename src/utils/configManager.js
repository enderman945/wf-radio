// --- Define constants ---

// Imports
const fs = require("fs");
const path = require("path");
const { version } = require("../../package.json");


// Var decalaration
const config_folder = "config";
const config_file_name = "config.json"

// Global variables
let config = {};

// --- Default config ---

const default_config = {

    "port": 8000,

    "users": {
        "admin": {
            "username": "admin",
            "password": "admin"
        }
    },
    
    "database": {
        "type": "sqlite"
    },

    "auth" : {
        "JWT_secret": "HGF7654EGBNKJNBJH6754356788GJHGY",
        "tokenExpiry": "1h"
    }
}


// --- Functions ---

function loadConfig() {

    let user_config;

    // Parse
    try {
        // Get user config
        user_config = JSON.parse(fs.readFileSync(path.resolve(path.join(config_folder, config_file_name))));
        
        // Warns
        if (!user_config.auth || !user_config.auth.JWT_secret) {
            console.warn("WARNING: No JWT secret provided, using the default one. Please note that using the default secret is a major security risk.")
        }

        // Merge default and user configs (default values)
        config = { ...default_config, ...user_config };
    } 
    catch (err) {
        // Error messages
        console.debug("Error:", err)
        console.error("Error loading configuration, using the default settings");
        console.debug("Search path:", path.resolve("./"));
        console.debug("Config file:", path.resolve(path.join(config_folder, config_file_name)))
        
        config = default_config;
    }

    return config;

}


async function getConfig() {
    return config;
}

async function getJWTSecret() {
    return config.auth.JWT_secret || process.env.JWT_secret;
}

async function getVersion() {
    // Could be done with process.env.npm_package_version
    // but may not work without without npm
    return version;
}

// Exports
module.exports = { loadConfig, getConfig, getVersion, getJWTSecret };