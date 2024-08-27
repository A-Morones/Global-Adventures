const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const threadRoutes = require('./threadRoutes');
const commentRoutes = require('./commentRoutes');

// Apply middleware to all routes in this router
router.use('/users', userRoutes);
router.use('/threads', threadRoutes);
router.use('/comments', commentRoutes);

module.exports = router;