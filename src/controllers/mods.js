const mod_service = require("../services/modService")

async function getAllMods(req, res) {
    try {
        console.debug("Calling controller");
        const query_result = await mod_service.getAllMods();
        console.debug("Controller OK");
        res.json(query_result);
    } catch (error) {
        console.debug("Error at controller");
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllMods };