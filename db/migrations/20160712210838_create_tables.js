exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('customers', function (table) {
    table.increments('id').primary().unsigned();
    table.string('full_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('phone_number').notNullable();
    table.string('billing_info').notNullable();
  }),
  knex.schema.createTable('owners', function (table) {
    table.increments('id').primary().unsigned();
    table.string('full_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('phone_number').notNullable();
    table.string('address').notNullable();
  }),
  knex.schema.createTable('dishes', function (table) {
    table.increments('id').primary().unsigned();
    table.string('dish_name').notNullable();
    table.string('dish_description').notNullable();
    table.float('price').notNullable();
    table.integer('owner_id').references('owners.id').notNullable();
  }),
  knex.schema.createTable('orders', function (table) {
    table.increments('id').primary().unsigned();
    table.float('total_cost').notNullable();
    table.timestamp('time_ordered').defaultTo(knex.fn.now()).notNullable();
    table.string('pickup_eta');
    table.integer('owner_id').references('owners.id').notNullable();
    table.integer('customer_id').references('customers.id').notNullable();
  }),
 knex.schema.createTable('order_dishes', function (table) {
    table.integer('quantity').notNullable();
    table.integer('dish_id').references('dishes.id').notNullable();
    table.integer('order_id').references('orders.id').notNullable();
  })
  ]);
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customers'),
    knex.schema.dropTable('owners'),
    knex.schema.dropTable('dishes'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTAble('order_dishes')
  ]);
};
