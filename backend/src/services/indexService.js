const model = require("../models/index");

async function getVersion() {
    return model.getVersion();
}

module.exports = { getVersion }
