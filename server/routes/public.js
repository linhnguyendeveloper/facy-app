const router = require('express').Router();
const { Controller } = require("../app/modules/users");
const  ControllerAttendances  = require("../app/modules/attendances/controller");

router.use('/auth', require('./auth'));
router.post("/users/create", Controller.create)
router.post('/attendances/create',ControllerAttendances.checkUpdate)

module.exports = router;
