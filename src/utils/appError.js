class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        
        if (statusCode.toString().startsWith("4")) {
            this.status = "Fail";
        } else {
            this.status = "Error";
        }
    }
}

exports.tryCatch = (controller) => async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch(err) {
      next(err);
    }
}

module.exports = AppError;