const model = require("../models/mod");

async function getAllMods() {
    console.debug("Calling service");
    return model.getAllMods();
}

async function getModByName(name) {
    console.debug("Calling service");
    return model.getModByName(name);
}

module.exports = { getAllMods, getModByName };