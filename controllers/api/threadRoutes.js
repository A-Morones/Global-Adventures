const express = require('express');
const router = express.Router();
const { Thread, User, Comment } = require('../models/userIndex'); // Adjust the path to your models
const withAuth = require('../utils/auth');

// Render form to create a new thread (only for logged-in users)
router.get('/new', withAuth, (req, res) => {
    res.render('newThread', {
        title: 'Create New Thread',
        user: req.session.user
    });
});

// Handle creation of a new thread
router.post('/new', withAuth, async (req, res) => {
    try {
        const newThread = await Thread.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.session.user_id
        });
        res.redirect(`/threads/${newThread.id}`);
    } catch (err) {
        console.error(err);
        res.status(500).render('newThread', { 
            title: 'Create New Thread', 
            message: 'Unable to create thread' 
        });
    }
});

// View a specific thread
router.get('/:id', async (req, res) => {
    try {
        const thread = await Thread.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [{ model: User, attributes: ['username'] }] }
            ]
        });

        if (!thread) {
            return res.status(404).render('error', { message: 'Thread not found' });
        }

        res.render('threadDetail', {
            title: thread.title,
            thread,
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Unable to load thread' });
    }
});

module.exports = router;