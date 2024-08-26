const router = require('express').Router();
const { Thread} = require('../../models/thread');

// forums page

router.get('/', async (req, res) => {
  try {
    const threads = await Thread.findAll({
      include: [{ model: User, as: 'author' }],
      order: [['createdAt', 'DESC']],
    });
    res.render('threads/index', { threads });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// sort threads by popularity
router.get('/popular', async (req, res) => {
    try {
      const threads = await Thread.findAll({
        include: [{ model: User, as: 'author' }],
        order: [['views', 'DESC']],
      });
      res.render('threads/index', { threads });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});

// sort threads by recent activity

router.get('/recent', async (req, res) => {
    try {
      const threads = await Thread.findAll({
        include: [{ model: User, as: 'author' }],
        order: [['createdAt', 'DESC']],
      });
      res.render('threads/index', { threads });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});


// sort threads by category

router.get('/category/:category', async (req, res) => {
    try {
      const threads = await Thread.findAll({
        where: { category: req.params.category },
        include: [{ model: User, as: 'author' }],
        order: [['createdAt', 'DESC']],
      });
      res.render('threads/index', { threads });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});

// start a thread

router.get('/create', (req, res) => {
  res.render('threads/create');
});

// view a thread with its details and comments

router.get('/:id', async (req, res) => {
  try {
    const thread = await Thread.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author' },
        { model: Comment, as: 'comments', include: [{ model: User, as: 'author' }] },
      ],
    });
    thread.views++;
    await thread.save();
    res.render('threads/show', { thread });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


// click on a thread to view details and comments
router.get('/:id/edit', async (req, res) => {
    try {
      const thread = await Thread.findByPk(req.params.id);
      res.render('threads/edit', { thread });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});

module.exports = router;
