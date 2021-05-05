const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ShareMyCraftAPI';


const mongoATLAS = "mongodb+srv://p2user:mongo@cluster0.g1dly.mongodb.net/test";

mongoose.connect(mongoATLAS, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose } 
