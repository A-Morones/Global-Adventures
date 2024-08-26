const router = require('express').Router();
const { User } = require('../models/userIndex');
const withAuth = require('../utils/auth');

//view home page
router.get('/', async (req, res) => {
    res.render('home');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('home');
    }
    // res.render('home');

});

// dashboard page

router.get('/dashboard', withAuth, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render('dashboard', { user });
});

// profile page

router.get('/profile', withAuth, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render('profile', { user });
});



// sign up / login page
router.get('/login', (req, res) => {
    res.render('login');
    if (req.session.user_id) {
        res.redirect('/dashboard');
    }
    else {
        res.render('login');
    }
    // res.render('login');


});




// forums page
router.get('/forums', async (req, res) => {
    res.render('forums');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('forums');
    }
});

// pinned threads page
router.get('/pinned-threads', async (req, res) => {
    res.render('pinnedThreads');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('pinnedThreads');
    }
});

// user profile page
router.get('/profile/:id', async (req, res) => {
    res.render('profile');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('profile');
    }

});

// top threads page

router.get('/top-threads', async (req, res) => {
    res.render('topThreads');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('topThreads');
    }
});

// search bar
router.get('/search', async (req, res) => {
    res.render('search');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('search');
    }
});

// blog posts
router.get('/blog', async (req, res) => {
    res.render('blog');
    if (req.session.user_id) {
        const user = await User.findByPk(req.session.user_id);
        res.render('dashboard', { user });
    }
    else {
        res.render('blog');
    }
});

module.exports = router;