const mongoose = require('mongoose');
//socialnetDB
mongoose.connect('mongodb://127.0.0.1:27017/socialnetDB');


module.exports = mongoose.connection;
