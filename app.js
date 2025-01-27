var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
  origin: 'https://ruby-innovation-8308--dev0.sandbox.lightning.force.com', // Replace with your LWC app's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
      console.log('message: ' + msg);
      // Handle the message and potentially forward it to Salesforce or LINE API
  });

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
