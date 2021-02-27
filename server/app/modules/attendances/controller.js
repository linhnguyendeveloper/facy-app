const mongoose = require("mongoose");
const Serivce = require('./service');
const constants = require('../../utils/constants')
const { validateCreate, validateEdit } = require('../../models/attendances')

const getMany = (req, res) => {
    Serivce.getMany()
        .then(data => {
            return res.status(200).json(data)
        }).catch(err => {
            return res.status(401).json(err)
        })
}

const getOne = (req, res) => {
    let id = req.params.id;
    Serivce.getOne(id)
        .then((data) => {
            return res.status(constants.CODE.GET_OK).json(data);
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })
}


const getCountOne = (req, res) => {
    const {class_id,subject_id} = req.params;
    Serivce.getCountOne(class_id)
        .then((data) => {
            let countData = 0;
            data.attendance.forEach(week => {
                if (week) week.data_in_week.forEach(date => {
                    console.log(1);
                    if (date) date.data_in_date.forEach(item => {
                        if (item.subject_id === subject_id){
                            countData++;
                            console.log(9);
                        }
                    })
                })
            })
            return res.status(constants.CODE.GET_OK).json({count:countData});
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })
}


const create = (req, res) => {
    let data = req.body

    const err = validateCreate(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.status(constants.CODE.BAD_REQUEST).json(errors);
    } else {
        Serivce.create(data)
            .then((data) => {
                return res.status(constants.CODE.CREATE_OK).json({
                    message: "create successful",

                });
            })
            .catch((err) => {
                return res.status(constants.CODE.BAD_REQUEST).json(err.message);
            })

    }
}

const update = (req, res) => {
    let id = req.params.id
    let data = req.body
    let err = validateEdit(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.status(constants.CODE.BAD_REQUEST).json(errors);
    }
    else {

        Serivce.update(id, data)
            .then((data) => {
                return res.status(constants.CODE.CREATE_OK).json({
                    message: "edit successful"
                });
            })
            .catch((err) => {
                return res.status(constants.CODE.BAD_REQUEST).json(err.message);
            })
    }
}

const deleteOne = (req, res) => {
    let id = req.params.id
    Serivce.deleteOne(id)
        .then(() => {
            return res.status(constants.CODE.DELETE_OK).json({
                message: "delete successful"
            });
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })
}

const deleteMany = (req, res) => {
    let ids = req.body.ids;
    Serivce.deleteMany(ids)
        .then(() => {
            return res.status(constants.CODE.DELETE_OK).json({
                message: "delete successful"
            });
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })

}





module.exports = {
    getMany,
    getOne,
    create,
    update,
    deleteOne,
    deleteMany,
    getCountOne

}