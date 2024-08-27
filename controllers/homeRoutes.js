const express = require('express');
const router = express.Router();
const { Thread, User } = require('../models/userIndex'); // Adjust the path to your models
const withAuth = require('../utils/auth');

// Render the homepage with a list of threads
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });

        const threadData = threads.map(thread => ({
            id: thread.id,
            title: thread.title,
            preview: thread.body.substring(0, 100), // Adjust preview logic as needed
            createdAt: thread.createdAt.toLocaleDateString(),
            user: thread.User
        }));

        res.render('homepage', {
            title: 'Forum Home',
            user: req.session.user_id ? req.session.user : null,
            threads: threadData
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Unable to load threads' });
    }

    router.get('/create', withAuth, (req, res) => {
        res.render('createThread', { title: 'Create New Thread', user: req.session.user });
        
    });
});

module.exports = router;
