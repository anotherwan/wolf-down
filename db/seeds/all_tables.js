exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('order_dishes').del(),
    knex('orders').del(),
    knex('dishes').del(),
    knex('owners').del(),
    knex('customers').del()
  ])
    .then(() => {
      return Promise.all([
        knex('customers').insert({
          id: 1,
          full_name: 'Dave Dee',
          email: 'dd@example.com',
          password: '1234',
          phone_number: '416-333-3333',
          billing_info: 'strip_credit_number'
        }),

        knex('owners').insert({
          id: 2,
          full_name: 'Alex Sieban',
          email: 'as@example.com',
          password: '4321',
          phone_number: '416-222-2222',
          address: '46 Spadina Ave - 4th Floor, Toronto, ON M5V 2H8'
        })]).then(() => {
          return Promise.all([
            knex('dishes').insert({
              id: 1,
              dish_name: 'Good Enough Burger',
              dish_description: 'Beef Patty, Havarti, Swiss, Lettuce, Onion, Tomato, a Pickle',
              price: '8',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 2,
              dish_name: 'Trendy Hipster Burger',
              dish_description: 'Beef Patty, Bacon, Brie, Avocado, Green Onion, a Fried Egg',
              price: '11',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 3,
              dish_name: 'Big Boi Burger',
              dish_description: 'Fried Chicken Patty, Peameal, Cheddar, Fried Onions, Lettuce, BBQ Sauce',
              price: '12',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 4,
              dish_name: 'Swiss Mushy Burger',
              dish_description: 'Beef Patty, Swiss, Mushrooms, Caramelized Onions, Tomato, Lettuce, a Pickle, Gravy',
              price: '10',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 5,
              dish_name: 'Annihilator',
              dish_description: 'Double Patty, Double Bacon, Double Cheese, Double Bun',
              price: '17',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 6,
              dish_name: 'Chicago Blue',
              dish_description: 'Beef Patty, Blue Cheese, Mushrooms, a Massive Onion Ring',
              price: '13',
              owner_id: 2
            }),

            knex('orders').insert({
              id: 4,
              total_cost: '12.50',
              pickup_eta: '20',
              owner_id: 2,
              customer_id: 1
            })

          ])
        }).then(() => {
          return Promise.all([
            knex('order_dishes').insert({
              quantity: 1,
              dish_id: 3,
              order_id: 4
            })
          ])
        })
    })
}
