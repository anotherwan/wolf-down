"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // router.get('/menu/cart', (req, res) => {
    // knex('orders')
    // .join('order_dishes', 'orders.id', '=', 'order_dishes.order_id')
    // .join('dishes', 'dishes.id', '=', 'order_dishes.dishes_id')
    // .select('*')
    // .then((results) => {
    //   console.log(results)
      // res.render('menu', {results});
    // })
  // });



  router.get("/menu", (req, res) => {

    knex
      .select("*")
      .from("dishes")
      .then((results) => {
        console.log(results)
        res.render('menu', {results});
    });
  });

  return router;
}
