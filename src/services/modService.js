const model = require("../models/mod");

async function getAllMods() {
    console.debug("Calling service");
    return model.getAllMods();
}

module.exports = { getAllMods };