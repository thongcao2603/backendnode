'use strict'

const StatusCode={
    FORBIDEN:403,
    CONFLICT:409
}
const ReasonStatusCode={
    FORBIDEN:'Bad request error',
    CONFLICT:'Conflict error'
}

class ErrorResponse extends Error{
    constructor(message,status){
        super(message)
        this.status = status
    }

}

class ForbidenError extends ErrorResponse{
    constructor(message=ReasonStatusCode.FORBIDEN,statusCode=StatusCode.FORBIDEN){
        super(message,statusCode)

    }
}

class ConflicRequestError extends ErrorResponse{
    constructor(message=ReasonStatusCode.CONFLICT,statusCode=StatusCode.CONFLICT){
        super(message,statusCode)

    }
}

class BadRequestError extends ErrorResponse{
    constructor(message=ReasonStatusCode.FORBIDEN,statusCode=StatusCode.FORBIDEN){
        super(message,statusCode)

    }
}

class AuthFailureError extends ErrorResponse{
    constructor(message="Unauthorized",statusCode=401){
        super(message,statusCode)

    }
}

class NotFoundError extends ErrorResponse{
    constructor(message="NotFound",statusCode=404){
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