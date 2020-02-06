const db = require('../data/db-config.js');

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id) {
    return db('steps')
        .select(
            'steps.id',
            'schemes.scheme_name',
            'steps.step_number',
            'steps.instructions'
        )
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .where({ scheme_id: id });
}

function add(newData) {
    return db('schemes')
        .insert(newData)
        .then(id => findById(id[0]));
};


module.exports = {
    find,
    findById,
    add,
    findSteps
};