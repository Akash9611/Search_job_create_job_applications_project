import { StatusCodes } from "http-status-codes"
import customStatusCodeError from "./customStatusCodeErr.js"

class BadReqError extends customStatusCodeError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadReqError