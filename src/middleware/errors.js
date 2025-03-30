const AppError = require("../utils/appError");

const handleError = (err, req, res, next) => {
    
    // Send error infos
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Default error
    res.status(500).json({
        message: 'Internal server error',
        status: 500
    });
}

module.exports = handleError;