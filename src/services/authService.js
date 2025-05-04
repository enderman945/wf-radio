const userModel = require("../models/user");
const AppError = require("../utils/appError");
const cryptoUtils = require("../utils/crypto");
const configManager = require("../utils/configManager");
const validate = require("../utils/validate_legacy");

const JWT_Secret = configManager.getJWTSecret();

async function login(username, email, password) {

    // Check for null
    if (!(username || email) || !password) {
        throw new AppError(400, "Bad request", "missing credentials");
    }

    // Get user data
    let user_get;
    if (email) { // If matches email
        user_get = await userModel.getUserByEmail(email);
    } else 
    if (username) { // if matches username
        user_get = await userModel.getUserByName(username);
    } else {
        console.debug("Failed finding user, weird...")
        throw new AppError(401, "Unauthorized", "Invalid credentials");
    }

    // Check if user exists
    if (!user_get || user_get.length == 0) {
        // throw new AppError(401, "Unauthorized: No user with this name");
        throw new AppError(401, "Unauthorized", "Invalid credentials");
    } 
    // Just in case
    if (user_get.length > 1) {
        throw new AppError(500, "Internal server error", "Found multiple users with this name or email, please contact administration");
    }

    const user = user_get[0];

    // Get user password
    const saved_password_get = await userModel.getUserPassword(user.username);   
    // Check if retrieved password sucessfully
    if (!saved_password_get || saved_password_get.length == 0) {
        throw new AppError(500, "Unable to retrieve user password");
    }
    saved_password = saved_password_get[0].password;
    // Check if retrieved password sucessfully again
    if (!saved_password) {
        throw new AppError(500, "Unable to retrieve user password");
    }

    // Check if passwords match
    const passwords_match = await cryptoUtils.passwordsMatch(password, saved_password)
    if (!passwords_match) {
        // throw new AppError(401, "Unauthorized: Invalid password");
        console.debug(password, "differs from", saved_password);
        throw new AppError(401, "Unauthorized", "Invalid credentials");
    }

    const payload = { type: "user",
                      username: user.username, 
                      email: user.email, 
                      role: user.role };

    const token = await cryptoUtils.signToken(payload);
    return token;

    // // Check if passwords match
    // const passwords_match = await bcrypt.compare(password, user[0].password);
    // if (!passwords_match) {
    //     // throw new AppError(401, "Unauthorized: Invalid password");
    //     console.debug("Password doesn't match")
    //     throw new AppError(401, "Unauthorized", "Invalid credentials");
    // }

    // return jwt.sign({ username: user[0].username, role: user[0].role }, await JWT_Secret);
}

// function authorizeRole(user, roles) {
//     if (!user || !roles.includes(user.role)) {
//         throw new AppError(401, "Unauthorized: You don't have the necessary permissions to access this resource");
//     }
// }

module.exports = { login };