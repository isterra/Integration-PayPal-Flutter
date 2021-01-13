const transaction = require("../../controller/transaction");

exports.up = function(knex) {
  return knex.schema.createTable("orders",function (table) {
    table.uuid("id").primary();
    table.string("state").notNullable();
    table.string("create_time").notNullable();
    table.string("update_time").notNullable();
    table.string("total").notNullable();
    table.string("userEmail").notNullable();
    table.string("merchant_id").notNullable();
    table.string("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("orders");
};
