'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      receiver: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of the Target model
          key: 'id', // key in the Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      sender: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of the Target model
          key: 'id', // key in the Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      image: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};