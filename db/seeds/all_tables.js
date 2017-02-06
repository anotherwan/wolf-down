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
              img_url: 'images/good_enough_burger.png',
              dish_name: 'Good Enough Burger',
              dish_description: 'Beef Patty, Havarti, Swiss, Arugula, Tomato, a Pickle',
              price: '8',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 2,
              img_url: 'images/trendy_hipster_burger.png',
              dish_name: 'Trendy Hipster Burger',
              dish_description: 'Beef Patty, Peameal, Brie, Avocado, Caramelized Onions, a Fried Egg',
              price: '14',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 3,
              img_url: 'images/big_boi_burger.png',
              dish_name: 'Big Boi Burger',
              dish_description: 'Fried Chicken Patty, White Cheddar, Lettuce, BBQ Mayo Sauce',
              price: '12',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 4,
              img_url: 'images/swiss_mushy_burger.png',
              dish_name: 'Swiss Mushy Burger',
              dish_description: 'Beef Patty, Swiss, Mushrooms, Fried Onions, Tomato, Lettuce',
              price: '11',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 5,
              img_url: 'images/annihilator_burger.png',
              dish_name: 'Annihilator',
              dish_description: 'Double Patty, Double Bacon, Double Cheese, Double Bun, Lettuce, Tomato',
              price: '17',
              owner_id: 2
            }),

            knex('dishes').insert({
              id: 6,
              img_url: 'images/chicago_blue_burger.png',
              dish_name: 'Chicago Blue',
              dish_description: 'Double Portobello Patty, Blue Cheese, Swiss Cheese, Mushrooms, Sundried Tomatoes, a Massive Onion Ring',
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
