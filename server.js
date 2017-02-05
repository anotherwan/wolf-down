"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const cookieSession = require('cookie-session')



const app         = express();


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const usersRoutes = require("./routes/users");




// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key']
}))

// Mount all resource routes
app.use("/", usersRoutes(knex));

// Seperated Routes for each Resource

// Twilio Credentials
// const accountSid = require('.env')
// const authToken = require('.env')

var twilio = require('twilio');
// var client = new twilio.RestClient(accountSid, authToken);

app.get("/menu/cart/buy", (req, res) => {
  res.send("purchase")
})


app.post("/menu/cart/buy", (req, res) => {
  console.log("BODY", req.body);
    client.messages.create({
    body: "HAY4",
    to: '+15149665034',  // Text this number 4
    from: '+16475572827' // From a valid Twilio number
    }, function(err, message) {
    console.log(message.sid);
})
     res.send('Hey')
});

app.get("/", (req, res) => {
  if (req.session.user_id) {
    knex
    .select('email')
    .from('customers')
    .where({id: req.session.user_id})
    .then((results) => {
      // console.log('RESULTSSSSS', results[0]);
    res.render("index", {email: results[0].email})
    })
  } else {
    // console.log('OTHER RESULT', req.session)
  res.render("index", {email: null});
  }
});

app.get("/register", (req, res) => {
  res.render("registration", {email: null});
})

app.post("/register", (req, res) => {
 // TO DO: SEED DATA & EMAIL & REDIRECT TO HOME
})

app.get("/login", (req, res) => {
  // console.log('REQ PARAMS', req.query);
  if (req.query.loginFailed) {
    // console.log('LOGIN FAILED TRUE')
    res.render('login', {loginFailed: true, email: null});
  } else {
    // console.log('LOGIN FAILED FALSE')
    res.render('login', {loginFailed: false, email: null});
  }
})

app.post("/login", (req, res) => {
    knex
    .select('id', 'email', 'password')
    .from('customers')
    .then((results) => {
      console.log('results:',results);
      if (req.body.email === results[0].email && req.body.password === results[0].password) {
        req.session.user_id = results[0].id
        console.log(req.session)
        res.redirect('/')
      } else {
        res.redirect('/login?loginFailed=true')
      }
    })
  // console.log('email:', req.body.email);
  // console.log('password:', req.body.password);
})

app.post('/logout', (req, res) => {
  req.session = null
  res.redirect('/login')
})

app.get("/menu", (req, res) => {
  if (req.session.user_id) {
   knex
    .select('*')
    .from("dishes")
    .then(function(dishes){
        knex.select('email')
          .from("customers")
          .where({id: req.session.user_id})
          .then(function(email) {
            console.log('RESULTIS', email)
            console.log('RESULT2IS', dishes)
          res.render("menu", {email: email[0].email, dishes: dishes})
          })
    })
  } else {
    knex
     .select('*')
     .from("dishes")
     .then(function(dishes){
       res.render("menu", {email: null, dishes: dishes})
     })

  }
})

app.get("/menu/cart", (req, res) => {

  res.render('cart');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


// app.post("/menu", (req, res) => {
//
// })

// app.get("/menu/cart/cart", (req, res) => {
//   console.log("71")

//   knex("dishes")
//   .join("order_dishes", "dishes.id" , "=" , "order_dishes.dishes_id")
//   .join("orders","orders.id", "=", "order_dishes.order_id")
//   .select('*')
//     .then((results) => {
//       res.json(results)

//     })
//   })


// client.messages.create({
//     body: 'Hello from Node',
//     to: '+15149665034',  // Text this number
//     from: '+16475572827' // From a valid Twilio number

// }, function(err, message) {
//     console.log(message.sid);
// });
