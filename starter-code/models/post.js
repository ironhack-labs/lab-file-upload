


  const pic = new Picture({
    content: String,
    // creatorId - ObjectId of the post's creator
    picPath: `/uploads/${req.file.filename}`,
    picName: String
  });

  pic.save((err) => {
      res.redirect('/');
  });
});


const Post = mongoose.model('Post', UserSchema);

module.exports = Post;
