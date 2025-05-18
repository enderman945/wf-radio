const handleError = require("../middleware/errors");
const mod_service = require("../services/modService");
const { authorizeModModification, authenticateToken } = require("../middleware/auth");


// Mods

async function listMods(req, res) {
    try {
        // Query
        const filters = req.query;
        const query_result = await mod_service.listMods(filters);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function createMod(req, res) {
    try {
        // Authenticate
        await authenticateToken(req);
        // Query
        const mod_data = req.body;
        const user = req.token_infos.username;
        const query_result = await mod_service.createMod(mod_data, user);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function modifyMod(req, res) {
    try {
        // Authorize
        await authorizeModModification(req);
        // Query
        const mod_data = req.body;
        const query_result = await mod_service.modifyMod(mod_data);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function getModByName(req, res) {
    try {
        // Query
        const name = req.params.name
        const query_result = await mod_service.getFullModInfos(name);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function deleteMod(req, res) {
    try {
        // Authorize
        await authorizeModModification(req);
        // Query
        const name = req.params.name
        const query_result = await mod_service.deleteMod(name);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}


// Versions

async function createModVersion(req, res) {
    try {
        // Authorize
        await authorizeModModification(req);
        // Query
        const name = req.params.name
        const version_data = req.body;
        const query_result = await mod_service.createModVersion(name, version_data);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function modifyModVersion(req, res) {
    try {
        // Authorize
        await authorizeModModification(req);
        // Query
        const name = req.params.name
        const version_data = req.body;
        const query_result = await mod_service.modifyModVersion(name, version_data);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function getModVersions(req, res) {
    try {
        // Query
        const name = req.params.name
        const filters = req.query;
        const query_result = await mod_service.getModVersions(name, filters);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function deleteModVersion(req, res) {
    try {
        // Authorize
        await authorizeModModification(req);
        // Query
        const name = req.params.name
        const version_infos = req.body;
        const query_result = await mod_service.deleteModVersion(name, version_infos);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}



module.exports = { listMods, getModByName, createMod, modifyMod, deleteMod,
                   createModVersion, modifyModVersion, getModVersions, deleteModVersion };