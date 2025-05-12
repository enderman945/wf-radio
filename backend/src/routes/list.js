const express = require("express");
const { listMods } = require("../controllers/mods");
// const { listModpacks } = require("../controllers/modpacks");
const { listUsers } = require("../controllers/users");

const router = express.Router();

// List mods
router.get("/mods", async (req,res) => {
        listMods(req, res);
});

// List modpacks
// router.get("/modpacks", async (req,res) => {
//     listModpacks(req, res);
// });

// List users
router.get("/users", async (req,res) => {
    listUsers(req, res);
});


module.exports = router;