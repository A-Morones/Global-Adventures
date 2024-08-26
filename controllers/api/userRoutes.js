const router = require('express').Router();
const { User } = require('../../models/User');

// view home page

router.get('/', async (req, res) => {
    try {
        const threads = await Thread.findAll({
            order: [['createdAt', 'DESC']] // Order by createdAt in descending order
        });
        res.render('homepage', { threads });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// search for threads
 router.get('/search', async (req, res) => {
  const { term } = req.query;

  try {
    const users = await User.findAll({
      where: {
        username: { [Op.like]: `%${term}%` },
      },
    });

    res.render('users/index', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// view user profile page
 router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send('User not found');

    res.render('users/profile', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// manage user profile settings
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('User not found');
        res.render('users/edit', { user });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});


// update user profile settings
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, bio } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('User not found');
        await user.update({ username, email, bio });

        res.redirect(`/users/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    
    }
});


// view user's posted threads
router.get('/:id/threads', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('User not found');

        const threads = await user.getThreads();
        res.render('users/threads', { user, threads });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }


});





// post thread reply
router.post('/:id/threads', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('User not found');
        const thread = await user.createThread({ content });
        res.redirect(`/threads/${thread.id}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});



// edit thread reply
router.get('/:id/threads/:threadId/edit', async (req, res) =>{
    const { id, threadId } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('User not found');
        const thread = await user.getThreads({ where: { id: threadId } });
        if (!thread) return res.status(404).send('Thread not found');
        res.render('threads/edit', { user, thread: thread[0] });
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});




// delete thread reply
router.delete('/:id/threads/:threadId', async (req, res) => {
    const { id, threadId } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).send('User not found');
        const thread = await user.getThreads({ where: { id: threadId } });
        if (!thread) return res.status(404).send('Thread not found');
        await thread[0].destroy();
        res.redirect(`/users/${id}/threads`);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;