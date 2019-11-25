const Photo = require("../models/Photo");

exports.homeView = async (req, res) => {
  const photos = await Photo.find();
  throw new Error("Esto no sirve");
  res.render("index", { photos });
};