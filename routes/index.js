const router = require('express').Router();

router.use('/participants', require('./participants'));
router.use('/users', require('./users'));
router.use('/api-docs', require('./swagger'));

module.exports = router;
