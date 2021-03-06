const express = require('express')
const router = express.Router()
const debug = require('debug')('fake-service/index')
const app = express()
const ModuleManager = require('./core/ModuleManager')

let port = process.env.PORT || 8080
let path = require('path')

app.set('port', port)

let mm = new ModuleManager()
mm.mount(app, './modules')


debug(JSON.stringify(app._router.stack,null, 4))

app.use((err, req, res, next) => {
    res.send(500).send('ERROR encountered')
})

app.get('/', (req, res, next) => {
    console.log('got hit')
    res.send('thanks')
});

app.listen(port, (err) => {
    debug('[%s] Listening on http://localhost:%d', app.settings.env, port)
})
