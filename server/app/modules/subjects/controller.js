const mongoose = require("mongoose");
const Service = require("./service");
const ServiceSchedules = require("../schedules/service");
const constants = require("../../utils/constants");
const { validateCreate, validateEdit } = require("../../models/subjects");
const { required } = require("joi");
const moment = require("moment");
const getSlotByTime = require("../../utils/getSlotByTime");

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
        return res.status(constants.CODE.CREATE_OK).json({
          message: "create successful",
        });
      })
      .catch((err) => {
        return res.status(constants.CODE.BAD_REQUEST).json(err.message);
      });
  }
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

const getCurrent = async (req, res) => {
  Service.getMany({ teacher_id: req.user._id }, { class_id: true, _id: false })
    .then(async (data) => {
      let dateTime = new Date();
      let slot = getSlotByTime(dateTime);
      data = data.map((item) => item.class_id);
      let schedules = await ServiceSchedules.getMany({
        class_id: { $in: data },
        year: dateTime.getFullYear(),
      });
      let id;
      await schedules.forEach((schedule) => {
        schedule.attendance.forEach((week) => {
          if (week)
            week.data_in_week.forEach((date) => {
              if (date && date.date == moment().format("MM/DD/YYYY")) {
                date.data_in_date.forEach((item) => {
                  if (item.slot === slot) id = item.subject_id;
                });
              }
            });
        });
      });
      let result = null;
      if (id) result = await Service.getOneWhere({ id });
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};

const getRoomCurrent = async (req, res) => {
  let result = null;
  await Service.getMany(
    { teacher_id: req.user._id },
    { class_id: true, _id: false }
  ).then(async (data) => {
    let dateTime = new Date();
    let slot = getSlotByTime(dateTime);
    data = data.map((item) => item.class_id);
    let schedules = await ServiceSchedules.getMany({
      class_id: { $in: data },
      year: dateTime.getFullYear(),
    });
    await schedules.forEach((schedule) => {
      schedule.attendance.forEach((week) => {
        if (week)
          week.data_in_week.forEach((date) => {
            if (date && date.date == moment().format("MM/DD/YYYY")) {
              date.data_in_date.forEach((item) => {
                if (item.slot === slot) result = item.room;
              });
            }
          });
      });
    });
  });
  return result;
};

const subjectCurrent = async (req, res) => {
  let result = null;

  await Service.getMany(
    // { teacher_id: req.user._id },
    {},
    { class_id: true, _id: false }
  )
    .then(async (data) => {
      console.log('non');

      let dateTime = new Date();

      let slot = getSlotByTime(dateTime);
      data = data.map((item) => item.class_id);
      let schedules = await ServiceSchedules.getMany({
        // class_id: { $in: data },
        year: dateTime.getFullYear(),
      });
      let id;
      await schedules.forEach((schedule) => {
        schedule.attendance.forEach((week) => {
          if (week)
            week.data_in_week.forEach((date) => {
              if (date && date.date == moment().format("MM/DD/YYYY")) {
                date.data_in_date.forEach((item) => {
                  if (item.slot === slot) result = {...item};
                });
              }
            });
        });
      });
      return result;
    })
    .catch((err) => {
      return null;
    });
  return result;
};

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  getCurrent,
  subjectCurrent,
  getRoomCurrent
};
