const express = require('express');
const app = express();
var dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const passport = require('passport');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

var url = process.env.MONGO_URI;

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Successfully connected to database');
  }
);
// mongoose.set('useCreateIndex', true); //get rid of deprecation warning

const userRouter = require('./routes/User');
app.use('/user', userRouter);

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['profile'], session: false }),
//   function (req, res) {
//     console.log(req);
//   }
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/', session: false }),
//   function (req, res) {
//     console.log(req.user);
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

const workoutRouter = require('./routes/Workout');
app.use('/workout', workoutRouter);

app.listen(5000, function () {
  console.log('Server started on port 5000');
});
