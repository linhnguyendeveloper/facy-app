const router = require('express').Router();
const { Controller } = require('../../app/modules/attendances');


router.get("/view", Controller.getMany)
router.get("/getCountCurrent", Controller.getCountCurrent)
router.get("/view/:id", Controller.getOne)
router.post("/create", Controller.checkUpdate)
router.put("/update/:id", Controller.update)
router.delete("/delete/:id", Controller.deleteOne)
router.delete("/deletes/", Controller.deleteMany)
router.get("/getUserAttendances", Controller.getForUser)



module.exports = router;