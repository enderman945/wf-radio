const { getVersion } = require("../utils/configManager");

async function getVersion() {
    
    const version = await getVersion();
    const res = {
        version: version
    };
    return res;
}

module.exports = { getVersion }