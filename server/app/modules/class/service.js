const { Class } = require('../../models/class');

const getMany = () => {
    return Class.find();
}

const getOne = (id) => {
  return Class.findById(id);
}
const getByEmail = (email) => {
  return Class.find({email:email});
}
const create = (data) => {
    return Class.create(data);
  }
  
  const update = (id,data) => {
    return Class.findById(id).update(data)
  }
  
  const deleteOne = (id) => {
    return Class.findByIdAndRemove(id)
  }
  
  const deleteMany = (ids) => {
    return Class.deleteMany(
      {
          _id: { $in: ids },
      })
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