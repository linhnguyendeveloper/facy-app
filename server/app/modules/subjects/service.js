const { Subject } = require('../../models/subjects');

const getMany = (where={},filter={}) => {
  return Subject.find({ deleted: {$ne:true},...where },filter);
}

const getOne = (id) => {
  return Subject.findOne({ _id: id, deleted: {$ne:true} });
}
const getOneWhere = (where={}) => {
  return Subject.findOne({...where, deleted: {$ne:true} });
}
const getByEmail = (email) => {
  return Subject.find({ email: email });
}
const create = (data) => {
  return Subject.create(data);
}

const update = (id, data) => {
  return Subject.findById(id).update(data)
}

const deleteOne = (id) => {
  return Subject.findById(id).update({ deleted: true })
}

const deleteMany = (ids) => {
  return Subject.find(
    {
      _id: { $in: ids },
    }).update({ deleted: true })
}

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  getByEmail,
  getOneWhere
}