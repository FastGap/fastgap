"use strict";

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var appConfig = {

        // Default Paths
        paths: {
          src: "src",
          release: "release"
        },

        // Assets directory
        dirs: {
            js:   "<%= paths.src %>/assets/js",
            sass: "<%= paths.src %>/assets/scss",
            css:  "<%= paths.src %>/assets/css",
            img:  "<%= paths.src %>/assets/images"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner:
        "\n" +
        "/*\n" +
         " * -------------------------------------------------------\n" +
         " * Project: <%= pkg.name %>\n" +
         " * Version: <%= pkg.version %>\n" +
         " *\n" +
         " *\n" +
         " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>\n" +
         " * -------------------------------------------------------\n" +
         " */\n" +
         "\n",

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

        // Minification
        uglify: {
            options: {
                mangle: false,
                banner: "<%= banner %>"
            },
            dist: {
                files: {
                    "<%= dirs.js %>/main.min.js": [
                    "<%= dirs.js %>/main.js"
                    ]
                }
            }
        },

        // Compass for SCSS
        compass: {
            dist: {
                options: {
                    force: true,
                    config: "config/compass.rb",
                    sassDir: "<%= dirs.sass %>",
                    cssDir: "<%= dirs.css %>",
                    banner: "<%= banner %>",
                    specify: "<%= dirs.sass %>/*.scss"
                }
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
        }

    };


    // Init grunt configurations
    grunt.initConfig(appConfig);


    // Tasks
    // --------------------------

    // Default task
    grunt.registerTask( "default", [ "jshint", "compass", "uglify" ] );

    // Watch files
    grunt.registerTask( "watch-files", [ "watch" ]);


    // Alias
    grunt.registerTask( "w", [ "watch" ] );

};
