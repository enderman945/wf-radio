const handleError = require("../middleware/errors");
const authService = require("../services/authService");

async function login(req, res) {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password
        const token = await authService.login(username, email, password);
        res.json({ token });
    } catch (err) {
        handleError(err, res);
    }
    
}

module.exports = { login };