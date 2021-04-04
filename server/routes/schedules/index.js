const router = require('express').Router();
const { Controller } = require('../../app/modules/schedules');


router.get("/view", Controller.getMany)
router.get("/count/:class_id-:subject_id", Controller.getCountOne)
router.get("/view/:id", Controller.getOne)
router.post("/create", Controller.create)
router.put("/update/:id", Controller.update)
router.delete("/delete/:id", Controller.deleteOne)
router.delete("/deletes/", Controller.deleteMany)
router.put("/updateAttendances", Controller.updateAttendance)


module.exports = router;