const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname, '../public'))

// define path for express config
const publicdirec = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// setup handle bars and engine views
app.use(express.static(publicdirec))
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'keval Thakarar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'keval Thakarar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'keval Thakarar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'NO address provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { temperature, percepetation } = {}) => {
            if (error)
                return res.send({ error })

            res.send({
                temperature,
                percepetation,
                location,
                latitude,
                longitude
            })
        })

    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide the search key'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 pages for any page',
        name: 'keval thakarar',
        myerror: 'no link found'
    })
})

app.get('*', (req, res) => {
    console.log('only *')
    res.render('404', {
        title: '404 pages for any page',
        name: 'keval thakarar',
        myerror: 'no link found'
    })
})

app.listen(3000, () => {
    console.log('server start port - 3000')
})