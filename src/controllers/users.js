const handleError = require("../middleware/errors");
const user_service = require("../services/userService")

async function getAllUsers(req, res) {
    try {
        console.debug("Calling controller");
        const query_result = await user_service.getAllUsers();
        res.json(query_result);
    } catch (error) {
        console.error("ERROR: Couldn't get users: ");
        handleError(error, req, res, null);
    }
}

async function getUserByName(req, res) {
    try {
        const query_result = await user_service.getUserByName(req.params.name);
        res.json(query_result);
    } catch (error) {
        console.error("ERROR: Couldn't get user " + req.params.name + ": ");
        handleError(error, req, res, null);
    }
}

async function createUser(req, res) {
    try {
        await user_service.createUser(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.error("ERROR: Couldn't create user:", error.message);
        handleError(error, req, res, null);
    }
}

async function deleteUser(req, res) {
    try {
        await user_service.deleteUser(req.params.name);
        return res.sendStatus(200);
    } catch (error) {
        console.error("ERROR: Couldn't delete user " + req.params.name + ":", error.message);
        handleError(error, req, res, null);
    }
}



module.exports = { getAllUsers, getUserByName, createUser, deleteUser };