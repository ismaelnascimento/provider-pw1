var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { MongoClient } = require("mongodb")
require("dotenv").config();
const URI = process.env.URI;
const client = new MongoClient(URI);

const db = client.db("provider")
const dbUsers = db.collection("users")
const dbServices = db.collection("services")
const dbCategories = db.collection("categories")



var servicesRouter = require("./routes/services");
var servicesCategoryRouter = require("./routes/services-category");
var servicesFavoritesRouter = require("./routes/services-favorites");
var servicesSearchRouter = require("./routes/services-search");
var loginRouter = require("./routes/user/login");
var signUpRouter = require("./routes/user/signup");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.getSearchParams = () => {
    const urlParams = new URLSearchParams(req.query);
    return urlParams.toString() ? '?' + urlParams.toString() : '';
  };
  next();
})

app.use("/", servicesRouter);
app.use("/category", servicesCategoryRouter);
app.use("/favorites", servicesFavoritesRouter);
app.use("/search", servicesSearchRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
