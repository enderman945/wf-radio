const handleError = require("../middleware/errors");

async function helloWorld(req, res) {
    try {
        const query_result = "Unknown development version";
        res.send(query_result);
    } catch (error) {
        handleError(error);
    }
}

module.exports = { helloWorld };
