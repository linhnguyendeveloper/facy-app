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
const getByClass = (req, res) => {
  Service.getManyWhere({class:req.query.class})
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

const create = (req, res,subject,classID) => {
  let data = req.body;
  data.slot = getSlotByTime(new Date());
  data.class = classID
  data.subject = subject
  console.log(data);
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
    console.log(data,'??');
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

const update = (req, res,subject,classID) => {
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
      user: "facydn.team@gmail.com",
      pass: "lstkhvazhuyfnigb",
    },
  });
  var mailOptions = {
    from: "facydn.team@gmail.com",
    to: req.body.email,
    subject: "Attendances notification from FPT University",
    text: `
Thân gửi sinh viên: Nguyễn Viết  Thuận,

Mã số sinh viên: DE130018

Theo quy định của trường Đại học FPT, sinh viên được dự thi cuối kỳ với điều kiện đã tham dự >= 80% thời lượng của một môn học.

Phòng CTSV thông báo, tính đến thời điểm này bạn đã vắng 13.33% thời lượng của môn học ${classCurrent.subject_id}

Vui lòng kiểm tra chi tiết tại http://fap.fpt.edu.vn

Sinh viên cần chú ý đi học đầy đủ và đúng giờ để được tham gia dự thi vào cuối kỳ.

Chúc bạn học tập hiệu quả.

Hãy phản hồi ngay khi nhận được email này!!!

Thân mến,

Phòng CTSV – FPTU Đà Nẵng`,
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
      await update(req, res,classCurrent.subject_id,classNow.class_id);
    } else await create(req, res,classCurrent.subject_id,classNow.class_id);
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
  getForUser,
  getByClass
};
