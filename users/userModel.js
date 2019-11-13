const db = require('../database/dbConfig')

function get(id){
    let query = db('users as u')

    if (id) query.where('u.userId', id)

    return query
}


module.exports = {
    get,
    // add,
}