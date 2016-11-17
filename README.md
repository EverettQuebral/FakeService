# Fake Service

Development tool to expose RESTful API endpoint using swagger or the Google API spec

<img src="https://travis-ci.org/EverettQuebral/FakeService.png" />
https://travis-ci.org/EverettQuebral/FakeService

## Installation

        npm install fake-service


## Use

        const express = require('express')
        const app = express()
        const router = express.Router()
        const path = require('path')


        const FakeService = require('fake-service')(app, path.resolve(__dirname, './mod'))

        console.log('testing')