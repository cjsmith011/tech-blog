const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id', 
      'comment_text', 
      'creator_id', 
      'blog_id',
      'created_at'
      ],
      })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        creator_id: req.body.creator_id,
        blog_id: req.body.blog_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
});


module.exports = router;