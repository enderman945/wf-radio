const handleError = require("../middleware/errors");
const user_service = require("../services/userService")
const { authorizeUserModification } = require("../middleware/auth");


async function listUsers(req, res) {
    try {
        // Query
        const query_result = await user_service.getAllUsers();
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function getUserByName(req, res) {
    try {
        // Query
        const query_result = await user_service.getUserByName(req.params.name);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function createUser(req, res) {
    try {
        // Query
        const query_result = await user_service.createUser(req.body);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function modifyUser(req, res) {
    try {
        // Query
        const diff_data = req.body;
        const query_result = await user_service.modifyUser(diff_data);
        res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}

async function deleteUser(req, res) {
    try {
        // Authenticate
        await authorizeUserModification(req);
        // Query
        const user = req.params.name;
        const token_user = req.token_infos
        const query_result = await user_service.deleteUser(user, token_user);
        return res.json(query_result);
    } catch (error) {
        handleError(error, res);
    }
}



module.exports = { listUsers, getUserByName, createUser, modifyUser, deleteUser };