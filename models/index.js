const Creator = require('./Creator');
const Blog = require('./Blog');
const Comment = require('./Comment');


Creator.hasMany(Blog, {
    foreignKey: 'creator_id'
});

Creator.hasMany(Comment, {
    foreignKey: 'creator_id'
});

Blog.belongsTo(Creator, {
    foreignKey: 'creator_id',
});

  
Comment.belongsTo(Creator, {
    foreignKey: 'creator_id'
  });
  
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});
  
Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});

module.exports = { Creator, Blog, Comment };
