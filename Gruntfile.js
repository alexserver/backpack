var forever = require('forever-monitor');
var path = require('path');
module.exports = function(grunt) {

  var serverAppConfig   = {
        file      : path.join(__dirname, 'app.js'),
        logFile   : path.join(__dirname, 'logs/out.log'),
        errFile   : path.join(__dirname, 'logs/err.log'),
      },
      filesToWatch      = [
        '*.js',
        'client/*.js',
      ],
      browserifyFiles   = {
        'public/js/build.js': ['client/main.js']
      };

  var child = new (forever.Monitor)(serverAppConfig.file, {
    silent: false,
    logFile: serverAppConfig.logFile,
    errFile: serverAppConfig.errFile,
    watch: true,
    watchDirectory: __dirname
  });

  var startServer = function() {
    child.start();
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: browserifyFiles
      }
    },
    watch: {
      web: {
        files: filesToWatch,
        tasks: ['browserify']
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('startServer', startServer);

  // Default task(s).
  grunt.registerTask('start', ['browserify', 'startServer', 'watch']);
  grunt.registerTask('stop', ['stopServer']);
};