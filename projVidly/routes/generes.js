const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const {Genere, validate} = require('../models/genere');
const auth = require('../middleware/auth');

const router = express.Router();


//get
router.get('/', async (req, res , next)=>
{
    // try {
    throw new Error('new error')
        const generes  = await Genere
        .find()
        .sort({name:1});
    
    res.send(generes);   
    // } catch (error) {
    //    next(error);
    // }

}
);


//post
router.post('/', auth ,async (req, res) =>
{
const isFind = await Genere
.find({genere : req.body.genere});
if (isFind) {
res.status(400).send("Already exsist");
return;
}

const {error} = validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

const oGenere = new Genere({
    genere: req.body.genere
});
try {
const data = await oGenere.save();
res.status(201).send(oGenere);  
} catch (error) {
for(field in error.errors)
{
    console.log(error.errors[field]);
    res.send(error.message);
}
}

}
)
//put
router.put('/:id' , async (req, res)=>{

    
const {error} = validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

const oGenere = await Genere.findByIdAndUpdate(req.param.id , {genere: req.body.genere},
{new: true});


if (!oGenere) {
res.status(400).send("Page not found!");
return;
}


res.send(oGenere);

});
//delete
router.delete('/:id', async (req, res) => {

    const oGenere = await Genere.findByIdAndRemove(req.param.id);


    if (!oGenere) {
    res.status(400).send("Page not found!");
    return;
    }
    
res.send(oGenere);

});

module.exports = router;
