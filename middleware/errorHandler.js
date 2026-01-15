function errorHandler(err, req, res, next) {
    let statusCode = 500;
    let message = "Server error";

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)[0].message;
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    res.status(statusCode).json({ message });
}

module.exports = errorHandler;
