const db = require('../database/dbConfig')

function get(id, filter){
    let query = db('users as u')

    if (id) query.where('u.userId', id).first()
    if (filter) query.where(filter)

    return query
}


module.exports = {
    get,
    // add,
}