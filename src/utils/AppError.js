class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        
        if (status_code.ToString().startsWith("4")) {
            this.status = "fail";
        } else {
            this.status = "error";
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