class ErrorHandler extends Error {
    constructor(message, status) {
        super(message)
        this.message = message
        this.status = status ? status : 404
    }
}

function errorMiddleware(error, req, res, next) {
    if (typeof error.message !== 'string' && process.env.NODE_ENV === 'production') {
        error.message = 'Unable to complete request. Please try again'
    }

    res.send({ error: { message: error.message, status: error.status } })
    next()
}

module.exports = { ErrorHandler, errorMiddleware }
