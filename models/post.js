'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      post.belongsTo(models.user, { foreignKey: 'sender' });
      post.belongsTo(models.user, { foreignKey: 'receiver' });
      // define association here
    }
  }
  post.init({
    discreption: DataTypes.STRING,
    image: DataTypes.STRING,
    receiver: DataTypes.INTEGER,
    sender: DataTypes.INTEGER,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};