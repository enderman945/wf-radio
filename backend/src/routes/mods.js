const express = require("express");
const controller = require("../controllers/mods");

const router = express.Router();

// Create a mod
router.post("/", async (req, res) => {
        controller.createMod(req, res);
});

// Modify mod
router.put("/:name", async (req,res) => {
        controller.modifyMod(req,res);
});

// Get mod infos
router.get("/:name", async (req,res) => {
        controller.getModByName(req, res);
});

// Delete mod
router.delete("/:name", async (req,res) => {
        controller.deleteMod(req, res);
});



// Create a mod version
router.post("/:name/versions", async (req, res) => {
        controller.createModVersion(req, res);
});

// Modify a mod version
router.put("/:name/versions", async (req,res) => {
        controller.modifyModVersion(req,res);
});

// Get mod versions
router.get("/:name/versions", async (req,res) => {
        controller.getModVersions(req, res);
});

// Delete mod version
router.delete("/:name/versions", async (req,res) => {
        controller.deleteModVersion(req, res);
});


module.exports = router;