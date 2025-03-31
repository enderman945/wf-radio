const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const AppError = require("../utils/appError");
const configManager = require("../utils/configManager");
const validate = require("../utils/validate");

const JWT_Secret = configManager.getJWTSecret();

async function login(identifier, password) {

    // Check for null
    if (!username || !password) {
        throw new AppError(400, "Bad request", "missing credentials");
    }

    // Get user data
    let user;
    if (validate.isEmail(identifier)) { // If matches email
        user = await userModel.getUserByEmail(username);
    } else 
    if (validate.isID(identifier)) { // if matches username
        user = await userModel.getUserByName(username);
    } else {
        throw new AppError(401, "Unauthorized", "Invalid credentials");
    }

    // Check if user exists
    if (!user || user.length == 0) {
        // throw new AppError(401, "Unauthorized: No user with this name");
        throw new AppError(401, "Unauthorized", "Invalid credentials");
    } 
    // Just in case
    if (user.length > 1) {
        throw new AppError(500, "Internal server error", "Found multiple users with this name or email, please contact administration");
    }

    // Check if passwords match
    const passwords_match = await bcrypt.compare(password, user[0].password);
    if (!passwords_match) {
        // throw new AppError(401, "Unauthorized: Invalid password");
        throw new AppError(401, "Unauthorized", "Invalid credentials");
    }

    return jwt.sign({ username: user[0].username, role: user[0].role }, await JWT_Secret);
}

function verifyToken(token) {
    return new Promise( (resolve, reject) => {
        jwt.verify( token, JWT_Secret, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

// function authorizeRole(user, roles) {
//     if (!user || !roles.includes(user.role)) {
//         throw new AppError(401, "Unauthorized: You don't have the necessary permissions to access this resource");
//     }
// }

module.exports = { login, verifyToken };