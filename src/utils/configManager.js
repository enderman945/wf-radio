const fs = require("fs");
const path = require("path");

// Var decalaration
let config;
const config_folder = "config";
const config_file_name = "config.json"

// Load config
config = JSON.parse(fs.readFileSync(path.join(config_folder, config_file_name)));


async function getConfig() {
    return config;
}

async function getJWTSecret() {
    return config.JWT_Secret || process.env.JWT_Secret;
}

// Default values

// Exports
module.exports = { getJWTSecret };