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

  knex.schema.createTable('items', function (table) {
    table.increments('id').primary().unsigned();
    table.float('price').notNullable();
    table.integer('quantity').notNullable();
    table.integer('owner_id').references('owners.id').notNullable();

  }),

 knex.schema.createTable('orders', function (table) {
    table.increments('id').primary().unsigned();
    table.float('totalcost').notNullable();
    table.timestamp('time_ordered').defaultTo(knex.fn.now()).notNullable();
    table.string('pickup_eta');
    table.integer('item_id').references('items.id').notNullable();
    table.integer('owner_id').references('owners.id').notNullable();
    table.integer('customer_id').references('customers.id').notNullable();
  })


  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customers'),
    knex.schema.dropTable('owners'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('orders')
  ]);
};
