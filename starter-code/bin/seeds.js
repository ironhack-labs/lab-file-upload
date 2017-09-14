const mongoose = require('mongoose');
const Users = require('../models/user');
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);


const users = [
  {
    username: "Santiago",
    email:    "estamos@.com",
    password: "trigo"
  },
  {
    username: "Paola",
    email:    "porquesi@",
    password: "chavez"
  },
];

Users.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach(p => console.log(p.name));
  mongoose.connection.close();
});
