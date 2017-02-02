"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/menu", (req, res) => {
    knex
      .select("*")
      .from("dishes")
      .then((results) => {
        res.render('menu');
    });
  });

  return router;
}
