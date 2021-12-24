const request = require('request')

const geocode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2V2YWx0aGFrYXJhciIsImEiOiJja3hpaDByemowNGVkMnZ1bGc2YTdjY2JmIn0.qcJurKCIdvsX5GHQWI7FSA&limit=1'

    request({ url: geoURL, json: true }, (error, response) => {
        if (error) {
            callback('UNable to connect', undefined)
        } else if (response.body.features.length === 0) {
            callback('UNable to find', undefined)
        } else {
            const longitude = response.body.features[0].center[0]
                //         const latitude = response.body.features[0].center[1]
                //         console.log('longitude = ' + longitude + ' latitude = ' + latitude)
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })

        }
    })
}

module.exports = geocode