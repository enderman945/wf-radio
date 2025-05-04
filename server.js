// --- Imports ---

const express = require("express");
const app = express();
const configManager = require("./src/utils/configManager");
const { connectDatabase, initDatabase  } = require('./src/database/index');


// --- Load configuration ---
const config = configManager.loadConfig();

// --- Body parsing ---
app.use(express.json()); // Necessary to parse JSON bodies

// Database connection
(async () => {


    // --- Database connection ---
    await connectDatabase();
    await initDatabase();

    // --- Routing ---
    app.use("/", require("./src/routes/index"));
    app.use("/mods", require("./src/routes/mods"));
    app.use("/users", require("./src/routes/users"));
    app.use("/list", require("./src/routes/list"));
    app.use("/login", require("./src/routes/login"));

})();


// --- Launch ---

const port = config.port;
app.listen(port, () => {
    console.log("Server listening on port " + port + "...");
})