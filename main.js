const ModuleManager = require('./lib/ModuleManager')
let mm = new ModuleManager()

module.exports = function(app, moduleDirectory){
    mm.mount(app, moduleDirectory)
}