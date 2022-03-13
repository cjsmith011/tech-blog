const router = require('express').Router();
const res = require('express/lib/response');
const { Creator, Blog, Comment } = require('../../models');

// GET /api/creators
router.get('/', (req, res) => {
    //access our Creator model and run a .findAll() method
    Creator.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbCreatorData => res.json(dbCreatorData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/creators/1
router.get('/:id', (req, res) => {
    Creator.findOne({
      attributes: { exclude: ['password'] },
      where: {
          id: req.params.id
      },
      include: [
        {
          model: Blog,
          attributes: ['id', 'title', 'content', 'creator_name']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'creator_name']
        },
     ],
        
    })
    .then(dbCreatorData => {
        if (!dbCreatorData) {
            res.status(404).json({ message: 'No creator has this id number'});
            return;
        }
        res.json(dbCreatorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/creators
router.post('/', (req, res) => {
   Creator.create({
    creator_name: req.body.creator_name,
    password: req.body.password
  })
  //connect to the sessions and cookies with this 
    .then(dbCreatorData => {
      req.session.save(() => {
        req.session.creator_id = dbCreatorData.id;
        req.session.creator_name = dbCreatorData.creator_name;
        req.session.loggedIn = true;
      
        res.json(dbCreatorData);
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//this looks for a creator when they post an updated password, it searches for their email to verify them
router.post('/login', (req, res) => {
  //expects email and password
  Creator.findOne({
    where: {
      creator_name: req.body.creator_name
    }

  }).then(dbCreatorData => {
    if (!dbCreatorData) {
      res.status(400).json({ message: 'No creator with that email address!' });
      return;
    }

    //verify creator
    const validPassword = dbCreatorData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, try again.' });
      return;
    }
    req.session.save(() => {
      req.session.creator_id = dbCreatorData.id;
      req.session.creator_name = dbCreatorData.creator_name;
      req.session.loggedIn = true;
      
      res.json({ creator: dbCreatorData, message: 'You are successfully logged in.' });
  });
});
});

// PUT /api/creators/1
router.put('/:id', (req, res) => {
        // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Creator.update(req.body, {
        //add this for the hooks in the Creator.js
        individualHooks: true,
         where: {
         id: req.params.id
        }
    })
    .then(dbCreatorData => {
        if (!dbCreatorData[0]) {
        res.status(404).json({ message: 'No creator found with this id' });
        return;
    }
        res.json(dbCreatorData);
        })
     .catch(err => {
        console.log(err);
        res.status(500).json(err);
         });
    });


//here is our logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;