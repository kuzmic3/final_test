const Postcode = require('../models/Postcode');
const db = require('../config/database');

exports.getLocations = async (req, res, next) => {
    const postcodeId = req.params.postcode;
    const filter = req.params.filter;

    try {
        const response = [];
        if (typeof filter !== 'undefined') {
            if (filter === 'buses') {
                response['bus'] = this.getBuses(postcodeId);
            } else if (filter === 'school') {
                response['schools'] = this.getSchools(postcodeId);
            } else if (filter === 'address') {
                response['addresses'] = this.getAddresses(postcodeId);
            } else {
                next(new Error('Invalid filter.'));
            }
        } else {
            response['buses'] = this.getBuses(postcodeId);
            response['schools'] = this.getSchools(postcodeId);
            response['addresses'] = this.getAddresses(postcodeId);
        }

        res.status(200).json({
            response: response
        });
    } catch (error) {
        next(new Error('Failed to load locations.'));
    }
};

exports.getBuses = async (postcodeId) => {
    const postcode = await Postcode.findByPk(postcodeId);

    return db.query(`
        SELECT
        (3959 * acos (
            cos(radians(${postcode.latitude}))
            * cos(radians(lat))
            * cos(radians(lon) 
            - radians(${postcode.longitude}))
            + sin(radians(${postcode.latitude}))
            * sin(radians(lat))
        )) AS distance FROM busstops ORDER BY distance LIMIT 5`);
}

exports.getSchools = async (postcodeId) => {
    const postcode = await Postcode.findByPk(postcodeId);

    return db.query(`
        SELECT name,
        (3959 * acos (
            cos(radians(${postcode.latitude}))
            * cos(radians(postcodes.latitude))
            * cos(radians(postcodes.longitude) 
            - radians(${postcode.longitude}))
            + sin(radians(${postcode.latitude}))
            * sin(radians(postcodes.latitude))
        )) AS distance 
        FROM schools INNER JOIN postcodes ON schools.postcode_id = postcodes.id 
        HAVING distance <= 10`);
}

exports.getAddresses = async (postcodeId) => {
    return db.query(`SELECT * FROM addresses WHERE postcode_id = ${postcodeId}`);
}
