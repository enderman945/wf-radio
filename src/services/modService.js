const handleError = require("../middleware/errors");
const model = require("../models/mod");
const AppError = require("../utils/appError");
const { validateModData } = require("../utils/validation");

async function getAllMods() {
    return model.getAllMods();
}

async function getModByName(name) {
    return model.getModByName(name);
}

async function createMod(mod_data) {
    // throw new AppError(501, "Not implemented");
    
    // console.debug("Received body: ", JSON.stringify(mod_data));

    // Check body validity
    await validateModData(mod_data);

    // Check authenticity
    //TODO no auth provider

    console.debug("Passed validity checks");
    return model.createMod(mod_data);
}

module.exports = { getAllMods, getModByName, createMod };