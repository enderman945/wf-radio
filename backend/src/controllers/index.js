const index_service = require("../services/indexService");
const handleError = require("../middleware/errors");


async function getVersion(req, res) {
    try {
        const query_result = await index_service.getVersion();
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

module.exports = { getVersion };