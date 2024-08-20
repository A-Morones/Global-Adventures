const router = require('./router').Router;
const{ User } = require('../models');
const withAuth = require('../utils/auth');

// User registration route
router.get('/, withAuth', async (req, res) => {
    try{
        const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['username', 'ASC']]    
    });
    const users = userData.map((project) => project.get({ plain: true }));
    res.render('homepage',{
        user,
        logged_in: req.session.logged_in,
    });
    } catch (err){
        res.status(500).json(err);
    }
    });

    router.get('/login', (req, res) => {
        if(req.session.logged_in){
            res.redirect('/');
            return;
        }
        res.render('login');

    });
    
    