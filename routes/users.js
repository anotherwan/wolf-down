"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/menu", (req, res) => {
    // console.log('Here i AMMM')
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
