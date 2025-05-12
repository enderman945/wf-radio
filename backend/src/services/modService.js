const model = require("../models/mod");
const AppError = require("../utils/appError");
const { validateModData } = require("../utils/validate_legacy");
const { mdToHtml } = require("../utils/convert");
const { sanitizeModData } = require("../utils/sanitize");


// --- Get ---

async function getAllMods() {
    return model.getAllMods();
}

async function getModByName(name) {
    const res = model.getModByName(name);
    if (res.length == 0) {
        throw new AppError(404, "Cannot find mod with this name", "Not found");
    }
    return res[0];
}

async function getFullModInfos(name) {
    const res = model.getFullModInfos(name);
    if (res.length == 0) {
        throw new AppError(404, "Cannot find mod with this name", "Not found");
    }
    return res[0];
}

async function getModVersion(infos) {
    const { mod, version_number, game_version, platform, environment} = infos;
    const res = model.getModVersion(mod, version_number, game_version, platform, environment);
    if (res.length == 0) {
        throw new AppError(404, "Cannot find mod with this name", "Not found");
    }
    return res[0];
}


// --- Create ---

async function createMod(mod_data, author) {    

    // Check body validity
    //TODO
    console.warn("Skipping validity checks for createMod");
    // await validateModData(mod_data);

    // Generate data
    const { name, display_name, description, mod_infos } = mod_data;
    mod_infos.full_description = await mdToHtml(mod_infos.full_description); // Convert
    await sanitizeModData(mod_data); // Sanitize
    //TODO
    mod_infos.creation_date = 0

    // Write changes to database
    await model.createMod(name, display_name, author, description, mod_infos);
    
    // Return
    return getModByName(name);
}

async function addVersion(version_data) {
    
    // Validate
    //TODO
    console.warn("Skipping validity checks for addVersion");

    // Generate data
    const { mod_name, version_number, channel, changelog, game_version,
         platform, environment, url } = version_data; // Split
    changelog = await mdToHtml(changelog); // Convert
    await sanitizeModData(mod_data); // Sanitize
    const release_date = (new Date()).toLocaleDateString();

    // Write changes
    await model.addVersion(mod_name, version_number, channel, changelog, 
        release_date, game_version, platform, environment, url); // Database

    // Return
    return await model.getModVersion(mod_name, version_number, game_version, platform, environment );
}

async function addTags(mod, tags) {
    
    // Validate
    //TODO
    console.warn("Skipping validity checks for addTags");

    // Write changes
    await model.addTags(mod, tags);

    // Return
    const { tags:res } = await model.getFullModInfos(mod);
    return { "mod": mod, "tags": res};

}

// --- Update ---

async function updateMod(diff_data) {
    //TODO
    throw new AppError(501, "Not implemented");
}



// Delete

async function deleteMod(name) {

    // Check existence
    const mod = await model.getModByName(name);
    if (!mod) {
        throw new AppError(404, "No was found with this name", "Not found")
    }

    // Authorize
    // TODO move outside of this function
    if (mod.author != mod.user) { 
        throw new AppError(403, "You don't have the necessary permissions to execute this action", "Forbidden");
    }

    // Write changes to database
    await model.deleteMod(name);

    // Return
    return mod;
}

async function deleteVersion(version_infos) {

    // Validate
    // TODO

    // Generate data
    const res = await getModVersion(version_infos);
    const { mod, version_number, game_version, platform, environment} = version_infos;

    // Write changes to db
    await model.deleteVersion(mod, version_number, game_version, platform, environment);
    
    // Return
    return res;
}

async function deleteTags(mod, tags) {
    
    // Validate (check existence)
    //TODO
    console.warn("Skipping validity checks for deleteTags");

    // Wites changes to db
    await model.deleteTags(mod, tags);
    
    // Return
    const { tags:res } = await model.getFullModInfos(mod);
    return { "mod": mod, "tags": res};
}

module.exports = { getAllMods, getModByName, getFullModInfos, 
                   createMod, addTags, addVersion,
                   updateMod,
                   deleteMod, deleteTags, deleteVersion };