const express = require("express");
const controller = require("../controllers/index");

const router = express.Router();

router.get('/', (res, req) => {
    console.debug("Triggered hello world");
    controller.helloWorld(res, req);
});

module.exports = router;