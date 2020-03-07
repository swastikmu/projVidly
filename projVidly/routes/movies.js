const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const {Movie, validate} = require('../models/movie'); 
const {Genere} = require('../models/genere');


const router = express.Router();


//get
router.get('/', async (req, res)=>
{
const movies  = await Movie
.find()
.sort({name:1});

res.send(movies);
}
);


//post
router.post('/', async (req, res) =>
{
// const {error} = validate(req.body);
// if (error) return res.status(400).send(error.details[0].message);


const genere = await Genere.findById(req.body.genereId);
if (!genere) return res.status(400).send('Invalid genre.');


let movie = new Movie({ 
  title: req.body.title,
  genere: {
    _id: genere._id,
    genere: genere.genere
  },// here we only passed the genre id and name. we can pass const genre that we got by find by id. however that object might have other details also. we don't
  //need all those property to pass here. 
  numberInStock: req.body.numberInStock,
  dailyRentalRate: req.body.dailyRentalRate
});
console.log('hi');
movie = await movie.save();
res.send(movie);
});
//put 
router.put('/:id', async (req, res) => {
const { error } = validate(req.body); 
if (error) return res.status(400).send(error.details[0].message);

const genere = await Genere.findById(req.body.genereId);
if (!genere) return res.status(400).send('Invalid genre.');

const movie = await Movie.findByIdAndUpdate(req.params.id,
{ 
title: req.body.title,
genere: {
_id: genere._id,
genere: genere.genere
},
numberInStock: req.body.numberInStock,
dailyRentalRate: req.body.dailyRentalRate
}, { new: true });

if (!movie) return res.status(404).send('The movie with the given ID was not found.');

res.send(movie);
});


//delete
router.delete('/:id', async (req, res) => {
const movie = await Movie.findByIdAndRemove(req.params.id);

if (!movie) return res.status(404).send('The movie with the given ID was not found.');

res.send(movie);
});

router.get('/:id', async (req, res) => {
const movie = await Movie.findById(req.params.id);

if (!movie) return res.status(404).send('The movie with the given ID was not found.');

res.send(movie);
});

module.exports = router;
