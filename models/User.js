var mongoose = require('mongoose');

var Userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});

var User = mongoose.model('User', Userschema);

module.exports = User;