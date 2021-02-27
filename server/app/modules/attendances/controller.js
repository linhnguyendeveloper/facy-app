const mongoose = require("mongoose");
const Service = require("./service");
const constants = require("../../utils/constants");
const { validateCreate, validateEdit } = require("../../models/attendances");
const { required } = require("joi");
const { Socket } = require("../../../config/socketio");

const getMany = (req, res) => {
  Service.getMany()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};

const getOne = (req, res) => {
  let id = req.params.id;
  Service.getOne(id)
    .then((data) => {
      return res.status(constants.CODE.GET_OK).json(data);
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const create = (req, res) => {
  let data = req.body;

  const err = validateCreate(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.status(constants.CODE.BAD_REQUEST).json(errors);
  } else {
    Service.create(data)
      .then((data) => {
        sendCountAttendance();
        return res.status(constants.CODE.CREATE_OK).json({
          message: "create successful",
        });
      })
      .catch((err) => {
        return res.status(constants.CODE.BAD_REQUEST).json(err.message);
      });
  }
};

const createMany = (req, res) => {
  let data = req.body;
  data = data.filter((item) => !validateCreate(item));
  Service.createMany(data)
    .then((data) => {
      return res.status(constants.CODE.CREATE_OK).json({
        message: "create successful",
      });
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const update = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let err = validateEdit(data);
  if (err && err.error) {
    let errors =
      err.error &&
      err.error.details.reduce((result, item) => {
        return {
          ...result,
          [item.path[0]]: item.message,
        };
      }, {});
    return res.status(constants.CODE.BAD_REQUEST).json(errors);
  } else {
    Service.update(id, data)
      .then((data) => {
        return res.status(constants.CODE.CREATE_OK).json({
          message: "edit successful",
        });
      })
      .catch((err) => {
        return res.status(constants.CODE.BAD_REQUEST).json(err.message);
      });
  }
};

const deleteOne = (req, res) => {
  let id = req.params.id;
  Service.deleteOne(id)
    .then(() => {
      return res.status(constants.CODE.DELETE_OK).json({
        message: "delete successful",
      });
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const deleteMany = (req, res) => {
  let ids = req.body.ids;
  Service.deleteMany(ids)
    .then(() => {
      return res.status(constants.CODE.DELETE_OK).json({
        message: "delete successful",
      });
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const sendCountAttendance = () => {
  // socket
  Service.getCount()
    .then((data) => {
      console.log('====================================');
      console.log('count : ',data);
      console.log('====================================');
    })
    .catch((err) => {
    //   return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
  Socket.emit("id", "ahihihihihi");
};

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
};
