const mongoose = require('mongoose');
const Craft = mongoose.model('Craft', new mongoose.Schema({
    coverName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    author: {
        type: String,
        required: true
    },
    authorname:{
        type: String,
        required: true
    },
    comments: {
        type: [{type: String}],
        default: [],
        required: false
    },
    likes: {
        type: [{type: String}],
        default: [],
        required: false
    },
    tries: {
        type: [{type: String}],
        default:[],
        required: false
    },
    totalLikes: {
        type: Number,
        required: false,
        default: 0        
    },
    totalComments: {
        type: Number,
        required: false,
        default: 0        
    },
    totalTries: {
        type: Number,
        required: false,
        default: 0        
    },

    intro: {
        type: String,
        required: false,
        default: "The author is lazy, no message is left."
    },
    supplies: {
        type: String,
        required: false,
        default: "The author is lazy, no message is left."
    },
    tips: {
        type: String,
        required: false,
        default: "The author is lazy, no message is left."
    },
    steps: {
        type: [{type: String}],
        default: [],
        required: false
    },
    stepPics: {
        type: [{type: String}],
        default: [],
        required: false
    },
    totalSteps: {
        type: Number,
        required: false,
        default: 0        
    }
}));

module.exports = { Craft }
