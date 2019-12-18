const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findBy, 
    findById, 
    find
}

// ADD REGISTRATION
function add(user){
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

// FIND ID FOR REGISTRATION
function findById(id){
    return db('users')
        .where({ id })
        .first();
}

function find() {
    return db("users").select("id", "username", "department");
  }

// FIND USERS
function findBy(filter){
    return db('users')
        .where(filter);
}