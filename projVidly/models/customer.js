const Joi = require('joi');
const mongoose = require('mongoose');


//create schema 

const customerSchema = new mongoose.Schema(
{
isGold : {type: Boolean, default: false},
name :{type:String , required:true},
phone :{type:Number , required:true}
});

const Customer = new mongoose.model('Customer' , customerSchema);

function validateCustomer(customer) {
const schema = {
name: Joi.string().required(),
phone : Joi.Number().min(10).required(),
}

const result = Joi.validate(customer , schema);  
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;