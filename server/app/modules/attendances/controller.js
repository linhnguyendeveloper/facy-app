const mongoose = require("mongoose");
const Service = require("./service");
const constants = require("../../utils/constants");
const { validateCreate, validateEdit } = require("../../models/attendances");
const getSlotByTime = require("../../utils/getSlotByTime");
const moment = require("moment");

const ControllerSubject = require("../subjects/controller");
const ServiceClass = require("../class/service");
const ServiceSubject = require("../subjects/service");
const ServiceUser = require("../users/service");
var nodemailer = require("nodemailer");
const { equal } = require("joi");

const getMany = (req, res) => {
  Service.getManyWhere()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};
const getForUser = (req, res) => {
  Service.getManyWhere({email:req.query.email})
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

const create = (req, res,classID,subject) => {
  let data = req.body;
  data.slot = getSlotByTime(new Date());
  data.class = classID
  data.subject = subject

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

const update = (req, res,classID,subject) => {
  let id = req.params.id;
  let data = req.body;
  data.class = classID
  data.subject = subject

  data.slot = getSlotByTime(new Date());
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
const findSubjectCurrent = () => {};
const checkUpdate = async (req, res) => {

  let data = req.body;
  let slot = getSlotByTime(new Date());
  let classCurrent = await ControllerSubject.subjectCurrent(req, res);
  console.log(classCurrent);
  const classNow = await ServiceSubject.getOneWhere({
    id: classCurrent.subject_id,
  });
  if (!classCurrent) return res.status(constants.CODE.GET_OK).json("null");
  let studentInClass = await ServiceClass.getOneWhere({
    id: classNow.class_id,
  });
  let teacher = await ServiceUser.getOne(classNow.teacher_id);
  if (
    !studentInClass ||
    !(studentInClass && studentInClass.students_email.includes(data.email))
  )
    return res.status(constants.CODE.GET_OK).json("null");

  const today = moment().startOf("day");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aintnolinh@gmail.com",
      pass: "pjtdshzafamgmctl",
    },
  });
  var mailOptions = {
    from: "aintnolinh@gmail.com",
    to: req.body.email,
    subject: "Attendances notification from FPT University",
    text: `
    You are absent today,
    Course : ${classCurrent.subject_id}
    At slot ${slot}`,
  };
  if(!req.body.status)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  Service.getOneWhere({
    email: data.email,
    room: data.room,
    created_at: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
    slot: slot,
  }).then(async (attendance) => {
    let count = 0;
    if (attendance) {
      req.params.id = attendance._id;
      await update(req, res,classCurrent.subject_id);
    } else await create(req, res,classCurrent.subject_id);
    setTimeout(async () => {
      await Service.getCount({
        room: data.room,
        created_at: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
        slot: slot,
        status: true,
      }).then((count) => {
        global.io.emit("countCurrent", {
          email: teacher.email,
          //  req.user.email,
          count,
          student: req.body,
        });
      });
    }, 1000);
  });
};

const getCountCurrent = async (req, res) => {
  let data = req.body;
  let slot = getSlotByTime(new Date());

  let room = await ControllerSubject.getRoomCurrent(req, res);
  const today = moment().startOf("day");
  await Service.getCount({
    room: room,
    created_at: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
    slot: slot,
    status: true,
  }).then((count) => {
    return res.status(constants.CODE.GET_OK).json({ count, room, slot });
  });
};

module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  checkUpdate,
  getCountCurrent,
  getForUser
};
