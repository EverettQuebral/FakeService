'use strict';

module.exports = function mochacli(grunt){
    grunt.loadNpmTasks('grunt-mocha-cli');

    var targetModule = grunt.option('target') || '**';
    console.log('Target Module : ', targetModule);

    return {
        src: [
            'test/**/*.js',
            'test/**/*.coffee',
            'modules/' + targetModule + '/*.js',
            'modules/' + targetModule + '/*.coffee'
        ],
        options: {
            timeout : 60000,
            'check-leaks' : true,
            ui : 'bdd',
            reported : 'spec',
            require : ['coffee-script/register']
        }
    }

}