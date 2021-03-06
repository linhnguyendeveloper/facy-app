const router = require('express').Router();
const { Controller } = require('../../app/modules/class');


router.get("/view", Controller.getMany)
router.get("/view/:id", Controller.getOne)
router.get("/getCountStudent", Controller.getCountStudent)
router.post("/create", Controller.create)
router.put("/update/:id", Controller.update)
router.delete("/delete/:id", Controller.deleteOne)
router.delete("/deletes/", Controller.deleteMany)


module.exports = router;