  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class user extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        user.hasMany(models.post, { foreignKey: 'sender' });
      user.hasMany(models.post, { foreignKey: 'receiver' });
        // define association here
      }
    }
    user.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      position: DataTypes.STRING,
      number: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'user',
    });
    return user;
  };