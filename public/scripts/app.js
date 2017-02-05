var sum = 0;
$(document).ready(function() {
  var items = [];
 $('.add').on('click', function(ev){
   $('.cart').append($(this).data("name"))
   $('.price').append($(this).data("price"))
   $('#total').addClass("show-me")
   $('.empty').empty().append(sum)
   $(this).each(function(){
     console.log(sum += $(this).data("price"));
   })
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
})
