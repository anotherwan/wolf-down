var sum = 0;
var quant = 0;
var quant2 = 0;
var obj = 0;
$(document).ready(function() {
 $('.parallax').parallax();
  var items = [];
 $('.add').on('click', function(ev){
    $(this).each(function(){
     console.log(sum += $(this).data("price"));
   })
    // $('#title').empty().append(
      // `<ul><li> ${$(this).data("name")} $${$(this).data("price")}</li></ul>`)
    //  $('#title').empty().append("<p> Item Added To Cart!<p>").fadeIn(2000)

    $('.sub').empty().append(
      `<div clas="row">
        <i class="material-icons small">view_day</i>&nbsp;Total Items:&nbsp;&nbsp; ${quant += 1}
      </div>
      <div class="row">
        <li class="right red-text text-darken-3">Total:&nbsp;&nbsp; $${sum}</li>
      </div>
      <div class="row">
        <li class="right red-text text-darken-3">13% Sales Tax: $${(sum * 0.13).toFixed(2)}</li>
      </div>
      <div class="row right">
        <li class="right"><i class="material-icons small">label</i>&nbsp;Total After Tax: $${(sum + (sum * 0.13)).toFixed(2)}</li>
      </div>
      <br>
      <div class="row">
        <li class="col offset-m3"><a href="/ordersubmitted">See My Order Status</a>
        </li>
      </div>
    `)

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
    window.setTimeout(function(){
      window.location.href="http://localhost:8080/ordersubmitted";
    }, 2000)

  })
 })
 $('.clear').on('click', function(){
  $('.reg-form').trigger('reset');
})
})
