'use strict';

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
      shell: {
        runTests: {
            command: function(browser) {
              return 'DEVICE='+browser+' ./node_modules/.bin/parallel-mocha tests/*-specs.js'
            }
        }
      },

      parallel: {
        assets: {
            options: {
                grunt: true
            },
            tasks: ['run_s4']
        }
      }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-shell');

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_s4', ['shell:runTests:s4']);
};