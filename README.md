# Fake Service

Development tool to expose RESTful API endpoint using swagger or the Google API spec

<img src="https://travis-ci.org/EverettQuebral/FakeService.png" />
https://travis-ci.org/EverettQuebral/FakeService


## Description

Fake Service is a very good platform in playing around and designing API's using Swagger or Google API json.  It provides a very simple way of testing API endpoints and can provide a mocked result based from the schema.


## Installation

        npm install fake-service

## Use

        const express = require('express')
        const app = express()
        const router = express.Router()
        const path = require('path')


        const FakeService = require('fake-service')(app, path.resolve(__dirname, './mod'))

        // see modules for information 
