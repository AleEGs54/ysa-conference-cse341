const router = require('express').Router();
const controller = require('../controllers/users');
const { validateUser } = require('../utilities/validateUser');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post('/', validateUser, controller.createUser);

router.put('/:id', validateUser, controller.updateUser);

router.delete('/:id', controller.deleteUser);

module.exports = router;
