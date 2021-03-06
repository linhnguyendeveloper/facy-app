const { User } = require('../../models/users');

const getMany = () => {
  return User.find({ deleted: {$ne:true} });
}

const getOne = (id) => {
  return User.findOne({ _id: id, deleted: {$ne:true} });
}
const getByEmail = (email) => {
  return User.find({ email: email });
}
const create = (data) => {
  return User.create(data);
}

const update = (id, data) => {
  return User.findById(id).update(data)
}

const deleteOne = (id) => {
  return User.findById(id).update({ deleted: true })
}

const deleteMany = (ids) => {
  return User.find(
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
  getByEmail
}