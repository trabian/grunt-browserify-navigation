# grunt-browserify-navigation

> Save browserify paths in Redis for quick lookup by [SublimeText BrowserifyNavigation plugin](https://github.com/trabian/BrowserifyNavigation).

During development the ability to quickly jump to the file referenced in a `require` statement can significantly speed up development. This plugin listens for `browserify.dep` events triggered by browserify and passed to grunt via the [trabian fork of grunt-browserify](https://github.com/trabian/grunt-browserify). This event passes a depencency object as the first argument to the callback which is then saved as a Hash key in redis.

For example, given the following module structure:

```javascript

  // /home/me/dev/myproject/app/index.js
  module.exports = {
    a: require('./a'),
    b: require('./b')
  };

  // /home/me/dev/myproject/app/a.js
  module.exports = {
    c: require('./c')
  };

  // /home/me/dev/myproject/app/b.js
  module.exports = "Hi, I'm b.";

  // /home/me/dev/myproject/app/c.js
  module.exports = "Hi, I'm c.";

```

If the browserify_navigation grunt task is run before the grunt-browserify task, the following keys will be stored in Redis (via [HSET](http://redis.io/commands/hset)):

| key                                              | field   | value                           |
| ------------------------------------------------ | ------- | ------------------------------- |
| browserify:/home/me/dev/myproject/app/index.js   | ./a     | /home/me/dev/myproject/app/a.js |
| browserify:/home/me/dev/myproject/app/index.js   | ./b     | /home/me/dev/myproject/app/b.js |
| browserify:/home/me/dev/myproject/app/a.js       | ./c     | /home/me/dev/myproject/app/c.js |

The BrowserifyNavigation plugin will then be able to do an [HGET](http://redis.io/commands/hget) to determine the path of a module relative to the current file:

```python

  current_file = ... # Path to currently active file in Sublime Text
  module_name = ... # Contents of a 'require' statement on the current line (via Regex)

  key = ":".join(["browserify", current_file])

  path = redisClient.hget(key, module_name)

  # Open file at path in new window.

```

## Getting Started
This plugin requires Grunt and access to a Redis server, either locally or remotely.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-browserify-navigation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-browserify-navigation');
```

To install and run Redis locally, either download it from [http://redis.io/download](http://redis.io/download) or run `brew install redis` if you are using [Homebrew](http://brew.sh/) on OS X (and really, why wouldn't you?).

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
