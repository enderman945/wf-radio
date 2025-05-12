const AppError = require("../utils/appError");

const handleError = (err, res) => {
    
    // Send error infos
    if (err instanceof AppError) {

        // Log
        if (err.statusCode == 500) {
            console.error("Error:", err.message);
            if (err.debugMsg) {
                console.debug("    >", err.debugMsg);
            }
        }

        // Response
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Default error
    console.error("Error:", err.message);
    res.status(500).json({
        message: 'Internal server error',
        status: 500
    });
}

module.exports = handleError;