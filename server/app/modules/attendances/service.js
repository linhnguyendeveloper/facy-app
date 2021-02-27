const { Attendance } = require('../../models/attendances');

const getMany = () => {
  return Attendance.find({ deleted: { $ne: true } });
}

const getOne = (id) => {
  return Attendance.findOne({ _id: id, deleted: { $ne: true } });
}
const getCountOne = (id) => {
  return Attendance.findOne({ id, deleted: { $ne: true } });
}
const getByEmail = (email) => {
  return Attendance.find({ email: email });
}
const create = (data) => {
  return Attendance.create(data);
}

const update = (id, data) => {
  return Attendance.findById(id).update(data)
}

const deleteOne = (id) => {
  return Attendance.findById(id).update({ deleted: true })
}

const deleteMany = (ids) => {
  return Attendance.find(
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
  getCountOne
}