const model = require("../models/user");
const AppError = require("../utils/appError");
const cryptoUtils = require("../utils/crypto");
const { validateNewUserData} = require("../schemas/user");
const { sanitizeUserData } = require("../utils/sanitize");

async function getAllUsers() {
    return await model.getAllUsers();
}

async function getUserByName(name) {
    const res = await model.getUserByName(name);
    if (res.length == 0) {
        throw new AppError(404, "No user with this name", "Not found");
    }
    return res[0];
}

async function createUser(user_data) {    

    // Check body validity
    try {
        validateNewUserData(user_data);
    } catch (err) {
        throw new AppError(400, "Invalid fields", "Bad request");
    }

    // Sanitize
    // TODO

    // Generate data

    const { username, email, password, display_name, profile_picture, settings } = user_data

    const password_hash = cryptoUtils.hashPassword(password);
    
    if (await model.exists(username) ) {
        throw new AppError(403, "A user with this username already exists", "Already exists");
    }
    if (await model.existsEmail(email)) {
        throw new AppError(403, "A user with this email already exists", "Already exists");
    }

    if (!display_name) {
        display_name = username;
    }

    // Write changes
    await model.createUser(username, email, await password_hash, display_name, null, null);
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