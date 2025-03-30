const mod_model = require("../models/mod");
const AppError = require("./appError");

async function validateModData(mod_data) {
    //TODO WIP
    // Check fields existence
    const not_null = mod_data &&
                Object.keys(mod_data).length == 5 &&
                mod_data.name &&
                mod_data.displayName &&
                mod_data.author &&
                mod_data.versions != null;
                
                // mod_data.otherInfos != null &&
                // Object.keys(mod_data.otherInfos).length == 0 &&
                // mod_data.otherInfos.description != null &&
                // mod_data.otherInfos.links != null &&
                // mod_data.otherInfos.tags != null &&
                // mod_data.otherInfos.screenshots != null &&
                // mod_data.otherInfos.license != null &&
                // mod_data.otherInfos.changelogs != null;

    if (!not_null) {
        console.debug("Item is missing expected fields:", mod_data);
        throw new AppError(400, "Bad request: missing expected fields");
    }

    // Check fields format (check if sanitized)
    const is_valid_name = /^[a-zA-Z0-9_]+$/.test(mod_data.name);
    const is_valid_displayName = true;
    // const is_valid_displayName = /^[a-zA-Z0-9_]+$/.test(mod_data.name); // Temporary
    // const 
    
    const is_valid = is_valid_name && is_valid_displayName;
    if (!is_valid) {
        console.debug("Fields are not following the expected formats");
        throw new AppError(400, "Bad request: The provided fields don't match the expected format");
    }

    // Check if mod already exists
    const exists = await mod_model.exists(mod_data.name);
    if (exists) {
        console.debug("Error: Item already exists");
        throw new AppError(403, "Forbidden: Content with this name already exists");
    }
}


module.exports = { validateModData }