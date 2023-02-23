import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadReqError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import attachCookies from "../utils/attachCookies.js"

// const registerUser = async (req, res, next) => {
//     try {
//         const user = await User.create(req.body)
//         res.status(201).json({ message: '"User registered successfully', result: user })
//     } catch (err) {
//         // res.status(500).json({msg:'server error'}) 
//                //OR
//         next(err)
//     }
// }


//After installing [ express-async-error ] package we Don't need to write [ try - catch ] blocks anymore
//this package can handle it automatically
const registerUser = async (req, res) => {

    const { name, email, password } = req.body           //to checking empty fields 
    if (!name || !email || !password) {                 //if field is empty we can directly throw error from here, without reaching to middleware
        // throw new Error('Please provide all values')  //inside error-handler file use [err.message] that directly throw this error to there but,[it has status code error so we use custom Error class extends to Error] because it giving 500 statusCode
        throw new BadReqError('please provide all values') //now it gives use wright status code as 400
    }

    //if user Already exists 
    const alreadyExists = await User.findOne({ email })
    if (alreadyExists) {
        throw new BadReqError('Email already exists')
    }

    //creating user /register user
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    attachCookies(res, token) //! storing token in Cookies
    res.status(StatusCodes.CREATED).json({
        user: {                                //we defining all without password to hid password 
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
        } //, token               //!use only when Storing Token in localStorage [don't need when we are using Cookies to store the Token] 
        , location: user.location
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    //for getting and checking email
    const user = await User.findOne({ email }).select('+password')
    if (!user) {                          //----------------------this up side code for disabling password when email will be get //and also to resolving [argument string error]
        throw new UnauthenticatedError('Invalid Credentials')
    }

    //for getting and checking password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    user.password = undefined //for hiding password to not show in response console //it's another method    

    //! Storing token in Cookies....1]we can use this method directly ...or 2]we can create different file that contains this code and called by only object/function by requiring that file ....
    /* //! 1]
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {     //1st value is name ,2nd is value of token that will get stored , 3rd ones are other options as follows
        httpOnly: true,    //only browser can read it
        expires: new Date(Date.now() + oneDay), //cookies expires in one day
        secure: process.env.NODE_ENV === 'production' // it is http secure [https]. It get only true when we are deploying application/ on production phase. It was stay false for development phase 
    })
    */
    //! 2]
    attachCookies(res, token) //! storing token in Cookies

    // res.status(StatusCodes.OK).json({ user, token, location: user.location }) //!use only when Storing token in localStorage 
    res.status(StatusCodes.OK).json({ user, location: user.location }) //!remove token from every json when we are using Cookies to store the token
}

const updateUser = async (req, res) => {
    const { name, email, lastName, location } = req.body

    if (!name || !email || !lastName || !location) {
        throw new BadReqError('Please provide all values')
    }

    const user = await User.findOne({ _id: req.user.userId }) //userId is payload comes form auth.js file and also we can see it in jwt token setup method in User.js model

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();  //to store updated values

    const token = user.createJWT(); //generating new token
    attachCookies(res, token) //! storing token in Cookies

    res.status(StatusCodes.OK).json({ user, token, location: user.location })//!use only when Storing token in localStorage 
    res.status(StatusCodes.OK).json({ user, location: user.location })//!remove token from every json when we are using Cookies to store the token

}

//This req for when creating / storing token inside COOKIES the values of user and location is not get properly stored(like localStorage).Because of that when we refresh the page- we will get logged-out automatically and the state value of user will get cleared. i.e why we have to store user values in state properly for that we creating this route  
const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    res.status(StatusCodes.OK).json({ user, location: user.location })
}

// when we are using COOKIES approach we have to set separate route for removing token when we are logout
const logout = async(req,res)=>{
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({msg:'Use Logout Successfully!'})
}

export { registerUser, loginUser, updateUser, getCurrentUser, logout }