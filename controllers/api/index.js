const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');

// Apply middleware to all routes in this router
router.use('/users', userRoutes);
router.use('/threads', threadRoutes);

module.exports = router;