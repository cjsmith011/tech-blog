const router = require('express').Router();
const { Blog, Creator } = require('../../models');
const sequelize = require('../../config/connection')


// get all users
router.get('/', (req, res) => {
    Blog.findAll({
      
      // Query configuration
      attributes: [
        'id', 
        'title', 
        'content', 
        'creator_id',
        'created_at',
      ],
      //this determines the sort/order in which posts will appear
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
          //     model: Creator,
          //     attributes: ['creator_id']
          // }
      ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

  router.get('/:id', (req, res) => {
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
          attributes: ['creator_id']
        }
      },
        // {
        //   model: Creator,
        //   attributes: ['creator_id']
        // }
      ]
    })
      .then(dbBlogData => {
        if (!dbBlogData) {
          res.status(404).json({ message: 'No blog found with this id' });
          return;
        }
        res.json(dbBlogData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  router.post('/', (req, res) => {
   
    Blog.create({
      title: req.body.title,
      content: req.body.content,
      creator_id: req.body.creator_id
    })
      .then(dbBlogData => res.json(dbBlogData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //this will accept the votes from users
//   router.put('/upvote', (req, res) => {
//     //use the custom static method in models/Post.js
//     Post.upvote(req.body, { Vote })
//     .then(updatedPostData => res.json(updatedPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
//   });

//   router.put('/:id', (req, res) => {
//     Post.update({
//         title: req.body.title
//       },
//       {
//         where: {
//           id: req.params.id
//         }
//       }
//     )
//       .then(dbPostData => {
//         if (!dbPostData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

  
  module.exports = router;
