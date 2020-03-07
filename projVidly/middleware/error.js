
winston = require('winston');

const error = function(err , req, res ,next){
    //log the exception
    winston.log('error' , err.message);  //argument one is log level
    res.status(500).send('Something went wrong');


    //log level are - error warn info vebose debug silly
    

};

module.exports = error;