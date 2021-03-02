const { Class } = require("../../models/class");

const getMany = () => {
  return Class.find({ deleted: { $ne: true } });
};

const getOne = (id) => {
  return Class.findOne({ id: id, deleted: { $ne: true } });
};

const getOneWhere = (where = {}) => {
  console.log('====================================');
  console.log('where : ',where);
  console.log('====================================');
  return Class.findOne({ ...where, deleted: { $ne: true } });
};
const getByEmail = (email) => {
  return Class.find({ email: email });
};
const create = (data) => {
  return Class.create(data);
};

const update = (id, data) => {
  return Class.findById(id).update(data);
};

const deleteOne = (id) => {
  return Class.findById(id).update({ deleted: true });
};

const deleteMany = (ids) => {
  return Class.find({
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
  getOneWhere
};
