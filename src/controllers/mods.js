const mod_service = require("../services/modService")

async function getAllMods(req, res) {
    try {
        console.debug("Calling controller");
        const query_result = await mod_service.getAllMods();
        console.debug("Controller OK");
        return res.json(query_result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {getAllMods};