module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clean
    clean: ['lr-styleguide/css/*.css', 'lr-styleguide/js/*.js'],

    // Builds Sass
    sass: {
      dist: {
        options: {
          style: 'expanded'
          /*includePaths: [
            'govuk_modules/govuk_frontend_toolkit/stylesheets'
          ],*/
        },
        files: [{
          expand: false,
          cwd: "lr-styleguide/sass",
          src: ["*.scss"],
          dest: "lr-styleguide/css/",
          ext: ".css"
        }]
      }
    },

  });

  [
    'grunt-contrib-clean',
    'grunt-contrib-concat',
    'grunt-contrib-sass',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask('default', [
    'clean',
    'sass'
  ]);

};
