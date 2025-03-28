const express = require("express");
const controller = require("../controllers/mods");

const router = express.Router();

router.get('/', (res, req) => {
    res.send("Hello there!");
});

module.exports = router;