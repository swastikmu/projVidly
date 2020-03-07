const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcrypt');

const {User} = require('../models/user');

const router = express.Router();


//get
router.post('/', async (req, res)=>
{
const {error} = validate(req.body);
if (error) {
return res.status(400).send(error.details[0].message);
}

let user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send("Invalid user name or password!");

//if not registered then register it

// user = new User({
//  name : req.body.name,
//  email : req.body.email,
//  password : req.body.password
// });

// user = new User(
//    _.pick(req.body , ['name', 'email', 'password'])); //the above one can be replaced by this using lodash .

   const  salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

const validpassword = await bcrypt.compare(req.body.password, user.password);
if (!validpassword) {
    return res.status(400).send("Invalid user name or password!"); 
}

//const token = jwt.sign({_id: user._id} , 'jetPrivateKey'); //generate token
//const token = jwt.sign({_id: user._id} , 'jwtPrivateKey'); //environment variable not working
const token = user.generateAuthToken();

res.send(token);

}
);
//there is one npm package for password complexity joi-password-complaxity


function validate(req){
const schema = {
    email : Joi.string().required().min(3).email(),
    password : Joi.string().required().min(5)

}

return result = Joi.validate(req , schema);

}

module.exports = router;
