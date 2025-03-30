const mod_model = require("../models/mod");
const AppError = require("./appError");

async function validateModData(mod_data) {
    // WIP
    const not_null = mod_data != null;
               mod_data.name &&
               mod_data.displayName &&
               mod_data.author &&
               mod_data.versions &&
               mod_data.otherInfos;

    if (!not_null) {
        console.debug("Item is missing expected fields:", mod_data);
        throw new AppError(400, "Bad request: missing expected fields");
    }

    const exists = await mod_model.exists(mod_data.name);
    if (exists) {
        console.debug("Error: Item already exists");
        throw new AppError(403, "Forbidden: Content with this name already exists");
    }
}


module.exports = { validateModData }