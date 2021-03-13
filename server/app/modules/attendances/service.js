const { Attendance } = require("../../models/attendances");

const getMany = () => {
  return Attendance.find({ deleted: { $ne: true } });
};

const getOne = (id) => {
  return Attendance.findOne({ _id: id, deleted: { $ne: true } });
};
const getCount = (where = {}) => {
  return Attendance.countDocuments({ ...where, deleted: { $ne: true } });
};

const getOneWhere = (where = {}) => {
  return Attendance.findOne({ ...where, deleted: { $ne: true } });
};
const getManyWhere = (where = {}) => {
  return Attendance.find({ ...where, deleted: { $ne: true } });
};
const getByEmail = (email) => {
  return Attendance.find({ email: email });
};
const create = (data) => {
  return Attendance.create(data);
};
const createMany = (data) => {
  return Attendance.insertMany(data);
};

const update = (id, data) => {
  return Attendance.findById(id).updateOne(data);
};

const deleteOne = (id) => {
  return Attendance.findById(id).update({ deleted: true });
};

const deleteMany = (ids) => {
  return Attendance.find({
    _id: { $in: ids },
  }).update({ deleted: true });
};

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  getByEmail,
  createMany,
  getCount,
  getOneWhere,
  getManyWhere
};
