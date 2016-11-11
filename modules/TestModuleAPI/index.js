const debug = require('debug')('ss/testmodule')
const Faker = require('faker')
const JSF = require('json-schema-faker')
let schema = require('./mock.json')

module.exports = {
    'locales' : (req, res, next) => {
        res
            .status(200)
            .send(JSF(schema))
        // res
        //     .status(200)
        //     .send({
        //         locale: Faker.company.companyName(),
        //         address : {
        //             address1 : Faker.address.streetAddress() + ' ' + Faker.address.streetName(),
        //             address2 : Faker.address.secondaryAddress(),
        //             city : Faker.address.city(),
        //             zip : Faker.address.zipCode(),
        //             state : Faker.address.state(),
        //             country : Faker.address.country()
        //         },

        //     })
    },
    'payment.get' : (req, res, next) => {
        debug('test hit')
        res.status(200).send('good job');
    },

    'payment.create' : (req, res, next) => {
        debug('test hit')
        res.status(200).send('good job');
    },

    test : (req, res, next) => {
        debug('hit test')
        res.status(200).send('good again ghere')
    }
}
