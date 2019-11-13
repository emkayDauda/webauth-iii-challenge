exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("userId");

    table
      .text("username")
      .notNullable()
      .unique();
    table.text("password").notNullable();
    table.text("department").notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
