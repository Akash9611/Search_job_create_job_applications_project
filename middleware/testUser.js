//! TestUser is for Demo purpose ..This user don't have any permissions like edit,add etc.

import { BadReqError } from "../errors/index.js";

const testUser = (req, res, next) => {
    if (req.user.testUser) {    //if req.userId have testUsers Id then it will Throw an error And showAlert as Test User. ReadOnly . Else if req.userId is user Id then it will go to next() and work as normal user 
        throw new BadReqError('Test User. Read Only!')
    }
    next()
}

export default testUser