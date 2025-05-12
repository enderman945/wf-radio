// --- Imports ---
const AppError = require("./appError");


// --- Functions ---

async function validateNewModData(mod_data) {

    throw new AppError(501, "Not implemented");
    //TODO
    // try {
    //     node_schemas.validateNewModData(node_data);
    // } catch (err) {
    //     throw new AppError(400, "Missing or invalid fields", "Bad request", err);
    // }

}


async function validateNewUserData(user_data) {
    
    throw new AppError(501, "Not implemented");
    //TODO
    // try {
    //     node_schemas.validateNewUserData(node_data);
    // } catch (err) {
    //     throw new AppError(400, "Missing or invalid fields", "Bad request", err);
    // }

}

async function validateCretendials(identifier, password) {
    
    throw new AppError(501, "Not implemented");
}


// --- Utils ---

async function isEmail(text) {
    const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return email_regex.test(text);
}

async function isID(text) {
    const id_regex = /[a-zA-Z0-9_]+/;
    return id_regex.test(text);
}


module.exports = { validateNewModData, validateNewUserData, isEmail, isID };