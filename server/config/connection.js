const mongoose = require("mongoose");

// development connection
// mongoose.connect( "mongodb://localhost:27017/jobapptest", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// production connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;