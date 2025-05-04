const model = require("../models/user");
const AppError = require("../utils/appError");
const { validateUserData } = require("../utils/validate_legacy");
const { sanitizeUserData } = require("../utils/sanitize");

async function getAllUsers() {
    return model.getAllUsers();
}

async function getUserByName(name) {
    return model.getUserByName(name);
}

async function createUser(user_data) {    

    // Check body validity
    await validateUserData(user_data);

    // Check authenticity
    //TODO no auth provider

    // Sanitize
    await sanitizeUserData(user_data);

    console.debug("Passed validity checks");
    model.createUser(user_data);
    return;
}

async function deleteUser(name, token_user) {

    // Check existence
    const exists = await model.exists(name);
    if (!exists) {
        throw new AppError(404, "Cannot find user with this name", "Not found");
    }

    // Check authenticity
    if (name != token_user) {
        throw new AppError(401, "", "Unauthorized");
    }

    model.deleteUser(name);
    return;
}

module.exports = { getAllUsers, getUserByName, createUser, deleteUser };