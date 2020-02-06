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

function add(newScheme){
    return db('schemes')
    .insert(newScheme)
    .then(ids => {
        const [id] = ids
        return findById(id)
    } )
}

function update(changes, id) {
    return db('schemes')
      .where({ id })
      .update(changes)
      .then(scheme => {
        return findById(id);
      });
}

function remove(id) {
    return db('schemes')
    .where('id', id)
    .del()
}

function addStep(step, id) {
    return db("steps").insert(step).where({scheme_id : id});
}
module.exports = {
    find,
    findById,
    add,
    findSteps,
    update,
    remove,
    addStep
};