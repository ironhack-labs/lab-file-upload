require('dotenv').config();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

const dbName = `${process.env.DATABASE}`;

mongoose
  .connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const comments = [
  {   
    content: "",
    authorId: null,
    imagePath: "",
    imageName: ""
  }
];


Comment.create(comments)
.then(commentsInserted => {
  console.log(`Created ${comments.length} comments`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err)
}) 