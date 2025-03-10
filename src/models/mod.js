// const db = require("...");

async function getAllMods() {
    return db.query("SELECT * FROM mods");
}

async function getModsByName(name) {
    return db.query("SELECT * FROM mods WHERE name = ?", [name]);
}

// --- WIP ---

async function createMod(mod_data) {
    console.log("WARNING: using a WIP function : createMod (models/mods.js)")
    const { name, description } = mod_data;
    return db.query("INSERT INTO mods (name, description) VALUES (?, ?)", [name, description]);
}

async function deleteMod(name) {
    console.log("WARNING: using a WIP function : deleteMod (models/mods.js)")
    return db.query("DELETE FROM mods WHERE name = ?", [name]);
}


module.exports = { getAllMods, getModsByName }