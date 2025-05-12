const { getDatabase } = require('../database/index');
const AppError = require('../utils/appError');
const db = getDatabase();


// --- Get ---

async function getAllUsers() { 
    return db.query("SELECT username, display_name, email, profile_picture FROM Users");
}

async function getUserByName(name) {
    return await db.query("SELECT username, display_name, profile_picture, role FROM Users WHERE username = ?;", [name]);
}

async function getUserByEmail(email) {
    return await db.query("SELECT email, username FROM Users WHERE email = ?;", [email]);
}

async function getFullUserInfos(name) {
    return await db.query("SELECT username, display_name, email, profile_picture, role, settings FROM Users WHERE username = ?;", [name]);
}

async function getUserPassword(name) {
    return await db.query("SELECT username, password FROM Users WHERE username = ?;", [name]);
}

async function exists(name) {
    return await db.exists("Users", "username", name);
}


// --- Create ---

async function createUser( username, email, password, displayName, profilePicture, settings ) {

    // Create user
    await db.prepare(`INSERT INTO Users (username, email, password, display_name, role ) 
                                 VALUES (?,        ?,     ?,        ?,            ?    )`, 
                                        [username, email, password, displayName, "user"]);

    // Handle nullable fields
    if (profilePicture) {
        await updateUserAttribute(username, "profile_picture", profilePicture);
    }

    if (settings) {
        await updateUserAttribute(username, "settings", settings);
    }
    return;
}

async function addFavoriteMods(username, favs) {

    const promises = favs.map(async (mod) => {
        db.query(`INSERT INTO UserFavoriteMods 
            (username, mod) VALUES (?, ?);`, 
            [username, mod]);

    });
    await Promise.all(promises);

    return;
}


// --- Update ---

async function updateUser(username, display_name, email, profile_picture, settings) {

    if (display_name) {
        await updateUserAttribute(username, "display_name", display_name);
    }

    if (email) {
        await updateUserAttribute(username, "email", email);
    }

    if (profile_picture) {
        await updateUserAttribute(username, "profile_picture", profile_picture)
    }

    if (settings) {
        await updateUserAttribute(username, "settings", settings);
    }
}

async function updateUserPassword(username, password) {
    await db.prepare(`UPDATE Users SET password = ? WHERE username = ?`, [password, username]);
}

async function updateUserAttribute(username, attribute, value) {
    await db.prepare(`UPDATE Users SET ${attribute} = ? WHERE username = ?`, [value, username]);
    return;
}


// --- Delete ---

async function deleteUser(username) {
    await db.prepare("DELETE FROM Users WHERE username = ?", [username]);
    return;
}

async function deleteFavoriteMods(username, favs) {
    
    const promises = favs.map(async (mod) => {
        db.query(`DELETE FROM UserFavoriteMods 
            WHERE username = ? AND mod = ?;`, [username, mod]);
    });

    // Await 
    await Promise.all(promises);

    return;
}


// --- Exports ---

module.exports = { getAllUsers, getUserByName, getUserByEmail, getFullUserInfos, getUserPassword, 
                   createUser, addFavoriteMods,
                   updateUser,
                   deleteUser, deleteFavoriteMods,
                   exists }