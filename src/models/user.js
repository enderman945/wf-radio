const { getDatabase } = require('../database/index');
const AppError = require('../utils/appError');
const db = getDatabase();

async function getAllUsers() { 
    return db.query("SELECT * FROM users");
}

async function getUserByName(name) {
    try {
        console.debug("Searching for", name);
        const res = await db.query("SELECT * FROM users WHERE Name = ?;", [name]);
        if (res && res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error in getUserByName:", err);
        throw err;
    }

}

async function exists(name) {
    return db.exists("users", "Name", name);
}

async function createUser(user_data) {

    const { name, email, password, displayName, profilePicture, favorites, preferences } = user_data;

    await db.prepare("INSERT INTO users (Name, Email, Password, DisplayName, ProfilePicture, Favorites, Preferences) \
           VALUES (?, ?, ?, ?)", [name, email, password, displayName, profilePicture, favorites, preferences]);
    return;
}

async function deleteUser(name) {
    db.prepare("DELETE FROM users WHERE Name = ?", [name]);
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