const model = require("../models/mod");
const AppError = require("../utils/appError");
const { validateModData } = require("../utils/validate_legacy");
const { mdToHtml } = require("../utils/convert");
const { sanitizeModData } = require("../utils/sanitize");


// --- Mods ---


async function listMods(filters) {
    //TODO Validate filters
    console.warn("Skipping full filters validation: Not implemented");

    filters.author = filters.author || null;
    filters.search = filters.search || null;

    return await model.listMods({...filters});
}


async function getModByName(name) {
    const res = await model.getModByName(name);
    if (res.length == 0) {
        throw new AppError(404, "Cannot find mod with this name", "Not found");
    }
    return res[0];
}


async function getFullModInfos(name) {
    const [base_infos, other_infos, tags] = await model.getFullModInfos(name);
    // Check
    if (base_infos.length == 0 || other_infos.length === 0) {
        throw new AppError(404, "Cannot find mod with this name", "Not found", "Couldn't retrieve from database correctly");
    }
    // Merge
    const mod_infos = {...other_infos[0], tags: tags} 
    const res = {...base_infos[0], mod_infos: mod_infos};
    return res;
}


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
    mod_infos.creation_date = Date.now();

    // Write changes to database
    await model.createMod(name, display_name, author, description, mod_infos);
    
    // Return
    return await getModByName(name);
}


async function updateMod(diff_data) {
    //TODO
    throw new AppError(501, "Not implemented");
}


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



// --- Versions ---


async function createModVersion(mod_name, version_data) {
    
    // Validate
    //TODO
    console.warn("Skipping validity checks for createModVersion");

    // Generate data
    const { version_number, channel, changelog, game_version,
         platform, environment, url } = version_data; // Split

    // changelog = await mdToHtml(changelog); // Convert
    // await sanitizeModData(mod_data); // Sanitize
    const release_date = Date.now();

    // Write changes
    await model.createModVersion(mod_name, {version_number, channel, changelog, 
        release_date, game_version, platform, environment, url}); // Database
    
    // Return
    return await model.getStrictModVersion(mod_name, version_number, game_version, platform, environment );
}


async function modifyModVersion(infos) {
    throw new AppError(501, "Not implemented");
}


async function getModVersions(mod_name, filters) {

    // Validation
    //TODO
    console.warn("Skipping getModVersions validation (Not implemented)");

    filters.version_number  = filters.version_number    || null;
    filters.channel         = filters.channel           || null;
    filters.game_version    = filters.game_version      || null;
    filters.platform        = filters.platform          || null;
    filters.environment     = filters.environment       || null;

    // Query
    const res= await model.getModVersions(mod_name, {...filters});
    return res;
}

// async function getModVersion(version_infos) {
//     const { mod, version_number, game_version, platform, environment} = version_infos;
//     const res = await model.getModVersion(mod, version_number, game_version, platform, environment);
//     if (res.length == 0) {
//         throw new AppError(404, "Cannot find mod with this name", "Not found");
//     }
//     return res[0];
// }


async function deleteModVersion(mod_name, version_infos) {

    // Validate
    // TODO

    // Generate data
    const { version_number, game_version, platform, environment } = version_infos;
    const res = await model.getStrictModVersion(mod_name, version_number, game_version, platform, environment );

    // Write changes to db
    await model.deleteModVersion(mod_name, version_number, game_version, platform, environment);
    
    // Return
    return res;
}


// --- Tags ---


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




module.exports = { listMods, getModByName, getFullModInfos, 
                   createMod,  updateMod, deleteMod,
                   createModVersion, modifyModVersion, getModVersions, deleteModVersion,
                   addTags, deleteTags };