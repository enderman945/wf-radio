const express = require("express");
const controller = require("../controllers/mods");

const router = express.Router();

// List mods
router.get("/", async (req,res) => {
        console.debug("Accessing mods list");
        res.send(controller.getAllMods());
        // res.send("No list yet");
});

router.get("/:name", async (req,res) => {
        const name = req.params.name;
        console.debug("Accessing mod " + name)
        res.send("Not implemented");
        // res.send(name + " is not there yet");
})

module.exports = router;