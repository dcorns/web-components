/**
 * Gruntfile.js
 * Created by dcorns on 6/12/15.
 */
'use strict';
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({

    browserify: {
       'bundle.js': ['app.js']
    }

  });

  grunt.registerTask('default', ['browserify']);

};
