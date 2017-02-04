
var sum = 0;

$(document).ready(function() {
  var items = [];
 $('.add').on('click', function(ev){
   $('.cart').append(`<ul><li>$${$(this).data("price")} ${$(this).data("name")}</li></ul>`)
   $('#total').addClass("show-me")
   $('.empty').empty().append(sum)
   $(this).each(function(){
     console.log(sum += $(this).data("price"));
   })
   clickedItemId = $(this).data("items");
   console.log(clickedItemId);
   //create data id

   //returns true or false
   var itemIndex = items.findIndex(function(item){
    return item.id === clickedItemId;
   });
   if (itemIndex === -1) {
    items.push({id: clickedItemId, quantity: 1})
   } else {
    items[itemIndex].quantity += 1;
   }
   console.log(items)
 })

})

 $('#buy-now').on('submit', function(e) {
  e.preventDefault()
  $.ajax({
    url: "/menu/cart/buy",
    data: items
  })
  .done(function(){
    alert("FOOD ORDER RECIEVED")
  })
 })



  // $('.clear').on('click', function(){
  //   $('.reg-form').trigger('reset');
  // })


//   $('.button').on('click', function() {
    // $('#sum').addClass("show-me");
    //.append(sum += parseInt($(this).data("price")));
//   })





