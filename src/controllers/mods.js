const handleError = require("../middleware/errors");
const mod_service = require("../services/modService")

async function getAllMods(req, res) {
    try {
        console.debug("Calling controller");
        const query_result = await mod_service.getAllMods();
        res.json(query_result);
    } catch (error) {
        console.error("ERROR: Couldn't get mods: ");
        handleError(error, req, res, null);
    }
}

async function getModByName(req, res) {
    try {
        const query_result = await mod_service.getModByName(req.params.name);
        res.json(query_result);
    } catch (error) {
        console.error("ERROR: Couldn't get mod " + req.params.name + ": ");
        handleError(error, req, res, null);
    }
}

async function createMod(req, res) {
    try {
        await mod_service.createMod(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.error("ERROR: Couldn't create mod:", error.message);
        handleError(error, req, res, null);
    }
}

async function deleteMod(req, res) {
    try {
        await mod_service.deleteMod(req.params.name);
        return res.sendStatus(200);
    } catch (error) {
        console.error("ERROR: Couldn't delete mod " + req.params.name + ":", error.message);
        handleError(error, req, res, null);
    }
}



module.exports = { getAllMods, getModByName, createMod, deleteMod };