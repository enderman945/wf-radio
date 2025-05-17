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
    const other_infos = db.query(`SELECT full_description, license, links, creation_date, downloads_count 
                                        FROM ModInfos WHERE mod = ?`, [name]);
    const tags = listTags(name);

    return [await base_infos, await other_infos, await tags];
}

async function listVersions(mod_name) { 
    return await db.query("SELECT * FROM ModVersions WHERE mod = ?", [mod_name]);
}

async function listTags(mod_name) {
    return await db.query(`SELECT tag FROM ModTags WHERE mod = ?`, [mod_name]);
}

async function getVersionByNumber(mod_name, version_number) {
    return await db.query(`SELECT * FROM ModVersions 
                    WHERE  mod = ?
                    AND    version_number = ?;`, 
                    [mod_name, version_number]);
}

async function getVersion(mod_name, version_number, game_version, platform, environment) {
    return await db.query(`SELECT * FROM ModVersions 
                    WHERE  mod = ?
                    AND    version_number = ?
                    AND    game_version = ?
                    AND    platform = ?
                    AND    environment = ?;`, 
                    [mod_name, version_number, game_version, platform, environment]);
}

// --- Create ---

async function createMod(name, display_name, author, description, mod_infos) {

    // Extract infos
    const { full_description, license, links, creation_date, tags } = mod_infos; 

    // Mods table
    await db.run("INSERT INTO Mods (name, display_name, author, description) \
                                VALUES (?,    ?,            ?,      ?)",       
                                       [name, display_name, author, description]);

    // ModInfos table
    await db.run(`INSERT INTO ModInfos (mod,  full_description, license,      links,            creation_date, downloads_count)
                                    VALUES (?,    ?,                ?,            ?,                ?,             ?)`,       
                                           [name, full_description, license.type, links.toString(), creation_date, 0]);
    
    // Tags
    if (tags) {
        const tags_proc = addTags(name, tags, []);
    }
    

    // License
    if (license.type == "custom") {
        await db.run(`UPDATE ModInfos SET custom_license = ? 
                                          WHERE mod = ?`, 
                                          [license.content, name]);
    }

    // Await
    if (tags) {
        await tags_proc;        
    }

    return;
}

async function addVersion(mod, version_number, channel, changelog, release_date, game_version, platform, environment, url) {

    await db.run(`INSERT INTO ModVersions (mod, version_number, channel, changelog, release_date, game_version, environment, platform, url)
                                       VALUES (?,   ?,              ?,       ?,         ?,            ?,            ?,           ?,        ?);`,
                                              [mod, version_number, channel, changelog, release_date, game_version, environment, platform, url]);
    return;
}

async function addTags(mod, tags) {
    // Add asynchronously
    const promises = tags.map(async (tag) => {
        db.query(`INSERT INTO ModTags (mod, tag) 
                               VALUES (?, ?);`, 
                                      [mod, tag]);
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

    if (description) {
        await updateModAttribute(name, "description", description)
    }
}


// --- Delete ---

async function deleteMod(name) {
    await db.run("DELETE FROM Mods WHERE name = ?", [name]);
    return;
}

async function deleteVersion(name, version_number, game_version, platform, environment) {
    await db.run(`DELETE FROM ModVersions WHERE mod = ? 
                                                AND version_number = ?
                                                AND game_version = ?
                                                AND platform = ?
                                                AND environment = ?;`, 
                               [name, version_number, game_version, platform, environment]);
    return;
}

async function deleteTags(mod, tags) {
    // Remove asynchronously
    const promises = tags.map(async (tag) => {
        db.query(`DELETE FROM ModTags 
            WHERE mod = ? AND tag = ?;`, [mod, tag]);
    });
    await Promise.all(promises);

    return;
}


// --- Utils ---

async function updateModAttribute(name, attribute, value) {
    await db.run(`UPDATE Mods SET ${attribute} = ? WHERE name = ?`, [value, name]);
    return;
}

async function updateModInfosAttribute(name, attribute, value) {
    await db.run(`UPDATE ModInfos SET ${attribute} = ? WHERE name = ?`, [value, name]);
    return;
}

async function exists(name) {
    return db.exists("Mods", "name", name);
}

async function containsVersion(name, version_number, game_version, platform, environment) {
    throw new AppError(501, "Not implemented");
    // return db.exists("Mods", "name", name);
}

async function containsTag(name, tag) {
    throw new AppError(501, "Not implemented");
    // return db.exists("Mods", "name", name);
}


// --- Exports ---

module.exports = { getAllMods, getModByName, getFullModInfos,
                   listVersions, listTags, getVersionByNumber, getVersion,
                   createMod, addVersion, addTags,
                   updateMod,
                   deleteMod, deleteVersion, deleteTags,
                   exists };