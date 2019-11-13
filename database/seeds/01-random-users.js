
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password: 'aStrongPassword', department: "Academic"},
        { username: 'user2', password: 'aStrongPassword', department: "Finance"},
        { username: 'user3', password: 'aStrongPassword', department: "Academic"}
      ]);
    });
};
