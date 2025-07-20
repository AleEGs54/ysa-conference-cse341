const router = require('express').Router();
const controller = require('../controllers/participants');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post('/', controller.createParticipant);

module.exports = router;
