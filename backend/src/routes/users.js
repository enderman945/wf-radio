const express = require("express");
const controller = require("../controllers/users");

const router = express.Router();

// List users
router.get("/", async (req,res) => {
        controller.listUsers(req,res);
});

// Create a user
router.post("/", async (req, res) => {
        controller.createUser(req, res);
})

// Get user infos
router.get("/:name", async (req,res) => {
        controller.getUserByName(req, res);
});

// Delete user
router.delete("/:name", async (req,res) => {
        controller.deleteUser(req, res);
});


module.exports = router;