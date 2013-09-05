/*
 * grunt-browserify-navigation
 * https://github.com/trabian/grunt-browserify-navigation
 *
 * Copyright (c) 2013 Matt Dean
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('browserify_navigation', 'Save browserify paths in Redis for quick lookup', function() {

    var opts = this.options();

    var redis = require('redis');

    var client = redis.createClient(opts.port, opts.host, opts.clientOptions);

    grunt.log.ok('Redis client started using server at', [client.host, client.port].join(':'));

    grunt.event.removeAllListeners('browserify.dep');

    grunt.event.on('browserify.dep', function (dep) {
      var id, pathName, _ref, _results;
      _ref = dep.deps;
      _results = [];
      for (id in _ref) {
        pathName = _ref[id];
        _results.push((function(id, pathName) {
          if (pathName) {
            return client.hset("browserify:" + dep.id, id, pathName);
          }
        })(id, pathName));
      }
      return _results;
    });

    process.on('exit', function () {
      client.quit();
      grunt.log.ok('Redis client closed');
    });

    process.on('SIGINT', function () {
      process.exit();
    });

  });

};
