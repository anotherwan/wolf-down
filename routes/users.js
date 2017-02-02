"use strict";

const express = require('express');
const router  = express.Router();

<<<<<<< HEAD
module.exports = (knex) => {
  router.get("/menu", (req, res) => {
    knex
      .select("*")
      .from("dishes")
      .then((results) => {
        console.log(results)
        res.render('menu', {results});
    });
  });
=======
// module.exports = (knex) => {
//   router.get("/menu/cart", (req, res) => {
//     knex
//       .select("*")
//       .from("dishes")
//       .from("orders")
//       .then((results) => {
//         console.log(results)
//         res.render('cart', {results});
//     });
//   });
>>>>>>> b6d3c27545ddf0977ffc4389c5d8adb8e49da7f4

//   return router;
// }
