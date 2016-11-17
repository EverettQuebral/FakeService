should = require('should')
assert = require('assert')
request = require('supertest')
express = require('express')
app = express()
api = require('./api.json')

ModuleManager = require('../../core/ModuleManager')
moduleManager = new ModuleManager()
app = moduleManager.mountAPI(app, api, 'TestModuleAPI', './modules')

baseUrl = '/TestModuleAPI'

describe 'locales test', ->
    it 'locales get', (done) ->
        console.log baseUrl + '/locales'
        request(app)
                .get(baseUrl + '/locales')
                .expect 200, (err, res) ->
            if err
                return done err
            console.log res.body
            return done()
        return

