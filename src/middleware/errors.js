const AppError = require("../utils/AppError");

const handleError = (err, req, res, next) => {
    // Send 
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    }

    // Default error
    res.status(500).json({
        message: 'Internal server error',
        status: 500
    });
}

module.exports = handleError;