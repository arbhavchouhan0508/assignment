const mongoose = require('mongoose');



// creating schema according to file

// <------------------------------------------------------>



const candidateSchema = new mongoose.Schema({
    'Name of the Candidate':{
        type:String,
        required:true
    },
    'Email':{
        type:String,
        required:true,
        unique:true
    },
    'Mobile No.':{
        type:Number
    },
    'Date of Birth':{
        type:Date
    },
    'Work Experience':{
        type:String
    },
    'Resume Title':{
        type:String
    },
    'Current Location':{
        type:String
    },
    'Postal Address':{
        type:String
    },
    'Current Employer':{
        type:String
    },
    'Current Designation':{
        type:String
    }
})


// <------------------------------------------------------>



// exporting schema
module.exports = mongoose.model('Candidate', candidateSchema);