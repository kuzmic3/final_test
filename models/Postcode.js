const sequelize = require('sequelize');
const db = require('../config/database');

const Postcode = db.define('postcodes', {
    postcode: {
        type: sequelize.STRING
    },
    latitude: {
        type: sequelize.FLOAT
    },
    longitude: {
        type: sequelize.FLOAT
    }
},
    {
        timestamps: false,
    })

module.exports = Postcode;
