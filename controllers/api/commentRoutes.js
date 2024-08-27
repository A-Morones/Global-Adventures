const express = require('express');
const router = express.Router();
const { Comment, User, Thread } = require('../../models/Index'); // Adjust path as needed
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/threads/:threadId/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            body: req.body.body,
            userId: req.session.user_id,
            threadId: req.params.threadId

        });
       const thread = await Thread.findByPk(req.params.threadId);
       if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        const updatedThread = await Thread.update(
            { commentCount: thread.commentCount + 1 },
            { where: { id: req.params.threadId } }
        );
        const user = await User.findByPk(req.session.user_id)        
        res.json(newComment);
        res.json(updatedThread);
        res.redirect(`/threads/${req.params.threadId}`);
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Unable to add comment' });
    }

});

// Update a comment
router.put('/comments/:commentId', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            { body: req.body.body },
            { where: { id: req.params.commentId, userId: req.session.user_id } }
        );
        if (!updatedComment[0]) {
            return res.status(404).json({ message: 'Comment not found or you are not authorized to update it' });
        }
        res.redirect(`/threads/${req.body.threadId}`);
        
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Unable to update comment' });
    }
});


module.exports = router;