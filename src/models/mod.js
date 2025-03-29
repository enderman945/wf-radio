const { getDatabase } = require('../database/index');
const db = getDatabase();

async function getAllMods() { 
    console.debug("Calling model");
    return db.query("SELECT * FROM mods");
}

async function getModByName(name) {
    try {
        console.debug("Searching for", name);
        const res = await db.query("SELECT * FROM mods WHERE Name = ?;", [name]);
        if (res && res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error in getModByName:", err);
        throw error;
    }

}

// --- WIP ---

async function createMod(mod_data) {
    console.log("WARNING: using a WIP function : createMod (models/mods.js)")
    const { name, description } = mod_data;
    return db.query("INSERT INTO mods (name, description) VALUES (?, ?)", [name, description]);
}

async function updateMod(mod_data) {
    console.log("WARNING: using a WIP function : updateMod (models/mods.js)")
    throw new Error("Not implemented");
    // const { name, description } = mod_data;
    // return db.query("INSERT INTO mods (name, description) VALUES (?, ?)", [name, description]);
}

async function deleteMod(name) {
    console.log("WARNING: using a WIP function : deleteMod (models/mods.js)")
    return db.query("DELETE FROM mods WHERE name = ?", [name]);
}


module.exports = { getAllMods, getModByName }