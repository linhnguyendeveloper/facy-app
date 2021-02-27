const { Schedule } = require('../../models/schedules');

const getMany = () => {
  return Schedule.find({ deleted: {$ne:true} });
}

const getOne = (id) => {
  return Schedule.findOne({ _id: id, deleted: {$ne:true} });
}
const getByEmail = (email) => {
  return Schedule.find({ email: email });
}
const create = (data) => {
  return Schedule.create(data);
}
const createMany = (data) => {
  return Schedule.insertMany(data);
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
  createMany
}