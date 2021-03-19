const GeoPoint = require('geopoint');

module.exports = (latLng, locations) => {
    const point1 = new GeoPoint(latLng.lat, latLng.lng);
    const point2 = new GeoPoint(locations[0].lat, locations[0].lng);

    const closest = locations[0];
    const closestDistance = point1.distanceTo(point2, true);

    console.log(closestDistance)

    return {
        location: closest,
        distance: closestDistance
    };
};
