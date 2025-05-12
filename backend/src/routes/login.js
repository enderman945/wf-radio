const express = require("express");
const controller = require("../controllers/auth");

const router = express.Router();

// Login
router.post("/", async (req, res) => {
        controller.login(req, res);
});

module.exports = router;