const { getDatabase } = require('../database/index');
const AppError = require('../utils/appError');
const db = getDatabase();

async function getAllMods() { 
    return db.query("SELECT name FROM Mods");
}

async function getModByName(name) {
    return await db.query("SELECT name, display_name, author FROM Mods WHERE name = ?;", [name]);

}

async function exists(name) {
    return db.exists("Mods", "name", name);
}

async function createMod(mod_data) {

    const { name, displayName, author, versions, otherInfos } = mod_data;
    const { description, links, tags, screenshots, license, changelogs, counts } = otherInfos;

    await db.prepare("INSERT INTO mods (name, display_name, author) \
           VALUES (?, ?, ?, ?)", [name, displayName, author]);
    // db.prepare("INSERT INTO modsDescription (Name, Description, Links, Tags, Screenshots, License, Changelogs, Counts) \
    //       VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, description, links, tags, screenshots, license, changelogs, counts]);
    return;
}

async function deleteMod(name) {
    console.log("WARNING: using a WIP function : deleteMod (models/mods.js)");
    db.prepare("DELETE FROM Mods WHERE name = ?", [name]);
    // db.prepare("DELETE FROM modsDescription WHERE Name = ?", [name]);
    return;
}

// --- WIP ---

async function updateMod(mod_data) {
    console.log("WARNING: using a WIP function : updateMod (models/mods.js)");
    throw new AppError(501, "Not implemented");
    // const { name, description } = mod_data;
    // return db.query("INSERT INTO mods (name, description) VALUES (?, ?)", [name, description]);
}




module.exports = { getAllMods, getModByName, createMod, deleteMod, exists }