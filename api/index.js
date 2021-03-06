// https://transport.opendata.ch/docs.html

/**
 * Example:
 * exports.searchLocations('Winterthur')
 *     .then(locations => console.log(locations))
 *     .catch(e => console.error(e))
 */
exports.findLocation = query => {
    return get('locations', {'query': query})
};

/**
 * Example (location from searchLocations):
 * exports.getStationboard(location.id)
 *     .then(stationboard => console.log(stationboard))
 *     .catch(e => console.error(e))
 */
exports.getStationboard = locationId => {
    return get('stationboard', {id: locationId})
};

const axios = require('axios');
function get(resource, parameters) {
    uri = `https://transport.opendata.ch/v1/${resource}`;
    return axios.get(uri, {params: parameters}).then((response) => {
        return response.data;
    });
}

/*const request = require('request')

 function get(resource, parameters) {
 return new Promise((resolve, reject) => {
 const options = {
 uri: `https://transport.opendata.ch/v1/${resource}`,
 qs: parameters
 }
 request(options, (error, response, body) => {
 if (!error && response.statusCode == 200) {
 console.log(body)
 resolve(JSON.parse(body))
 } else {
 reject(error || body)
 }
 })
 })
 }*/
