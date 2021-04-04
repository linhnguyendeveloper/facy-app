const mongoose = require("mongoose");
const Service = require("./service");
const constants = require("../../utils/constants");
const { validateCreate, validateEdit } = require("../../models/schedules");

const getMany = (req, res) => {
  Service.getMany()
    .then((data) => {
      let arr2 = []
      data.filter(item => item).map(item => {
        return item.attendance.map(it => {
          arr2 = arr2.concat(it.data_in_week.map(day => {
            return { ...day, class: item.class_id }
          }))
        })
      })

      return res.status(200).json(arr2);
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};

const getOne = (req, res) => {
  let id = req.params.id;
  Service.getOne(id)
    .then((data) => {
      let arr2 = [];
      data.attendance.forEach((item) => {
        arr2 = arr2.concat(item.data_in_week);
      });
      return res.status(constants.CODE.GET_OK).json(arr2);
    })
    .catch((err) => {
      return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    });
};

const getCountOne = (req, res) => {
  const { class_id, subject_id } = req.params;
  Service.getCountOne(class_id)
    .then((data) => {
      let countData = 0;
      data.attendance.forEach((week) => {
        if (week)
          week.data_in_week.forEach((date) => {
            if (date)
              date.data_in_date.forEach((item) => {
                if (item.subject_id === subject_id) countData++;
              });
          });
      });
      return res.status(constants.CODE.GET_OK).json({ count: countData });
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
  console.log(data, "ga");
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


const updateAttendance = async (req, res) => {

  let { class_id, year, semester, attendance } = req.body;

  Service.getOneWhere({ class_id, year, semester })
    .then((data) => {
      // return res.status(200).json(data);
      let checkUpdate = false
      let first = true
      let arr2 = []
      let { slot, room, subject_id } = attendance
      let data_date = { slot, room, subject_id }
      let Calendar_exists = false
      // console.log(data.attendance[0])
      for (const key of data.attendance.keys()) {
        const item = data.attendance[key]
        for (const keyWeek of item.data_in_week.keys()) {
          const week = item.data_in_week[keyWeek]
          if (week.date == attendance.date_old)
            for (const keyDate of week.data_in_date.keys()) {
              const date = week.data_in_date[keyDate]
              if (date.slot == attendance.slot_old && date.subject_id == attendance.subject_id_old) {
                data.attendance[key].data_in_week[keyWeek].data_in_date.splice(keyDate, 1)
              }

            }
          if (week.date == attendance.date) {
            week.data_in_date.forEach(value => {
              if (value.slot == slot) {
                Calendar_exists = true
                console.log(111111);
              }
            })
            for (const keyDate of week.data_in_date.keys()) {
              const date = week.data_in_date[keyDate]
              if (!Calendar_exists && date.slot != attendance.slot) {
                checkUpdate = true
                data.attendance[key].data_in_week[keyWeek].data_in_date.push(data_date)
              }
            }
          }
        }
      }

      // if(!checkUpdate){
      //   data.attendance.push({
      //     week : attendance.week,
      //     date_in_week : 
      //   })
      // }

      console.log(data)

      if (Calendar_exists) return res.status(200).send("Calendar exists")
       Service.update(data._id, { attendance: data })
       return res.status(200).json(data)



    })
    .catch((err) => {
      return res.status(401).json(err);
    });
}


module.exports = {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  getCountOne,
  updateAttendance
};
