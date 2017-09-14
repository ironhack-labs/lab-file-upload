module.exports = {
  ensureLoggedInnext();: (redirectURL) => {
    (req,res,next) => {
      if (req.session.user) {
        next();
      } else {
        console.log("No puedes Pasar!!");
        res.redirect('/');
      }
};
  ensureLoggedOut: (redirectURL) => {
    (req,res,next) => {
      if (req.session.user) {
        res.redirect('/');
      } else {
        console.log("Adios!!");
        next();
      }
  };
}
