const model = require("../models/user");
const AppError = require("../utils/appError");
const cryptoUtils = require("../utils/crypto");
const { validateUserData } = require("../utils/validate_legacy");
const { sanitizeUserData } = require("../utils/sanitize");

async function getAllUsers() {
    return await model.getAllUsers();
}

async function getUserByName(name) {
    const res = await model.getUserByName(name);
    return res[0];
}

async function createUser(user_data) {    

    // Check body validity
    // TODO

    // Sanitize
    // TODO

    // Gather data
    const { username, email, password, display_name, profile_picture, settings } = user_data
    const password_hash = await cryptoUtils.hashPassword(password);

    await model.createUser(username, email, password_hash, display_name, null, null);
    return model.getUserByName(username);
}

async function deleteUser(name, token_user) {

    // Check existence
    const exists = await model.exists(name);
    if (!exists) {
        throw new AppError(404, "Cannot find user with this name", "Not found");
    }

    const res = await model.getUserByName(name);
    await model.deleteUser(name);

    return res;
}

module.exports = { getAllUsers, getUserByName, createUser, deleteUser };