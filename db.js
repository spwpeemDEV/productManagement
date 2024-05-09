const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/demov2',{
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));