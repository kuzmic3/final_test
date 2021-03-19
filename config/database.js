const sequelize = require('sequelize');

module.exports = new sequelize('final_test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});
