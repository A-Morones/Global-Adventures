const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoute = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoute);

module.exports = router;