const db = require('../database/dbConfig')
const users = require('../users/userModel')



function add(user){
    return db('users')
    .insert(user)
    .then(([id]) => users.get(id))
}

module.exports = {
    add
}