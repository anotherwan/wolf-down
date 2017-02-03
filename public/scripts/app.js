// const knexConfig = require('./knexfile');
// const knex = require('knex')(knexConfig[ENV]);

// function createHtml(dish){
//   let html = `
//      <section >
//       <article >
//         <header>
//         </header>
//           <body>
//             <div> ${dish.dishes.dishes_name} : ${dish.dishes.price}  </div>
//             <div> Total Cost : </div>
//           </body>
//             <footer>
//             </footer>
//       </article>
//     </section>
//   `

//   return html

//  }


// // function totalPrice(){}

// function createCartElement(data){
// return data.map(createHtml)
// }

// function renderCart(){
// $dishes.forEach(dish =>{
//   $('.cart').append(dish)
// })
// }

// $(document).ready(function() {

//   function loadCart() {
//    $.getJSON('/menu/cart/cart')
//    .then((dishes) => {
//       console.log(dishes)
//       var $dishes = createCartElement(dishes);
//       renderCart($dishes);
//     })
//   };

//   loadCart();

"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/menu/cart", (req, res) => {
    knex
      .select("*")
    .from("dishes")
    .then((results) => {
      res.render('cart', {results});
    });
  });

  return router;

}


  // $('.add').on('click', function(ev) {
  //   console.log(ev)


    // ev.preventDefault();

    // let formdata = $(this).serialize()
    // console.log(this)

    // $.ajax('/menu/cart/cart', {method: "POST", data: formdata})
    //   .then((results) => {

    //     $(".cart").empty()
    //     loadCart()
    //   })
    //   .fail((error) => console.error(error))


//   });
// });



