require('dotenv').config();

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

mongoose.connect(`mongodb://localhost:27017/tumblr-lab-development`,{useNewUrlParser:true})
.then(x=>{
  console.log(`Connected to Mongo`)
})
.catch(err=>{
  console.log('Error connecting Mongo',err)
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  session({
    secret: "tumblrlabdev",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);


app.use(flash());

require('./passport')(app);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/authentication");
app.use("/", authRoutes);

const postRoutes = require("./routes/post");
app.use("/", postRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});


app.locals.title = "IronTumblr";

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
