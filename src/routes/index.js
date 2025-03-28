const express = require("express");
const controller = require("../controllers/index");

const router = express.Router();

router.get('/', (res, req) => {
    console.debug("Triggered hello world");
    controller.helloWorld(res, req);
});

router.get('/hey', (res, req) => {
    console.debug("Triggered hey");
    controller.hey(res, req);
});

module.exports = router;