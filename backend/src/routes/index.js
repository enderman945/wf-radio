const express = require("express");
const controller = require("../controllers/index");

const router = express.Router();


router.get('/version', async (res, req) => {
    controller.getVersion(res, req);
});

module.exports = router;