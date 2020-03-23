'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: true,
        unique: true
      },
      login: {
        type: Sequelize.STRING(70),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: Sequelize.BLOB({
          length: 'long'
        }),
        allowNull: true,
        defaultValue: null
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    }, {
      tableName: 'users'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
