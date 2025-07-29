const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session")
require("dotenv").config();

const servicesRouter = require("./routes/services");
const servicesCategoryRouter = require("./routes/services-category");
const servicesFavoritesRouter = require("./routes/services-favorites");
const servicesSearchRouter = require("./routes/services-search");
const loginRouter = require("./routes/user/login");
const signUpRouter = require("./routes/user/signup");
const logoutRouter = require("./routes/user/logout");
var locationEditRouter = require('./routes/user/location-edit');
var serviceEditRouter = require('./routes/user/service-edit');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
}))
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
app.use("/logout", logoutRouter);
app.use('/location-edit', locationEditRouter);
app.use('/service-edit', serviceEditRouter);

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
