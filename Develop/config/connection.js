const mongoose = require('mongoose');


const mongoURI = 'mongodb://127.0.0.1:27017/socialnetDB';


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('Error connecting to MongoDB: ', error);
});


module.exports = mongoose.connection;

