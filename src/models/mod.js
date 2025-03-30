const { getDatabase } = require('../database/index');
const AppError = require('../utils/appError');
const db = getDatabase();

async function getAllMods() { 
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
        throw err;
    }

}

async function exists(name) {
    return db.exists("mods", "Name", name);
}

async function createMod(mod_data) {

    const { name, displayName, author, versions, otherInfos } = mod_data;
    const { description, links, tags, screenshots, license, changelogs, counts } = otherInfos;

    await db.prepare("INSERT INTO mods (Name, DisplayName, Author, Versions) \
           VALUES (?, ?, ?, ?)", [name, displayName, author, versions]);
    // db.prepare("INSERT INTO modsDescription (Name, Description, Links, Tags, Screenshots, License, Changelogs, Counts) \
    //       VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name, description, links, tags, screenshots, license, changelogs, counts]);
    return;
}

async function deleteMod(name) {
    console.log("WARNING: using a WIP function : deleteMod (models/mods.js)");
    db.prepare("DELETE FROM mods WHERE Name = ?", [name]);
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