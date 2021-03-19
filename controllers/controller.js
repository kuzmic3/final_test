const Postcode = require('../models/Postcode');
const BusStop = require('../models/BusStop');
const findLocations = require('../location-helper/index');

exports.getLocations = async (req, res, next) => {
    const postcodeId = req.params.postcode;

    try {
        const postcode = await Postcode.findByPk(postcodeId);

        const postcodeLocation = {
            lat: `${postcode.latitude}`,
            lng: `${postcode.longitude}`
        }

        const busStops = await BusStop.findAll({
            attributes: ['lat', ['lon', 'lng'], 'name']
        });

        const closest = findLocations(postcodeLocation, busStops);

        res.status(200).json({
            closest: closest
        });
    } catch (error) {
        console.log(error);
        next(new Error('Failed to load locations.'));
    }
};
