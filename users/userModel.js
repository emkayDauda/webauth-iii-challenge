const db = require('../database/dbConfig')

function get(id){
    let query = db('users as u')

    if (id) query.where('u.id', id)

    return query
}

function add(user){
    return db('users')
    .insert(user)
    .then(([id]) => this.get(id))
}

module.exports = {
    get,
    add,
}