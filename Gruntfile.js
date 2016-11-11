module.exports = function(grunt){
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('test', ['mochacli']);   
}