const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, Creator, Comment } = require('../models');

router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
          'id',
          'title',
          'content',
          'creator_id',
          'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'creator_id', 'created_at'],
            include: {
              model: Creator,
              attributes: ['creator_name']
            }
          },
          // {
          //   model: Creator,
          //   attributes: ['creator_id']
          // }
        ]
      })
        .then(dbBlogData => {
          // pass a single post object into the homepage template
          const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
            res.render('homepage', { blogs });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//     res.render('login');
//     });

router.get('/blog/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
     attributes: [
      'id',
      'title',
      'content',
      'creator_id',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'creator_id', 'created_at'],
        include: {
          model: Creator,
          attributes: ['creator_name']
        }
      },
        ]
      })
      .then(dbBlogData => {
        if (!dbBlogData) {
          res.status(404).json({ message: 'No blog found with this id' });
         return;
        }
    
          // serialize the data
        const blog = dbBlogData.get({ plain: true });
    
        // pass data to template
        res.render('single-blog', { blog });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;