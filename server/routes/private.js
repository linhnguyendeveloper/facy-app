const router = require('express').Router();
const {confirmJWT} = require('../middleware')


router.use(confirmJWT);
router.use('/users', require('./users'));
router.use('/class', require('./class'));
router.use('/subjects', require('./subjects'));
router.use('/attendances', require('./attendances'));
router.use('/schedules', require('./schedules'));




router.use('*', (req, res) => {
  res.status(404).json({
    message: 'NOT FOUND'
  });
});

module.exports = router;
