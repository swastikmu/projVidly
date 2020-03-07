require('express-async-errors');//try catch error handling for unhandled promise rejection
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const generes = require('./routes/generes');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const winston = require('winston');

//connect to mangoDB
mongoose.connect('mongodb://localhost/proj-Vidly')
.then(()=> console.log('Connected to database...'))
.catch(err => console.error('unable to connect to database' , err)); 


app = express();

winston.add(winston.transports.File , {filename: 'logfile.log'});
// if (!config.get('jwtPrivateKey')) {
//     console.log('FATAL ERROR! jwt private key not defined');
// }

app.use(express.json());//parse the json body request


//added to middleware 
//with the above line we are tellig the express framework for any erquest of type '/api/genere' use the middleware ./routes/generes by passing
//the  generes object of const generes
app.use('/api/generes' , generes); 
app.use('/api/customer' , customers); 
app.use('/api/movies' , movies);
app.use('/api/rentals' , rentals);
app.use('/api/users' , users);
app.use('/api/auth' , auth);

// app.use(function(err , req, res ,next){
//     //log the exception
//     res.status(500).send('Something went wrong');
// })

app.use(error);


app.listen(3000, ()=>{console.log('Listening for port no 3000...')});