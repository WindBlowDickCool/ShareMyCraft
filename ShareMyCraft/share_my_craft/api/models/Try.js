const mongoose = require('mongoose');
const Try = mongoose.model('Try', new mongoose.Schema({
    comMsg: {
        type: String,
        required: true
    },
    triedCraft: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    authorname:{
        type: String,
        required: true
    },
    tryPic: {
        type: String,
        required: true
    }
}));

module.exports = { Try }
