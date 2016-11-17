const debug = require('debug')('ss/testmodule')
const Faker = require('faker')
const JSF = require('json-schema-faker')
let schema = require('./mock.json')

module.exports = {
    'products-get' : (req, res, next) => {
        // res.status(200).send('swagger successful')
        next()
    }
}
