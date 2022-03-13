const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

class Creator extends Model {
  //setup method to run on data to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// define table columns and configuration
Creator.init(
  {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      creator_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [4]
        }
      }
    },
    { 
      //add to the second object in the function, this controls when the hashing starts
      //this is the beforeCreate hook
      hooks: {
       async beforeCreate(newCreatorData) {
         newCreatorData.password = await bcrypt.hash(newCreatorData.password, 10);
            return newCreatorData
          },
          //if a creator updates their password, we still need to encrypt
          //this is the beforeUpdate hook
          async beforeUpdate(updatedCreatorData) {
            updatedCreatorData.password = await bcrypt.hash(updatedCreatorData.password, 10);
            return updatedCreatorData;
          }
        },
    
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'creator'
    }
  );

module.exports = Creator;