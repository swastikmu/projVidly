const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const {User, validate} = require('../models/user');

const router = express.Router();



router.post('/', async (req, res)=>
{
const {error} = validate(req.body);
if (error) {
return res.status(400).send(error.details[0].message);
}

let user = await User.findOne({email: req.body.email});
if(user) return res.status(400).send("User already registered");

//if not registered then register it

// user = new User({
//  name : req.body.name,
//  email : req.body.email,
//  password : req.body.password
// });

user = new User(
   _.pick(req.body , ['name', 'email', 'password'])); //the above one can be replaced by this using lodash .

   const  salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

await user.save();

//const token = jwt.sign({_id: user._id} , 'jwtPrivateKey'); //environment variable not working
const token = user.generateAuthToken();
res.header('x-auth-token' , token).send(_.pick(user, ['name' , 'email']));

}
);
//there is one npm package for password complexity joi-password-complaxity

module.exports = router;
