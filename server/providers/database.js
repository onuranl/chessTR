const mongoose = require('mongoose')

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('connected to the database'))
  .catch((e) => console.log(e))
