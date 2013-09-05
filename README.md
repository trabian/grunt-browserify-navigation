# grunt-browserify-navigation

> Save browserify paths in Redis for quick lookup

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-browserify-navigation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browserify-navigation');
```

## The "browserify_navigation" task

### Overview
In your project's Gruntfile, add a section named `browserify_navigation` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  browserify_navigation: {
    options: {
      // Task-specific options go here.
    }
  },
})
```

### Options

#### options.namespace
Type: `String`
Default value: `'browserify'`

The namespace to use when creating Redis keys.

#### options.port
Type: `String`
Default value: `'6379'`

The port of the Redis server to connect to.

#### options.host
Type: `String`
Default value: `'127.0.0.1'`

The host of the Redis server to connect to.

#### options.clientOptions
Type: `Object`
Default value: `undefined`

Additional options to pass to the redis.createClient method. See the [node_redis](https://github.com/mranney/node_redis#rediscreateclientport-host-options) documentation for more details.

### Usage Examples

#### Default Options
In this example, the default options are used to do connect to a redis client on the same computer as the grunt project.

```js
grunt.initConfig({
  browserify_navigation: {}
})
```

#### Custom namespace, port, host, and clientOptions
In this example, custom options are used to do connect to a remote redis client with custom clientOptions.

```js
grunt.initConfig({
  browserify_navigation: {
    options: {
      namespace: 'my-browserify',
      port: 6380,
      host: '10.0.0.1',
      clientOptions: {
        auth_pass: 'secret'
      }
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Matt Dean. Licensed under the MIT license.
