const request = require('request')
const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8243aed7972765d7900c15e25d41db04&query=' + longitude + ',' + latitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.error) {
            callback('Unable to find the weather', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                percepetation: response.body.current.precip
            })
        }
    })
}

module.exports = forecast