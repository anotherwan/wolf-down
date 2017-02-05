"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");

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



app.use("/", usersRoutes(knex));

var accountSid = 'ACa16f1d16fc3ba8da7ba9d8ec18aa690b'
var authToken = 'a1c13cc4655406b94a8d34c2f8deaa65'

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);


app.get("/menu/cart/buy", (req, res) => {
  res.send("purchase")
})

// SMS ORDER TO RESTAURANT
app.post("/menu/cart/buy", (req, res) => {
  console.log("ITEMS", req.body.items);

  for(var i =0; i <req.body.items.length; i++){
   console.log("ID", req.body.items[i].id);
   console.log("QUANTITY", req.body.items[i].quantity)

    client.messages.create({
    body: `" ${req.body.items[i].quantity} orders of  ${req.body.items[i].name}"`,
    to: '+15149665034',  // Text this number 4
    from: '+16475572827' // From a valid Twilio number

   }, function(err, message) {
    console.log(message.sid);
  })
  }
     res.send('Hey')

});

//RESTAURANT REPLIES WITH SMS ETA and replies to the customer via sms- UPDATES SITE
app.post('/sms', function (req, res) {
  console.log("HEYY", req.body.Body)
 client.messages.create({
    body: `"Your order will be completed in ${req.body.Body} minutes"`,
    to: '+15149665034',  // Text this number 4
    from: '+16475572827' // From a valid Twilio number
    }, function(err, message) {
    console.log(message.sid);
    })

  // const body = req.body.Body
  res.set('Content-Type', 'text/plain')
  res.send(`You sent: ${req.body.Body} to Express`)

})
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("registration");
})

app.post("/register", (req, res) => {
 // TO DO: SEED DATA & EMAIL & REDIRECT TO HOME
})
app.get("/login", (req, res) => {
  console.log('REQ PARAMS', req.query);
  if (req.query.loginFailed) {
    console.log('LOGIN FAILED TRUE')
    res.render('login', {loginFailed: true});
  } else {
    console.log('LOGIN FAILED FALSE')
    res.render('login', {loginFailed: false});
  }
})
app.post("/login", (req, res) => {
    knex
    .select('email', 'password')
    .from('customers')
    .then((results) => {
      console.log('results:',results);
      if (req.body.email === results[0].email && req.body.password === results[0].password) {
        res.redirect('/')
      } else {
        res.redirect('/login?loginFailed=true')
           }
    })
  console.log('email:', req.body.email);
  console.log('password:', req.body.password);
})
app.get("/menu", (req, res) => {
  res.render('menu');
})

app.get("/menu/cart", (req, res) => {

  res.render('cart');
});

app.get('/ordersubmitted', (req, res) => {
  res.render('ordersubmitted')
})


app.listen(PORT , ()  => {

  console.log("Example app listening on port " + PORT);
});
