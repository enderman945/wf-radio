const express = require("express");
const controller = require("../controllers/users");

const router = express.Router();

// List users
router.get("/", async (req,res) => {
        console.debug("Accessing users list");
        controller.getAllUsers(req,res);
});

// Create a user
router.post("/", async (req, res) => {
        console.debug("Creating user ", req.body.name);
        controller.createUser(req, res);
})

// Get user infos
router.get("/:name", async (req,res) => {
        const name = req.params.name;
        console.debug("Accessing user " + name)
        controller.getUserByName(req, res);
});

// Delete user
router.delete("/:name", async (req,res) => {
        const name = req.params.name;
        console.debug("Deleting user " + name)
        controller.deleteUser(req, res);
});


module.exports = router;