'use strict'

const {StatusCodes,ReasonPhrases} = require('./httpStatusCode')

class ErrorResponse extends Error{
    constructor(message,status){
        super(message)
        this.status = status
    }

}

class ForbidenError extends ErrorResponse{
    constructor(message=ReasonPhrases.FORBIDDEN,statusCode=StatusCodes.FORBIDDEN){
        super(message,statusCode)

    }
}

class ConflicRequestError extends ErrorResponse{
    constructor(message=ReasonPhrases.CONFLICT,statusCode=StatusCodes.CONFLICT){
        super(message,statusCode)

    }
}

class BadRequestError extends ErrorResponse{
    constructor(message=ReasonPhrases.BAD_REQUEST,statusCode=StatusCodes.BAD_REQUEST){
        super(message,statusCode)

    }
}

class AuthFailureError extends ErrorResponse{
    constructor(message=ReasonPhrases.NON_AUTHORITATIVE_INFORMATION,statusCode=StatusCodes.NON_AUTHORITATIVE_INFORMATION){
        super(message,statusCode)

    }
}

class NotFoundError extends ErrorResponse{
    constructor(message=ReasonPhrases.NOT_FOUND,statusCode=StatusCodes.NOT_FOUND){
        super(message,statusCode)

    }
}

module.exports ={
    AuthFailureError,
    ConflicRequestError,
    BadRequestError,
    NotFoundError,
    ForbidenError
}