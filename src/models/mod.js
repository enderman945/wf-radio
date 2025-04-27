const { getDatabase } = require('../database/index');
const AppError = require('../utils/appError');
const db = getDatabase();


// --- Get ---

async function getAllMods() { 
    return await db.query("SELECT name, display_name, author, description FROM Mods");
}

async function getModByName(name) {
    return await db.query("SELECT name, display_name, author FROM Mods WHERE name = ?;", [name]);

}

async function getFullModInfos(name) {
 
    // Query
    const base_infos = db.query(`SELECT * FROM Mods WHERE name = ?`, [name]);
    const other_infos = db.query(`SELECT full_description, license, links, creation_date 
                                        FROM ModInfos WHERE name = ?`, [name]);

    // Merge
    const res = {...await base_infos, ...await other_infos};

    return res;
}

async function exists(name) {
    return db.exists("Mods", "name", name);
}


// --- Create ---

async function createMod(name, display_name, author, description, mod_infos) {

    // Extract infos
    const { full_description, license, links, creation_date, tags } = mod_infos; 

    // Mods table
    await db.prepare("INSERT INTO Mods (name, display_name, author, description) \
                                VALUES (?,    ?,            ?,      ?)",       
                                       [name, display_name, author, description]);

    // ModInfos table
    await db.prepare(`INSERT INTO ModInfos (mod,  full_description, license,      links,            creation_date)
                                    VALUES (?,    ?,                ?,            ?,                ?)`,       
                                           [name, full_description, license.type, links.toString(), creation_date]);
    
    // Tags
    const tags_proc = updateTags(name, tags, []);

    // License
    if (license_type == "custom") {
        await db.prepare(`UPDATE ModInfos SET custom_license = ? 
                                          WHERE mod = ?`, 
                                          [license.content, name]);
    }

    // Await
    await tags_proc;

    return;
}

async function addVersion(version_number, channel, changelog, release_date, game_version, platform, environment, url) {

    await db.prepare(`INSERT INTO ModVersions (version_number, channel, changelog, release_date, game_version, platform, url)
                                       VALUES (?,              ?,       ?,         ?,            ?,            ?,        ?);`,
                                              [version_number, channel, changelog, release_date, game_version, platform, url]);
    return;
}

async function AddTags(tags) {
    // Add asynchronously
    const promises = tags.map(async (mod) => {
        db.query(`INSERT INTO UserFavoriteMods (username, mod) 
                                        VALUES (?, ?);`, 
                                                [username, mod]);
    });
    await Promise.all(promises);

    return;
}


// --- Update ---

async function updateMod(name, display_name, author, description) {
    
    if (display_name) {
        await updateModAttributes(name, "display_name", display_name);
    }

    if (author) {
        await updateModAttribute(nale, "author", author);
    }

    if (profile_picture) {
        await updateUserAttribute(name, "description", description)
    }
}

async function updateModAttribute(name, attribute, value) {
    await db.prepare(`UPDATE Mods SET ${attribute} = ? WHERE name = ?`, [value, name]);
    return;
}

async function updateModInfosAttribute(name, attribute, value) {
    await db.prepare(`UPDATE ModInfos SET ${attribute} = ? WHERE name = ?`, [value, name]);
    return;
}


// --- Delete ---

async function deleteMod(name) {
    await db.prepare("DELETE FROM Mods WHERE name = ?", [name]);
    return;
}

async function deleteVersion(name, version_number, channel, game_version, platform, environment) {
    await db.prepare(`DELETE FROM ModVersions WHERE name = ? 
                                                AND version_number = ?
                                                AND channel = ?
                                                AND game_version = ?
                                                AND platform = ?
                                                AND environment = ?;`, 
                               [name, version_number, channel, game_version, platform, environment]);
    return;
}

async function deleteTags(tags) {
    // Remove asynchronously
    const promises = tags.map(async (mod) => {
        db.query(`DELETE FROM UserFavoriteMods 
            WHERE username = ? AND mod = ?;`, [username, mod]);
    });
    await Promise.all(promises);

    return;
}


// --- Exports ---

module.exports = { getAllMods, getModByName, getFullModInfos,
                   createMod, addVersion, addTags,
                   updateMod,
                   deleteMod, deleteVersion, deleteTags,
                   exists };