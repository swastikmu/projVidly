const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const {Customer , validate } = require('../models/customer');

const router = express.Router();

//get
router.get('/', async (req, res)=>
{
try {
const customers  = await Customer
.find()
.sort({name:1}); 
} catch (error) {
res.send(error.message);
}

res.send(customers);
}
);

//post
router.post('/', async (req, res) =>{

const { error } = validate(req.body); 
if (error) return res.status(400).send(error.details[0].message);

const cust = Customer.findOne({ phone : req.body.phone });
if (cust) return res.status(400).send("User already registered");

const oCustomer = new Customer({
isGold : req.body.isGold,
name : req.body.name,
phone : req.body.phone
});

try {
const result = await oCustomer.save();    
res.status(201).send(oCustomer);
} catch (error) {
res.send(error.message);
}

});

//put
router.put('/:id' , async (req, res)=>{


const {error}  = validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

const oCustomer = await Customer.findByIdAndUpdate(req.param.id , {name: req.body.name ,
phone:req.body.phone , isGold:req.body.isgold},
{new: true});


if (!oCustomer) {
res.status(400).send("Page not found!");
return;
}
res.send(oCustomer);

});

//delete
router.delete('/:id', async (req, res) => {

const oCustomer = await Customer.findByIdAndRemove(req.param.id);


if (!oCustomer) {
res.status(400).send("Page not found!");
return;
}
res.send(oGenere);

});

module.exports = router;