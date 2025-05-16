// --- Define constants ---

// Imports
import fs from "fs";
import path from "path";
import { version } from "../../package.json";


// Var decalaration
const config_folder = "config";
const config_file_name = "config.json"

// Global variables
let config = {};
let backend_url = "";

// --- Default config ---

const default_config = {

    "port": 8100,

    "backend": {
        "address": "localhost",
        "port": 8000,
        "protocol": "http",
        "path": "/"
    }
}

function loadConfig() {

    let user_config;

    // Parse
    try {
        // Get user config
        user_config = JSON.parse(fs.readFileSync(path.resolve(path.join(config_folder, config_file_name))));

        // Merge default and user configs (default values)
        config = { ...default_config, ...user_config };
        
        backend_url = config.backend.protocol + '://' 
                    + config.backend.address + ':' 
                    + config.backend.port 
                    + config.backend.path;
        //TODO test url
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

function getBackendUrl() {
    if (backend_url) {
        return backend_url;
    } else {
        throw new Error("Backend url is not valid");
    }

}