const express = require('express');
const router = express.Router();
const { Thread} = require('../../models/Index'); 
const withAuth = require('../../utils/auth');
// render the the thread creation form

router.get('/new', withAuth, (req, res) => {
    res.render('threadfroms', {
        title: 'Create New Thread',
        user: req.session.user
    });
});
// Handle creation of a new thread
router.post('/new/:id', withAuth, async (req, res) => {
    try {
        const newThread = await Thread.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.session.user_id 
        });

        res.redirect(`/threads/${newThread.id}`); // Redirect to the new thread page
    } catch (err) {
        console.error(err);
        res.status(500).render('threadDetail', { 
            title: 'Create New Thread', 
            message: 'Unable to create thread' 
        });
    }
});

module.exports = router;