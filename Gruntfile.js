/*!
 * FastGap's Gruntfile
 * http://fastgap.mobi/
 * Licensed under MIT
 */

var buildConfig = require('./config/build');

module.exports = function (grunt) {
  "use strict";

  // Project configuration
  grunt.initConfig({

    // Default Paths
    paths: {
      src: "src",
      dist: "dist",
      bower: "bower_components"
    },

    // Assets directory
    dirs: {
      js: "<%= paths.src %>/assets/js",
      sass: "<%= paths.src %>/assets/scss",
      css: "<%= paths.src %>/assets/css",
      img: "<%= paths.src %>/assets/images",
      vendor: "<%= paths.src %>/vendor",
      pages: "<%= paths.src %>/pages",
      fonts: "<%= paths.src %>/vendor/topcoat/font"
    },

    // Load package.json
    pkg: grunt.file.readJSON("package.json"),

    // Banner
    banner: '/*!\n' +
            " * FastGap v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
            " * Author: <%= pkg.author %>\n" +
            " * Maintainers: <%= pkg.maintainers %>\n" +
            " * Copyright (c) <%= grunt.template.today(\"yyyy\") %>\n" +
            ' * Licensed under <%= pkg.licenses.type %>\n' +
            ' */\n',

    // Watch files
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ["<%= dirs.sass %>/{,*/}*.{scss,sass}"],
        tasks: ["compass", "notify:compass"]
      },
      js: {
        files: ["<%= jshint.all %>"],
        tasks: ["jshint", "uglify", "notify:js"]
      },
      html: {
        files: [
          // carregamento automático do browser para as atualizações das extensões abaixo
          "/*.{html,htm,shtml,shtm,xhtml,php,jsp,asp,aspx,erb,ctp}"
        ]
      }
    },

    // Files Validation
    jshint: {
      options: {
          jshintrc: ".jshintrc"
      },
      all: [
          "Gruntfile.js",
          "<%= dirs.js %>/main.js"
      ]
    },

    /************************************
     * grunt-contrib-concat
     * Concatenate files
     ************************************/
    concat: {
      librariesJs: {
        src: [
          // Main
          '<%= paths.bower %>/zepto/zepto.js',
          '<%= paths.bower %>/fastclick/lib/fastclick.js',
          // Scroll
          '<%= paths.bower %>/overthrow-dist/overthrow.js',
          // Snap.js (menu)
          '<%= paths.bower %>/snapjs/snapjs.js'
        ],
        dest: 'dist/js/fastgap.libs.js'
      }
    },

    // Minification
    uglify: {
      options: {
        mangle: false,
        banner: "<%= banner %>"
      }
          // ,
          // dist: {
          //     files: {
          //         "<%= dirs.js %>/main.min.js": [
          //         "<%= dirs.js %>/main.js"
          //         ]
          //     }
          // }
    },

      // Compass for SCSS
      /*compass: {
      dist: {
          options: {
              force: true,
              sassDir: "<%= dirs.sass %>",
              cssDir: "<%= dirs.css %>",
              banner: "<%= banner %>",
              specify: "<%= dirs.sass %>/*.scss"
          }
      }
  },*/

    // Notificações
    notify: {
      compass: {
        options: {
          title: "SASS - <%= pkg.title %>",
          message: "Build with success!"
        }
      },
      js: {
        options: {
          title: "Javascript - <%= pkg.title %>",
          message: "Minified and validated with success!"
        }
      }
    },

    copy: {
      /* COPY FONTS FOLDER */
      distFonts: {
        files: [{
          expand: true,
          cwd: "<%= dirs.fonts %>",
          src: "**",
          dest: "<%= paths.dist %>/vendor/topcoat/font"
        }]
      },
      distVendor: {
        files: [{
          expand: true,
          cwd: "<%= dirs.vendor %>/",
          src: buildConfig.vendorFiles,
          dest: "<%= paths.dist %>/vendor/"
        }]
      },
      distHtml: {
        files: [{
          expand: true,
          cwd: "<%= paths.src %>/",
          src: buildConfig.htmlFiles,
          dest: "<%= paths.dist %>/"
        }]
      },
      distCss: {
        files: [{
          expand: true,
          cwd: "<%= dirs.css %>/",
          src: buildConfig.cssFiles,
          dest: "<%= paths.dist %>/assets/css"
        }]
      },
      distJs: {
        files: [{
          expand: true,
          cwd: "<%= dirs.js %>/",
          src: buildConfig.jsFiles,
          dest: "<%= paths.dist %>/assets/js"
        }]
      },
      distImages: {
        files: [{
          expand: true,
          cwd: "<%= dirs.img %>/",
          src: "**",
          dest: "<%= paths.dist %>/assets/images"
        }]
      },
      distPages: {
        files: [{
          expand: true,
          cwd: "<%= dirs.pages %>/",
          src: "**",
          dest: "<%= paths.dist %>/pages"
      }]
      }
    },

    /************************************
     * grunt-banner
     * Adds a simple banner to files
     ************************************/
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: '<%= paths.dist %>/{css,js}/{*.css,*.js}'
      }
    },

    /************************************
     * grunt-bump
     * Bump package version, create tag, commit, push...
     ************************************/
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist/'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }

  };


  // Tasks
  // --------------------------

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Dist JS
  grunt.registerTask('dist-js', ['concat']);

  // Watch Task
  grunt.registerTask('w', ['watch']);

  // Default task
  grunt.registerTask('dist', ['copy']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);

};
