
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

//   $('.add').on('click', function(ev) {
//     console.log("submitting")
//     ev.preventDefault();

//     let formdata = $(this).serialize()
//     console.log(this)

//     $.ajax('/menu/cart/cart', {method: "POST", data: formdata})
//       .then((results) => {

//         $(".cart").empty()
//         loadCart()
//       })
//       .fail((error) => console.error(error))


//   });
// });

//if button is in ejs file it must be hidden and stored in cart
//then on the .add click event display to shown

// function sum(prices) {
//   let total = 0
// }

// $(document).ready(function() {
//     $('.add').on('click', function(ev){
//   console.log(event.target);
//   // alert($(this).data("price"));
//   $('.cart').append(`<ul><li> $${$(this).data("price")} and ${$(this).data("name")} </li></ul>)`
//   // `${('.subtotal').addClass("show-me")};`
// )}
var sum = 0;

$(document).ready(function() {
  // $('#sum').hide()
  $('.add').on('click', function(ev){
    $('.cart').append(`<ul><li>$${$(this).data("price")} ${$(this).data("name")}</li></ul>`)
    $('#total').addClass("show-me")
    $('.empty').empty().append(sum)
    $(this).each(function(){
      console.log(sum += $(this).data("price"));
    })
  })

  $('.clear').on('click', function(){
    $('.reg-form').trigger('reset');
  })
})


//   $('.button').on('click', function() {
    // $('#sum').addClass("show-me");
    //.append(sum += parseInt($(this).data("price")));
//   })




