const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema(
{

name: {type: String,
required: true,
minlength: 3,
maxlength: 30
},
email: {type: String,
required: true,
minlength: 3,
unique: true,
maxlength: 255
},
password: {type: String,
required: true,
minlength: 3,
maxlength: 255
},
isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function(){

    const token = jwt.sign({_id: this._id , isAdmin: this.isAdmin} , 'jwtPrivateKey'); //environment variable not working
    return token;

}

const User = mongoose.model('User', userSchema);

function validateUser(user){
const schema = {
    name : Joi.string().required().min(3),
    email : Joi.string().required().min(3).email(),
    password : Joi.string().required().min(5)

}

return result = Joi.validate(user , schema)

}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;