const router = require('express').Router();
const controller = require('../controllers/users');
const { validateUser } = require('../utilities/validateUser');
const { isAuthenticated } = require('../auth/authenticate');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.post('/', isAuthenticated, validateUser, controller.createUser);

router.put('/:id', isAuthenticated, validateUser, controller.updateUser);

router.delete('/:id', isAuthenticated, controller.deleteUser);

module.exports = router;
