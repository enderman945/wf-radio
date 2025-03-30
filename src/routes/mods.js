const express = require("express");
const controller = require("../controllers/mods");

const router = express.Router();

// List mods
router.get("/", async (req,res) => {
        console.debug("Accessing mods list");
        controller.getAllMods(req,res);
});

// Create a mod
router.post("/", async (req, res) => {
        console.debug("Creating mod ", req.body.name);
        controller.createMod(req, res);
})

//
router.get("/:name", async (req,res) => {
        const name = req.params.name;
        console.debug("Accessing mod " + name)
        controller.getModByName(req, res);
});

//
router.delete("/:name", async (req,res) => {
        const name = req.params.name;
        console.debug("Deleting mod " + name)
        controller.deleteMod(req, res);
});


module.exports = router;