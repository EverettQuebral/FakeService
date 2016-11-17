const debug = require('debug')('fake-service/modulemanager')
const express = require('express')
const BaseModule = require('./BaseModule')
const YAML = require('yamljs')
const fs = require('fs')
const path = require('path')


// const Error = require('./Error')

let baseModule = new BaseModule()

class ModuleManager {

    constructor(){
        debug('this is module manager')
    }

    mountAPI(app, api, module, moduleDirectory){
        let p = path.resolve(moduleDirectory, module, 'index.js')
        debug('path for module ' + p)
        let moduleHandler = require(p)
        Object.keys(api.resources).forEach((resource) => {
            debug('resource', resource) //payment
            let moduleRouter = express();
            Object.keys(api.resources[resource].methods).forEach((method) => {
                debug('method', method)
                let m = api.resources[resource].methods[method]
                let path = m.path.replace(/\{/g, ':').replace(/\}/g, '')
                debug('path ', path)
                if (moduleHandler) {
                    switch(m.httpMethod){
                        case 'GET' : 
                            moduleRouter.get('/' + path, moduleHandler[m.id] || baseModule.get)
                            break
                        case 'POST' : 
                            moduleRouter.post('/' + path, moduleHandler[m.id] || baseModule.post)
                            break
                        case 'PUT' :
                            moduleRouter.put('/' + path, moduleHandler[m.id] || baseMdule.put)
                            break
                        case 'DELETE' :
                            moduleRouter.delete('/' + path, moduleHandler[m.id] || baseModule.delete)
                            break;
                    }
                }
                else {
                    debug('no handler')
                    moduleRouter.all('/' + path, (req, res, next) => {
                        debug('you are hitting an endpoint without a handler, will use the BaseModule handlers')
                        res.status(500).send('ERROR - NO HANDLER')
                    })
                }
            })

            app.use((error, req, res, next) => {
                res.status(500).send('ERROR in MODULE ', module)
            })
            debug('servicepath mount ' , '/'+ module + api.servicePath, moduleRouter._router.stack)
            app.use('/' + module + api.servicePath, moduleRouter)
        })

        return app
    }

    mountSwagger(app, api, module, moduleDirectory){
        let p = path.resolve(moduleDirectory, module, 'index.js')
        let moduleHandler = require(p)
        let moduleRouter = express();
        // get all the paths
        Object.keys(api.paths).forEach((path) => {
            debug('SWAGGER path', path)
            // get all the methods
            Object.keys(api.paths[path]).forEach((method) => {
                debug(path, method)
                // apiPath = /product/:id?query1=value1&query2=value2
                let apiPath = this.constructSwaggerPathParameters(api.paths[path][method].parameters)
                // mountPath = /product/:id/:pathvariable
                let mountPath = path.replace(/\{/g, ':').replace(/\}/g, '')
                // handler for /product get will be product-get
                let requestHandler = moduleHandler[mountPath.split(':')[0].replace(/\//g, '') + '-' + method]
                debug('path to mount', mountPath, requestHandler)
                // the path can contain path variable which is needed to change from {pathVariable} to :pathVariable
                switch(method){
                    case 'get' :
                        moduleRouter.get(mountPath, requestHandler || baseModule.get)
                        break
                   case 'post' :
                        moduleRouter.post(mountPath, requestHandler || baseModule.post)
                        break
                    case 'put' :
                        moduleRouter.put(mountPath, requestHandler || baseModule.put)
                        break
                    case 'delete' :
                        moduleRouter.delete(mountPath, requestHandler || baseModule.delete)
                        break
                }
            })
        })
        debug(module + api.basePath + '/', moduleRouter._router.stack)
        app.use('/' + module + api.basePath + '/' , moduleRouter)

        return app
    }

    /**
     * return the parameters in url path
     */
    constructSwaggerPathParameters(parameters){
        if (!parameters) return ''
        let path = '';
        for (let parameter of parameters){
            if (parameter.in === 'query'){
                debug('Were not really doing anything here')
            }
        }
        return path;
    }

    /**
     * responsible for finding all the modules that are available
     */
    mount(app, moduleDirectory){
        debug ('mounting ', moduleDirectory)
        if (moduleDirectory){
            let modules = this.findModules(moduleDirectory)
            debug('module directory from user ', moduleDirectory, modules)
            debug('Current path ', moduleDirectory + '/' + module)
            modules.forEach((module) => {
                if (fs.existsSync(moduleDirectory + '/' + module + '/api.json')){
                    debug('Module ' + module + ' found api.json' )
                    let api = require(path.resolve(moduleDirectory, module, 'api.json'))
                    this.mountAPI(app, api, module, moduleDirectory)
                }
                else if (fs.existsSync( moduleDirectory + '/' + module + '/swagger.yaml')){
                    debug('Module found swagger ' + module)
                    let api = YAML.load(path.resolve(moduleDirectory, module, 'swagger.yaml'))
                    this.mountSwagger(app, api, module, moduleDirectory)
                }
                else {
                    debug('No API Spec for ', module)
                }
            })
        }
        else {
            // find all modules
            let modules = this.findModules('./modules')
            modules.forEach((module) => {
                // load the api.json or the swagger.yaml
                if (fs.existsSync(__dirname + '/../modules/' + module + '/api.json')){
                    let api = require('../modules/' + module + '/api.json')
                    this.mountAPI(app, api, module, __dirname + '/../modules')
                }
                else if (fs.existsSync(__dirname + '/../modules/' + module + '/swagger.yaml')) {
                    let api = YAML.load(__dirname + '/../modules/' + module + '/swagger.yaml')
                    this.mountSwagger(app, api, module, __dirname + '/../modules')
                }
                else {
                    debug('NO DEFINITION OF API for the module ' + module)
                }
            })
        }
    }

    /**
     * responsible for finding all the resource in the api.json
     * then call the method handler
     */
    getResource(){

    }

    /**
     * responsible for finding the handler for the resource for the method
     * resources.payments.method.create [POST] -> testModule['id']
     * where testModule['id'] : (req, res, next) => {}
     */
    getMethodHandler(resourceMethod){

    }

    /**
     * return an array of the modules
     */
    findModules(modulesPath){
        return fs.readdirSync(modulesPath).filter((file) => {
            debug('files ', file)
            return fs.statSync(path.join(modulesPath, file)).isDirectory()
        })
    }

    /**
     * for testing the modules
     */
    getApp(){
        return this.app
    }
}

module.exports = ModuleManager
