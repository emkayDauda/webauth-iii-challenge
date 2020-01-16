const db = require('../database/dbConfig')
const users = require('../users/userModel')



function add(user){
    return db('users')
    .insert(user)
    .then(([id]) => users.get(id))
}

function findBy(filter) {
    return db('users')
    .where(filter)
    .first()
}

module.exports = {
    add,
    findBy,
}