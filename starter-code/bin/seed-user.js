require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');

const dbName = `${process.env.DATABASE}`;

mongoose
  .connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const users = [
  { username: "dummy1",
    email: "dummy1@gmail.com",
    password: "dummy1",
    picture: "dummy1"
  }
];


User.create(users)
.then(usersInserted => {
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err)
}) 