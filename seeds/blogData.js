const { Blog } = require('../models');

const blogdata = [
  {
    id: 1,
    title: 'Coding is King!',
    content: 'There are more high paying jobs available for coders than any other role in 2022',
    creator_id: 3,
  },
  {
    id: 2,
    title: 'Web development classes',
    content: 'If you want to break into web development, virtual classes are available.',
    creator_id: 2,
  },
  {
    id: 3,
    title: 'Online or Inperson',
    content: "You may get more out of in-person classes, the convenience factor isn't enough to make online bettter",
    creator_id: 1,
  },
];

const seedBlogs = () => Blog.bulkCreate(blogdata);

module.exports = seedBlogs;
