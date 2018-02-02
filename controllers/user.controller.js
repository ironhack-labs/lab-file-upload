const User = require('../models/user.model');


module.exports.show = (req, res, next) => {
// res.send("req.params.id=="+req.params.id);
res.render('user/profile',{flash: req.flash()});

  //flash: req.flash()
};











// module.exports.show = (req, res, next) => {

//   Picture.find({
//       _creator: req.user._id
//     })
//     .then((picture) => {
//       if (picture.length!==0) {
//         res.render('user/profile', {
//           user: req.user,
//           picture: picture[0]
//         });
//       } else {
//         res.render('user/profile', {
//           user: req.user
//         });
//       }
//     })
//     .catch(error => next(error));
// };
// module.exports.upload = (req, res, next) => {
//   const pic = new Picture({
//     name: req.body.name,
//     pic_path: `/uploads/${req.file.filename}`,
//     pic_name: req.file.originalname,
//     _creator: req.user._id
//   });
//   pic.save()
//     .then(() => {
//       res.redirect('/user/profile');
//     })
//     .catch(error => {
//       if (error) {
//         console.log(error);
//         res.redirect('/error');
//       }
//     });
// };