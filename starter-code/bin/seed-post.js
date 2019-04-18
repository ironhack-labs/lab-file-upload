require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/post');

const dbName = `${process.env.DATABASE}`;

mongoose
  .connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const posts = [
  {   
    content: "",
    creatorId: null,
    picPath: "",
    picName: ""
  }
];


Post.create(posts)
.then(postsInserted => {
  console.log(`Created ${posts.length} posts`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err)
}) 