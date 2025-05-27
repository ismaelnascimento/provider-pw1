var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var servicesRouter = require("./routes/services");
var servicesCategoryRouter = require("./routes/services-category");
var servicesFavoritesRouter = require("./routes/services-favorites");
var servicesSearchRouter = require("./routes/services-search");
var usersRouter = require("./routes/users/users");
var usersLoginRouter = require("./routes/users/login");
var usersLoginUserRouter = require("./routes/users/login-user");
var usersSignUpRouter = require("./routes/users/signup");
var usersSignUpUserRouter = require("./routes/users/signup-user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", servicesRouter);
app.use("/", servicesCategoryRouter);
app.use("/favorites", servicesFavoritesRouter);
app.use("/search", servicesSearchRouter);
app.use("/users", usersRouter);
app.use("/users/login", usersLoginRouter);
app.use("/users/login", usersLoginUserRouter);
app.use("/users/signup", usersSignUpRouter);
app.use("/users/signup", usersSignUpUserRouter);

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
