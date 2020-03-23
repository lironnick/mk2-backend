const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const models = require('require-all')(__dirname + '/../models');

const connection = new Sequelize(dbConfig);

Object.values(models).forEach(model => {
    model.init(connection);  
});

Object.values(models).forEach(model => {
    model.associate(connection.models);
});

module.exports = connection;