const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swaggerDocument), (req, res) => {
    // #swagger.ignore = true
});

module.exports = router;
