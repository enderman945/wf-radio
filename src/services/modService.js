const model = require("../models/mod");
const AppError = require("../utils/appError");
const { validateModData } = require("../utils/validate_legacy");
const { mdToHtml } = require("../utils/convert");
const { sanitizeModData } = require("../utils/sanitize");

async function getAllMods() {
    return model.getAllMods();
}

async function getModByName(name) {
    return model.getModByName(name);
}

async function createMod(mod_data) {    

    // Check body validity
    await validateModData(mod_data);

    // Check authenticity
    //TODO no auth provider

    // Convert
    mod_data.otherInfos.description = await mdToHtml(mod_data.otherInfos.description);
    mod_data.otherInfos.changelogs = await mdToHtml(mod_data.otherInfos.changelogs);

    // Sanitize
    await sanitizeModData(mod_data);



    console.debug("Passed validity checks");
    model.createMod(mod_data);
    return;
}

async function deleteMod(name) {

    // Check existence
    const exists = await model.exists(name);
    if (!exists) {
        throw new AppError(404, "Not found: Cannot find mod with this name");
    }

    // Check authenticity
    //TODO no auth provider

    model.deleteMod(name);
    return;
}

module.exports = { getAllMods, getModByName, createMod, deleteMod };