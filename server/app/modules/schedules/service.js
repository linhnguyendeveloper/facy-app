const { Schedule } = require('../../models/schedules');

const getMany = (where={},filter={}) => {
  return Schedule.find({ deleted: {$ne:true},...where },filter);
}

const getOne = (where={}) => {
  return Schedule.findOne({ _id: id, deleted: { $ne: true },...where });
}
const getOneWhere = (where={}) => {
  return Schedule.findOne({  deleted: { $ne: true }, ...where});
}
const getCountOne = (id) => {
  return Schedule.findOne({ id, deleted: { $ne: true } });
}
const getByEmail = (email) => {
  return Schedule.find({ email: email });
}
const create = (data) => {
  return Schedule.create(data);
}

const update = (id, data) => {
  return Schedule.findById(id).update(data)
}

const deleteOne = (id) => {
  return Schedule.findById(id).update({ deleted: true })
}

const deleteMany = (ids) => {
  return Schedule.find(
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
  getCountOne,
  getOneWhere
}