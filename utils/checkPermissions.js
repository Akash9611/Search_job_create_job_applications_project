import UnauthenticatedError from "../errors/unAuthenticatedError.js";

const checkPermissions = (requestUser, resourceUserId) =>{
//    if(requestUser.role === 'admin') return   //! if we have admin use this function to give access to admin to change and update anything -------only first return provide access to data ..but when we return and throw error it gives use only error 

    if(requestUser.userId === resourceUserId.toString()) return
    
    throw new UnauthenticatedError('Not Authorized to access this route')

}

export default checkPermissions 