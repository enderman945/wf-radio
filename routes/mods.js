const express = require("express");

const router = express.Router();

// List mods
router.get("/list", async (req,res) => {
        console.log("Accessing mods list");
        res.send("No list yet");
});

module.exports = router;