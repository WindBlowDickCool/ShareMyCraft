const mongoose = require('mongoose');
const Comment = mongoose.model('Comment', new mongoose.Schema({
    comMsg: {
        type: String,
        required: true
    },
    comCraft: {
        type: String,
        required: true
    },
    craftPic: {
    	type:String,
    	required: true
    },
    author: {
        type: String,
        required: true
    },
    authorname:{
        type: String,
        required: true
    }
}));

module.exports = { Comment }
