const User = require('../models/user');
const Post = require('../models/Post');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/tumblr-lab-development").then(() => console.log('Conectados a BD'));



User.findOne({username: "kathia"}).then((usr) => {
  const id = usr._id.toString();
  const posts = [
    {
      content: "Comentario post 1",
      creatorId: id,
      picPath: "prueba",
      picName: "prueba"
    },
    {
      content: "Comentario post 2",
      creatorId: id,
      picPath: "prueba",
      picName: "prueba"
    }
    ,
    {
      content: "Comentario post 3",
      creatorId: id,
      picPath: "prueba",
      picName: "prueba"
    }
  ];
  
  Post.collection.drop();
  
  Post.create(posts, (err, docs)=>{
   if (err) { throw err };
   posts.forEach( (post) => {
       console.log(post.content);
     })
     mongoose.connection.close();
  });

})