const router = require('express').Router();
const controller = require('../controllers/participants');
const {validateParticipant} = require('../utilities/validateParticipant')

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post('/', validateParticipant, controller.createParticipant);

router.put('/:id', validateParticipant, controller.updateParticipant);

router.delete('/:id', controller.deleteParticipant);

module.exports = router;
