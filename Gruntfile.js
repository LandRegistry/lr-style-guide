module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clean
    clean: ['lr-styleguide/css/*.css', 'lr-styleguide/js/styleguide.js'],

    // Builds Sass
    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: [
            'node_modules/govuk_frontend_toolkit/stylesheets'
          ],
          sourcemap: "none"
        },
        files: [{
          expand: true,
          cwd: "lr-styleguide/sass",
          src: ["*.scss"],
          dest: "lr-styleguide/css",
          ext: ".css"
        }]
      }
    },

    // Concatenate JS files
    concat: {
      dist: {
        src: [
          'node_modules/govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js',
          'lr-styleguide/js/vendor/polyfills/details.polyfill.js',
          'lr-styleguide/js/vendor/jquery/jquery-1.11.3.js',
          'node_modules/govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
          'lr-styleguide/js/components/buttons-actions.js',
          'lr-styleguide/js/components/case-list.js',
          'lr-styleguide/js/components/init.js'
        ],
        dest: 'lr-styleguide/js/styleguide.js'
      },
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
    'concat',
    'sass'
  ]);

};
