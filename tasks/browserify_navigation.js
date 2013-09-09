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

    opts.clientOptions = opts.clientOptions || {};

    opts.clientOptions.max_attempts = opts.max_attempts || 1;

    var redis = require('redis');

    var client = redis.createClient(opts.port, opts.host, opts.clientOptions);

    client.on("error", function (e) {
      grunt.log.warn('Dependencies will not be saved to Redis do to a connection error', e);
    });

    client.on("ready", function(e) {

      var namespace = opts.namespace || 'browserify';

      grunt.log.ok('Redis client started using server at', [client.host, client.port].join(':'));

      grunt.event.removeAllListeners('browserify.dep');

      grunt.event.on('browserify.dep', function (dep) {

        var id, pathName;

        for (id in dep.deps) {
          pathName = dep.deps[id];
          client.hset(namespace + ":" + dep.id, id, pathName);
        }

      });

      process.on('exit', function () {
        client.quit();
        grunt.log.ok('Redis client closed');
      });

      process.on('SIGINT', function () {
        process.exit();
      });

    });

  });

};
