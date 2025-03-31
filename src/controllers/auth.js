const handleError = require("../middleware/errors");
const authService = require("../services/authService");

async function login(req, res) {
    try {
        const token = await authService.login(req.body.username, req.body.password);
        res.json({ token });
    } catch (err) {
        handleError(err, req, res, null);
    }
    
}