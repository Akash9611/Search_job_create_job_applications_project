import { StatusCodes } from "http-status-codes"
import customStatusCodeError from "./customStatusCodeErr.js"

class NotFoundError extends customStatusCodeError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError