// --- Imports ---
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getConfig, getJWTSecret } = require("./configManager");


// --- Config ---

// Declarations
let JWT_Secret;
let token_expiry;
// Constant values
const saltRounds = 12;
// Load
(async () => {
    const config = await getConfig();
    JWT_Secret = await getJWTSecret();
    token_expiry = config.auth.tokenExpiry;
    signature_algorithm = config.auth.signatureAlgorithm;
})();
 

// --- Functions ---

async function hashPassword(passwd) {
    const hash = bcrypt.hashSync(passwd, saltRounds);
    return hash;
}


async function passwordsMatch(password, hashed_password) {
        return await bcrypt.compare(password, hashed_password);
}


async function signToken(payload, options = null) {
    if (options == null) {
        return jwt.sign(payload, JWT_Secret, { expiresIn: token_expiry, });
    }
    else {
        return jwt.sign(payload, JWT_Secret, options);
    }

}


function verifyToken(token) {
    return new Promise( async (resolve, reject) => {
        await jwt.verify( token, JWT_Secret, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}


// --- Exports ---
module.exports = { passwordsMatch, hashPassword, verifyToken, signToken };