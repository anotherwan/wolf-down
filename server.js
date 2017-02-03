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

// Seperated Routes for each Resource
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

// Mount all resource routes
app.use("/", usersRoutes(knex));

// Home page
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
  res.render('login');
})


app.post("/login", (req, res) => {

   // knex
   //  .select('email', 'password')
   //  .from('customers')
   //  .then((results) => {
   //    let login = results
   //  })
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(results);
  // if(req.body.email === database.customers.email) {
  //   res.redirect('/')

  // } else {

  // }
})

app.get("/menu", (req, res) => {
  res.render('menu');
})

app.get("/menu/cart", (req, res) => {
  res.render('cart');
})

// app.post("/menu", (req, res) => {
//
// })

app.get("/menu/cart/cart", (req, res) => {
  console.log("71")

  knex("dishes")
  .join("order_dishes", "dishes.id" , "=" , "order_dishes.dishes_id")
  .join("orders","orders.id", "=", "order_dishes.order_id")
  .select('*')
    .then((results) => {
      res.json(results)

    })
  })



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
