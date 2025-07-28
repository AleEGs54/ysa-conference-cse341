const router = require('express').Router();
const controller = require('../controllers/participants');
const { validateParticipant } = require('../utilities/validateParticipant');
const { isAuthenticated } = require('../auth/authenticate');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post(
    '/',
    isAuthenticated,
    validateParticipant,
    controller.createParticipant,
);

router.put(
    '/:id',
    isAuthenticated,
    validateParticipant,
    controller.updateParticipant,
);

router.delete('/:id', isAuthenticated, controller.deleteParticipant);

module.exports = router;
