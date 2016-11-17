const ModuleManager = require('./core/ModuleManager')
let mm = new ModuleManager()

module.exports = function(app, moduleDirectory){
    mm.mount(app, moduleDirectory)
}