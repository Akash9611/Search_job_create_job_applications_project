import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from "../errors/index.js"

//todo: Authentication/verifying token for user Authorization 

const auth = async (req, res, next) => {
 //! When we are Storing Token in Cookies 
  // console.log(req.cookies) //use it just to check token is present/null on console when we log in
  const token = req.cookies.token
  if(!token){
    throw new UnauthenticatedError('Authentication Invalid...')
  }

 /* //! when we are Storing Token in Local Storage
  const authHeader = req.headers.authorization   //for setting [authorization : Bearer <token>] for private pages...it is important for user privacy and unauthorized user can't access and change data of private pages of website that contains user details or anything

  if (!authHeader || !authHeader.startsWith('Bearer')) {  //startWith is javaScript builtin library function that allows us to check string is starting with given value in brackets
    throw new UnauthenticatedError('Authentication Invalid...')
  }
  const token = authHeader.split(' ')[1];    //in [Authorization:Bearer <token>] 1st value is Bearer and 2nd one is token...so we are selecting 2nd value from array i.e we use index[1] 
  //^^^^^^^^^^^^^^^^split is splitting  Bearer and token separately with single space ..and sto0re it index[0]='Bearer' ,index[1]='token'
  */
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(payload)
    // attach the user request object
    // req.user = payload

    //!use it when we don't have TestUser 
    //* req.user = {userId : payload.userId}   //inside payload userId comes from [model/User.js-> createJWT()] this userId is user for further changes in private pages of website

    //! TestUser when we have testUser we want to restrict the edit profile,add job etc functionality set it as Unauthorized only for TestUser..because we don't want give it permission to edit and add something it is only for demo purpose 
    const testUser = payload.userId === '63f4f4159e9e3b05971f5738';
    req.user = { userId: payload.userId, testUser }
    //!^^^^ TestUser^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid...')
  }
}

export default auth