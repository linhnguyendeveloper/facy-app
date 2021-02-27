const mongoose = require("mongoose");
const Serivce = require('./service');
const constants = require('../../utils/constants')
const { validateCreate, validateEdit } = require('../../models/schedules')

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

const createMany = (req, res) => {
    let data = req.body
    data = data.filter(item => !validateCreate(item))
    Serivce.createMany(data)
    .then((data) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        return res.status(constants.CODE.CREATE_OK).json({
            message: "create successful",

        });
    })
    .catch((err) => {
        return res.status(constants.CODE.BAD_REQUEST).json(err.message);
    })
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
    deleteMany

}