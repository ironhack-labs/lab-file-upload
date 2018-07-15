const env = require('dotenv');
env.config();
env.config({path: './.env.private'});

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const hbs = require("hbs");

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "tumblrlabdev",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

require("./passport")(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.title = "IronTumblr";
  res.locals.user = req.user;
  res.locals.menuClass = "col";

  next();
});

const index = require("./routes/index");
const authRoutes = require("./routes/authentication");
const postsRoutes = require("./routes/postsRouter");
const commentsRoutes = require("./routes/commentsRouter");
app.use("/", index);
app.use("/", authRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
