const { User } = require('../../models/attendances');
const UserSerivce = require('./users.service');
const constants = require('../../utils/constants')
const { validateCreateUser, validateEditUser } = require('../../models/attendances')
const {firebaseConfig} = require('../../utils/firebase') 
var firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const getMany = (req, res) => {
    var updates = {};
    console.log(req.query,'??');
    // updates['attendances/' + 'key-của-record-1'] = 'new value'; 
   firebase.database().ref('/attendances/'+req.query.id).once('value').then((snapshot) => {
    console.log(snapshot.val(),'cac');
    // ...
  });
    // .set({message: 'GET Request 222'});
    
    // UserSerivce.getMany()
    //     .then(data => {
    //         // res.status(200).json(data)
    //     }).catch(err => {
    //         // res.status(401).json(err)
    //     })
}

const getOne = (req, res) => {
    let id = req.params.id;
    UserSerivce.getOne(id)
        .then((data) => {
            return res.status(constants.CODE.GET_OK).json(data);
        })
        .catch((err) => {
            return res.status(constants.CODE.BAD_REQUEST).json(err.message);
        })
}


const create = (req, res) => {
    let data = req.body
    const err = validateCreateUser(data)
    if (err && err.error) {
        let errors = err.error && err.error.details.reduce((result, item) => {
            return {
                ...result,
                [item.path[0]]: item.message
            }
        }, {})
        return res.status(constants.CODE.BAD_REQUEST).json(errors);
    } else {
        UserSerivce.create(data)
            .then((data) => {
                return res.status(constants.CODE.CREATE_OK).json({
                    message: "create successful"
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
    let err = validateEditUser(data)
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
        if (req.files && req.files.img) {
            data.img = req.files.img[0]
        } else delete data.img
        UserSerivce.update(id, data)
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
    UserSerivce.deleteOne(id)
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
    UserSerivce.deleteMany(ids)
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