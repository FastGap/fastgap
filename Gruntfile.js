/*!
 * FastGap's Gruntfile
 * http://fastgap.mobi/
 * Licensed under MIT
 */

var buildConfig = require('./config/build');

module.exports = function (grunt) {
  "use strict";

  var appConfig = {

    // Default Paths
    paths: {
      src: 'src',
      dist: 'dist',
      bower: 'bower_components'
    },

    // Assets directory
    dirs: {
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
      fastgapControllers: {
        src: [
          // Main
          '<%= paths.src %>/js/controllers/AppController.js',
          '<%= paths.src %>/js/controllers/HomeController.js',
          // Custom
          '<%= paths.src %>/js/controllers/Page1Controller.js',
          '<%= paths.src %>/js/controllers/Page2Controller.js',
          '<%= paths.src %>/js/controllers/Page3Controller.js',
          '<%= paths.src %>/js/controllers/Page4Controller.js',
          '<%= paths.src %>/js/controllers/Page5Controller.js'
        ],
        dest: '<%= paths.dist %>/js/fastgap.controllers.js'
      },
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
        dest: '<%= paths.dist %>/js/fastgap.libs.js'
      },
      fastgapCore: {
        src: [
          // Main
          '<%= paths.src %>/js/History.js',
          '<%= paths.src %>/js/FG.js',
          '<%= paths.src %>/js/Navigator.js',
          '<%= paths.src %>/js/Transition.js',
          '<%= paths.src %>/js/PageLoad.js',
          '<%= paths.src %>/js/index.js'
        ],
        dest: '<%= paths.dist %>/js/fastgap.core.js'
      },
      fastgap: {
        src: [
          '<%= paths.dist %>/js/fastgap.controllers.js',
          '<%= paths.dist %>/js/fastgap.libs.js',
          '<%= paths.dist %>/js/fastgap.core.js'
        ],
        dest: '<%= paths.dist %>/js/fastgap.js'
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
          cwd: '<%= paths.bower %>/topcoat/font',
          src: '*.otf',
          dest: '<%= paths.dist %>/fonts'
        }]
      },
      distCss: {
        files: [{
          expand: true,
          cwd: "<%= dirs.css %>/",
          src: buildConfig.cssFiles,
          dest: "<%= paths.dist %>/assets/css"
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

  // Init grunt configurations
  grunt.initConfig(appConfig);


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
