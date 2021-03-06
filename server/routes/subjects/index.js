const router = require('express').Router();
const { Controller } = require('../../app/modules/subjects');


router.get("/view", Controller.getMany)
router.get("/view/:id", Controller.getOne)
router.post("/create", Controller.create)
router.put("/update/:id", Controller.update)
router.delete("/delete/:id", Controller.deleteOne)
router.delete("/deletes/", Controller.deleteMany)
router.get("/getCurrent/", Controller.getCurrent)


module.exports = router;