require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors = require("cors");

// server
const port = 3001;

mongoose
  .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
  })
  .then(() => {
      app.listen(() => {
        console.log(`Server connected on ${port}`);
        console.log(`MongoDB Connected!`);
      });
  })
  .catch((e) => {
      console.log(e);
  });

const todoRouter = require("./routes/todo/todoRouter");

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/todos', todoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error', err);
});

module.exports = app;
