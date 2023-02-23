import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err)  //todo: use when creating or developing react app and to see errors on console....comment it when deploying app

    //use [err.message] that directly throw error //Use website to learn [mdn web docs] (search => Error() constructor) 
    // console.log(err.message)  //taking error from authController file

    const defaultError = {
        // statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        // msg:'Something went wrong, please try again later '
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later '
    }

    //Checking  and Throwing error/Status Code for [require] values of Schema 
    if (err.name === "ValidationError") {  //name is object name comes from error [msg] array/Object
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // defaultError.msg = err.message       //to trigger only message from of object err/(msg)
        
        //to trigger particular msg that comes in [ errors ] array we use [ Object.values ] like following code
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')

    }
     
    //Checking  and Throwing error/Status Code for [unique] values of Schema 
    if(err.code && err.code===11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique` //to accessing the key prom error [msg] array/Object
    }
    // res.status(defaultError.statusCode).send({ msg: err })  //to see which field errors are you want to trigger
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })

}

export default errorHandlerMiddleware