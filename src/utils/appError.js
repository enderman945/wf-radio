class AppError extends Error {
    constructor(statusCode, status = "", message) {
        super(message);
        this.statusCode = statusCode;
        // Get status
        if (status === "") {
            if (statusCode.toString().startsWith("4")) {
                this.status = "Fail";
            } else {
                this.status = "Error";
            }
        } else {
            this.status = status;
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