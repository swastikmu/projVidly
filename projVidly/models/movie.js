const Joi = require('joi');
const mongoose = require('mongoose');
const {genereSchema} = require('./genere');

//create schema 

const movieSchema = new mongoose.Schema(
{
title: 
{
type: String , 
required: true , 
trim: true
},

genere:
{
type: genereSchema, //Used genere schema as reference of the Genre
required: true
},

numberInStock :{type: Number ,  required: true , min: 0} ,
dailyRentalRate : {type: Number ,  required: true , min: 0} 
}
);

const Movie = new mongoose.model('Movie' , movieSchema);

function validateMovie(movie) {

const schema = {
title: Joi.string().required(),
genereId: Joi.string().required(), // we want customer to send only genre id only 
numberInStock: Joi.number().min(0).required(),
dailyRentalRate: Joi.number().min(0).required()

}

const result = Joi.validate(movie , schema);  
}
//remember Joi Schema and db schema is differnet. As we can see we took genreId only to send by user and but in schema we see we save whole data
exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;