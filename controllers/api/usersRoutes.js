const router = require('express').Router();
const { User } = require('../../models/Index');
const bcrypt = require('bcrypt');




// Route to render the registration page
router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('register', { title: 'Register' });
});
// Route to handle registration form submission
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Create new user
        const newUser = await User.create({ name, email, password });

        // Save session and redirect
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.redirect('/');  // Change to your actual homepage route
        });
    } catch (err) {
        res
        console.error(err);
        res.status(500).json({ error: 'An error occurred during registration' });
        res.render('login')

    }
});

// Route to render the login page

// Route to handle login form submission
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.redirect('/'); // Ensure this route matches your homepage
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'An error occurred during login' });
    }
});

router.post('/login', (req, res) => {
    res.json({ message: 'Logged out!' });
    req.session.destroy(() => {
        res.redirect('/login');
    });
    // res.json({ message: 'Logged out!' });
})

// Route to handle logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
