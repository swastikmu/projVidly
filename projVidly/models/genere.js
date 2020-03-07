const Joi = require('joi');
const mongoose = require('mongoose');

//create Schema
const genereSchema = new mongoose.Schema(
{

genere: {
type: String,
required: true,
minlength: 3,
maxlength: 30
}
}
);

//Creare Model

const Genere = new mongoose.model('Genere' , genereSchema);

function validateGenere(genere) {
const schema = {
genere: Joi.string().required()
};

return Joi.validate(genere , schema);  
}

exports.genereSchema = genereSchema;
exports.Genere = Genere;
exports.validate = validateGenere;