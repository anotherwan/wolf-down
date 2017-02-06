var sum = 0;
var quant = 0;
var quant2 = 0;
var obj = 0;
$(document).ready(function() {
  var items = [];
 $('#add').on('click', function(ev){
    $(this).each(function(){
     console.log(sum += $(this).data("price"));
   })

//<td class="orange lighten-3">Total Items:            ${quant += 1}</td>

    //$('.title').empty().append(`<ul><li> ${$(this).data("name")} $${$(this).data("price")}</li></ul>`)

    $('.sub').empty().append(`<li>Total Items: ${quant += 1}</li>
     <li>Total $${sum}</li>
     <li>13% Sales Tax:${(sum * 0.13).toFixed(2)}</li>
     <li class="light-green lighten-2"> Total After Tax: ${(sum + (sum * 0.13)).toFixed(2)}</li>`)

   clickedItemId = $(this).data("items");
   console.log(clickedItemId);
   clickedItemName = $(this).data("name");
   var itemIndex = items.findIndex(function(item){
    return item.id === clickedItemId;
   });
   if (itemIndex === -1) {
    items.push({id: clickedItemId, quantity: 1, name: clickedItemName })
   } else {
    items[itemIndex].quantity += 1;
   }
   console.log(items)
 })
 $('#buy-now').on('submit', function(e) {
  e.preventDefault()
  $.ajax({
    method: "POST",
    url: "/menu/cart/buy",
    data: {items: items}
  })
  .done(function(){
    alert("FOOD ORDER RECIEVED")
  })
 })
 $('.clear').on('click', function(){
  $('.reg-form').trigger('reset');
})
   $('.parallax').parallax();
}) //documentready
//   $('.button').on('click', function() {
//     $('#sum').addClass("show-me");
//     .append(sum += parseInt($(this).data("price")));
//   })
// })
// $('#total').addClass("show-me")
// $('.empty').empty().append(sum)
// $(this).each(function(){
//   console.log(sum += $(this).data("price"));
// })
// function appendItemToOrder(order, newItem) {
//   let ifItemFound = false;
//   let newOrder = [];
//   for (let i = 0; i < order.length; i++) {
//     if (order[i].id === newItem) { //if existing order equals the new item selected
//       let updatedItem = {};
//       updatedItem.id = order[i].id
//       // debugger;
//       updatedItem.quantity = Number(order[i].quantity) + 1;
//       newOrder[i] = updatedItem;
//       ifItemFound = true;
//     }  else {
//       newOrder[i] = order[i]
//     }
//   }
//     if (!ifItemFound) {
//       newOrder.push({id: newItem, quantity: 1})
//     }
//   return newOrder;
// }
