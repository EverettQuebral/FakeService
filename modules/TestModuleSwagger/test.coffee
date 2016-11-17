should = require('should')
assert = require('assert')
request = require('supertest')
express = require('express')
debug = require('debug')('fake-service/test')
app = express()
YAML = require('yamljs')
api = YAML.load(__dirname + '/swagger.yaml')

ModuleManager = require('../../core/ModuleManager')
moduleManager = new ModuleManager()
app = moduleManager.mountSwagger(app, api, 'TestModuleSwagger', './modules')

baseUrl = '/TestModuleSwagger/v1'

describe 'Product Test', ->
    it 'products', (done) ->
        # console.log app._router.stack
        request(app)
                .get(baseUrl + '/products')
                .expect 200, (err, res) ->
            if err
                return done err
            debug res.body
            return done()
        return

    it 'products list', (done) ->
        request(app)
                .get(baseUrl + '/products')
                .expect 200, (err, res) ->
            if err 
                return done err
            debug res.body
            return done()
        return