const sequelize = require('sequelize');
const db = require('../config/database');

const Postcode = db.define('busstops', {
    name: {
        type: sequelize.STRING
    },
    lat: {
        type: sequelize.DECIMAL
    },
    lon: {
        type: sequelize.DECIMAL
    }
},
    {
        timestamps: false,
    })

module.exports = Postcode;
