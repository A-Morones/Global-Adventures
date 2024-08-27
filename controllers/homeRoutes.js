const express = require('express');
const router = express.Router();
const { Thread, User, Comment } = require('../models/Index'); // Adjust the path to your models

const withAuth = require('../utils/auth'); // middleware to check if user is logged in

// Render form to create a new thread (only for logged-in users)

router.get('/new', withAuth, (req, res) => {
    res.render('newThread', {
        title: 'Create New Thread',
        user: req.session.user_id? req.session.user : null
    });
});
// Render the homepage with a list of threads
router.get('/', async (req, res) => {
    try{
        const threads = await Thread.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        res.render('homepage', {
            title: 'Global Adventures',
            user: req.session.user_id? req.session.user : null,
            threads
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('homepage', { message: 'Unable to load threads' });
    }
});

// render the thread page with details and comments
router.get('/threads', async (req, res) => {
    try {
        const thread = await Thread.findByPk(req.query.id, {
            include: [{ model: User, attributes: ['username'] }]
        });
        const comments = await Comment.findAll({
            where: { thread_id: req.query.id },
            include: [{ model: User, attributes: ['username'] }]
        });
        res.render('threadDetail', {
            title: thread.title,
            thread,
            comments
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).render('threadDetail', { message: 'Unable to load thread' });
    }
});

router.get('/login', (req, res) => {
    if (req.session.user_id) {
        res.redirect('homepage');
        return;
    } 
    res.render('login')

});

// Render form to register a new user

router.get('/register', (req, res) => {
    if (req.session.user_id) {
        res.redirect('homepage');
        return;
    } 
    res.render('register')
});


    

module.exports = router;
