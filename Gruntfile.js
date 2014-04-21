/*!
 * FastGap's Gruntfile
 * http://fastgap.mobi/
 * Licensed under MIT
 */

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
            " * Author: <%= pkg.author.name %>\n" +
            " * Maintainers: https://github.com/orgs/FastGap/members\n" +
            " * Copyright (c) <%= grunt.template.today(\"yyyy\") %>\n" +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',

    /************************************
     * grunt-contrib-clean
     * Clean files and folders
     ************************************/
    clean: {
      dist: 'dist/{css,js}'
    },

    /************************************
     * grunt-sass
     * Compile SCSS to CSS using node-sass
     ************************************/
    sass: {
      development: {
        options: {
          includePaths: ['<%= paths.src %>/scss/base/'],
          outputStyle: 'nested'
        },
        files: {
          '<%= paths.dist %>/css/fastgap.css': '<%= paths.src %>/scss/build.scss'
        }
      },
      production: {
        options: {
          includePaths: ['<%= paths.src %>/scss/base/'],
          outputStyle: 'compressed'
        },
        files: {
          '<%= paths.dist %>/css/fastgap.min.css': '<%= paths.src %>/scss/build.scss'
        }
      }
    },

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
      controllers: {
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
      libraries: {
        src: [
          // Main
          '<%= paths.bower %>/zepto/zepto.js',
          '<%= paths.bower %>/fastclick/lib/fastclick.js',
          // Scroll
          '<%= paths.bower %>/overthrow-dist/overthrow.js',
          // Snap.js (menu)
          '<%= paths.bower %>/snapjs/snap.js'
        ],
        dest: '<%= paths.dist %>/js/fastgap.libs.js'
      },
      core: {
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

    /************************************
     * grunt-contrib-uglify
     * Minify files
     ************************************/
    uglify: {
      js: {
        src: '<%= paths.dist %>/js/fastgap.js',
        dest: '<%= paths.dist %>/js/fastgap.min.js'
      }
    },

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

    /************************************
     * grunt-contrib-imagemin
     * Minify PNG, JPEG and GIF images
     ************************************/
    imagemin: {                          // Task
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 3
        },                        // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '<%= paths.src %>/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '<%= paths.dist %>/'                  // Destination path prefix
        }]
      }
    },

    /************************************
     * grunt-contrib-copy
     * Copy files and folders to a specific path
     ************************************/
    copy: {
      imagesToDemo: {
        expand: true,
        cwd: '<%= paths.dist %>/img',
        src: ['*.png', '*.jpg', '*.gif'],
        dest: 'demo/assets/img'
      },
      fastgapJs: {
        expand: true,
        cwd: '<%= paths.dist %>/js',
        src: ['*.js'],
        dest: 'demo/assets/js'
      },
      snapCSS: {
        expand: true,
        cwd: '<%= paths.bower %>/snapjs',
        src: ['snap.css'],
        dest: 'demo/assets/css'
      },
      topcoatCSS: {
        expand: true,
        cwd: '<%= paths.bower %>/topcoat/css',
        src: ['topcoat-mobile-light.min.css'],
        dest: 'demo/assets/css'
      },
      fastgapCSS: {
        expand: true,
        cwd: '<%= paths.dist %>/css',
        src: ['fastgap.min.css'],
        dest: 'demo/assets/css'
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
        commitFiles: ['package.json', 'bower.json', 'dist/', 'demo/'], // '-a' for all files
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

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // Dist JS
  grunt.registerTask('dist-js', ['concat', 'uglify']);
  // Dist CSS
  grunt.registerTask('dist-css', ['sass']);
  // Dist IMG
  grunt.registerTask('dist-img', ['imagemin']);

  // Watch Task
  grunt.registerTask('w', ['watch']);

  // Default task
  grunt.registerTask('dist', ['clean', 'dist-js', 'dist-css', 'dist-img', 'usebanner', 'copy']);
  grunt.registerTask('build', ['dist']);
  grunt.registerTask('default', ['dist']);

};
