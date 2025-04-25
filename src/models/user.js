const { getDatabase } = require('../database/index');
const AppError = require('../utils/appError');
const db = getDatabase();

async function getAllUsers() { 
    return db.query("SELECT * FROM users");
}

async function getUserByName(name) {
    return await db.query("SELECT * FROM Users WHERE username = ?;", [name]);
}

async function getUserByEmail(email) {
    return await db.query("SELECT * FROM Users WHERE email = ?;", [email]);
}

async function exists(name) {
    return db.exists("Users", "username", name);
}

async function createUser(user_data) {

    const { name, email, password, displayName, profilePicture, favorites, preferences } = user_data;

    await db.prepare("INSERT INTO Users (username, email, password, display_name, profile_picture, favorites, preferences) \
           VALUES (?, ?, ?, ?)", [name, email, password, displayName, profilePicture, favorites, preferences]);
    return;
}

async function deleteUser(name) {
    db.prepare("DELETE FROM Users WHERE username = ?", [name]);
    return;
}

// --- WIP ---

async function updateUser(user_data) {
    console.log("WARNING: using a WIP function : updateUser (userels/users.js)");
    throw new AppError(501, "Not implemented");
    // const { name, description } = user_data;
    // return db.query("INSERT INTO users (name, description) VALUES (?, ?)", [name, description]);
}




module.exports = { getAllUsers, getUserByName, createUser, deleteUser, exists }