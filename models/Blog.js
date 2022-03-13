const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./Creator');

class Blog extends Model {}

Blog.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    creator_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'creator',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
    }
);
module.exports = Blog;