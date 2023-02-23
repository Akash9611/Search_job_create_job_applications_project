import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'  //for Hashing password
import jwt from 'jsonwebtoken'  //for generating token 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 3,
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "lastName"
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "my city"
    },
})

//Password Hashing
userSchema.pre('save', async function () {   //save is built-in mongoose middleware instance and salt
    //    console.log(this.modifiedPaths()) //to see which field is modified when we are using updateUser route
    if (!this.isModified('password')) return //to stop modification of password at the updateUser time...and resolving error when updating user values
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//to grab some values for using into JWT
userSchema.methods.createJWT = function () {
    // console.log(this);
    // return jwt.sign({ userID: this._id }, 'jwtSecrete', { expiresIn: '1d' })  //jwtSecrete is dummy key here
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })

}

//for login ...checking password is matching/correct or not 
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User', userSchema)