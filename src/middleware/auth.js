const { getModByName } = require("../services/modService");
const { getModpackByName } = require("../services/modpackService");
const { getUserByName } = require("../services/userService");
const { verifyToken } = require("../utils/crypto");
const AppError = require("../utils/appError");


async function authenticateToken(req) {

    const token = req.header("Authorization");
    
    if (!token) {
        throw new AppError(401, "Missing authorization header", "Unauthorized");
    }

    try {
        req.token_infos = await verifyToken(token);
        console.debug("Authorizing token from", req.token_infos);
    } catch (err) {
        throw new AppError(403, "Forbidden: Error verifying the authorization token");
    }

    return req.token_infos;
}


async function authorizeModModification(req) {
    
    // Auth token
    await authenticateToken(req);
    // Get mod infos
    if (!req.params || req.params.id) {
        throw new AppError(400, "No mod name was scpecified", "Bad request");
    }
    const mod_name = req.params.id;
    const mod = getModByName(mod_name);
    if (!mod) {
        throw new AppError(404, "No mod was found with this name", "Not found");
    }
    // Authorize
    if ( mod.author != req.token_infos.username) {
        throw new AppError(401, "Mod author differs from current user", "Unauthorized");
    }
}

async function authorizeModpackModification(req) {
    
    // Auth token
    await authenticateToken(req);
    // Get mod infos
    if (!req.params || req.params.id) {
        throw new AppError(400, "No mod name was scpecified", "Bad request");
    }
    const modpack_name = req.params.id;
    const modpack = getModpackByName(modpack_name);
    if (!modpack) {
        throw new AppError(404, "No mod was found with this name", "Not found");
    }
    // Authorize
    if ( modpack.author != req.token_infos.username) {
        throw new AppError(401, "Mod author differs from current user", "Unauthorized");
    }
}

async function authorizeUserModification(req) {
    
    // Auth token
    await authenticateToken(req);
    // Get mod infos
    if (!req.params || req.params.id) {
        throw new AppError(400, "No mod name was scpecified", "Bad request");
    }
    const user_name = req.params.id;
    const user = getUserByName(user_name);
    if (!user) {
        throw new AppError(404, "No mod was found with this name", "Not found");
    }
    // Authorize
    if ( user.username != req.token_infos.username) {
        throw new AppError(401, "Mod author differs from current user", "Unauthorized");
    }
}


module.exports = { authenticateToken, authorizeModModification, authorizeModpackModification, authorizeUserModification };