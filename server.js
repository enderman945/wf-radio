// --- Imports ---

const express = require("express");
const app = express();
const { loadConfig } = require("./src/utils/configManager");
const { connectDatabase, initDatabase  } = require('./src/database/index');


// --- Load configuration ---
const config = loadConfig();

// --- Body parsing ---
app.use(express.json()); // Necessary to parse JSON bodies

// Database connection
connectDatabase(config.database);
initDatabase(config);

// --- Routing ---

app.use("/", require("./src/routes/index"));
app.use("/mods", require("./src/routes/mods"));
app.use("/users", require("./src/routes/users"));
app.use("/login", require("./src/routes/login"));

// --- Launch ---

const port = config.server.port;
app.listen(port, () => {
    console.log("Server listening on port " + port + "...");
})