const authService = require("../services/authService");
const AppError = require("../utils/appError");


function authenticateToken(req, res, next) {

    const auth_header = req.headers["authorization"];
    const token = auth_header && auth_header.split(' ')[1];
    
    if (token == null) {
        throw new AppError(401, "Unauthorized: missing or bad authorization header");
    }

    try {
        req.user = authService.verifyToken(token);
        next();
    } catch (err) {
        throw new AppError(403, "Forbidden: Error verifying the authorization token");
    }
}


module.exports = { authenticateToken }