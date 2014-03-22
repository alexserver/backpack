module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // browserify: {
    //   dist: {
    //     files: {
    //       'examples/public/js/main.js': ['examples/main.js']
    //     }
    //   }
    // },
    forever: {
      server1: {
        options: {
          index: 'app.js',
          logDir: 'logs'
        }        
      }
    },
    watch: {
      web: {
        files: ['layouts/*.dot','app.js'],
        tasks: ['forever:server1:restart']
      },
    }
  });

  //grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-forever');

  // Default task(s).
  grunt.registerTask('start', ['forever:server1:start']);
  grunt.registerTask('restart', ['forever:server1:restart']);
  grunt.registerTask('stop', ['forever:server1:stop']);

};