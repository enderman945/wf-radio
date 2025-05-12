const configManager = require("../utils/configManager");

async function getVersion() {
    
    const version = await configManager.getVersion();
    const res = {
        version: version
    };
    return res;
}

module.exports = { getVersion }