import {StatusCodes} from 'http-status-codes'
import customStatusCodeError from './customStatusCodeErr.js'

class UnauthenticatedError extends customStatusCodeError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError