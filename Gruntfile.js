'use strict';

module.exports = function( grunt ){

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    require( 'load-grunt-tasks' )( grunt );

    /**
     * Time how long tasks take. Can help when optimizing build times
     */
    require( 'time-grunt' )( grunt );

    /**
     * Configurable paths for the application
     */
    var userConfig = require( './Grunt.config.js' );

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     * Define the configuration for all the tasks
     */
    var taskConfig = {

        /**
         * We read in our `package.json` file so we can access the package name and version. It's already there, so
         * we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON( 'package.json' ),
        bower: grunt.file.readJSON( 'bower.json' ),

        /**
         * The banner is the comment that is placed at the top of our compiled source files. It is first processed
         * as a Grunt template, where the `<%=` pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
                ' * @appName    <%= pkg.name %>\n' +
                ' * @version    <%= pkg.version %>\n' +
                ' * @date       <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @copyright  <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed    <%= pkg.license %>\n' +
                ' */\n'
        },

        /**
         * Settings for unit and e2e test with karma
         */
        karma: {
            unit: {
                configFile: '<%= testDir %>/karma.unit.config.js',
                singleRun: true
            },
            e2e: {
                configFile: '<%= testDir %>/karma.e2e.config.js',
                singleRun: true
            }
        },

        /**
         *
         */
        watch: {
            dev: {
                files: [
                    'Grunt.config.js',
                    '<%= devDir %>/<%= appFiles.js %>',
                    '<%= devDir %>/<%= lessDir %>/**/*.less'
                ],
                tasks: [
                    'build'
                ],
                options: {
                    event: ['added', 'changed', 'deleted']
                }
            }
        },

        /**
         * `jshint` defines the rules of our linter as well as which files we should check. This file, all javascript
         * sources, and all our unit tests are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation point (!); this is useful when code comes
         * from a third party but is nonetheless inside `src/`.
         * Make sure code styles are up to par and there are no obvious mistakes
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require( 'jshint-stylish' )
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= devDir %>/<%= appFiles.js =>'
                ]
            },
            test: {
                options: {
                    jshintrc: '<%= testDir %>/.jshintrc'
                },
                src: ['<%= testDir %>/<%= appFiles.spec =>']
            }
        },

        /**
         * The 'clean' tasks cleans the mention directories
         */
        clean: {
            temp: {
                src: ['<%= tempDir %>/**/*', '<%= tempDir %>']
            },
            build: {
                src: ['<%= buildDir %>/**/*']
            },
            deploy: {
                src: ['<%= deployDir %>/**/*', '<%= deployDir %>']
            }
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy our project assets
         * (images, fonts, etc.) and javascripts into `buildDir`, and then to copy the assets to `deployDir`.
         */
        copy: {
            buildIndex: {
                files: [
                    {
                        src: '<%= devDir %>/<%= appFiles.index %>',
                        dest: '<%= buildDir %>/<%= appFiles.index %>'
                    }
                ]
            },
            buildVendors: {
                files: [
                    {
                        src: [ '**/*.js' ],
                        cwd: '<%= devDir %>/<%= vendorDir %>',
                        dest: '<%= generatedDir %>/<%= vendorDir %>/',
                        expand: true
                    }
                ]
            },
            buildAssets: {
                files: [
                    {
                        src: [ '**/*.css' ],
                        cwd: '<%= devDir %>/<%= cssDir %>',
                        dest: '<%= buildDir %>/<%= cssDir %>/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        cwd: '<%= devDir %>/<%= mediaDir %>',
                        dest: '<%= buildDir %>/<%= mediaDir %>/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        cwd: '<%= devDir %>/<%= fontDir %>',
                        dest: '<%= buildDir %>/<%= fontDir %>/',
                        expand: true
                    },
                    {
                        src: [ '**/*.js' ],
                        cwd: '<%= devDir %>/<%= vendorDir %>',
                        dest: '<%= buildDir %>/<%= vendorDir %>/',
                        expand: true
                    },
                    {
                        src: [ '**/*.json' ],
                        cwd: '<%= devDir %>/<%= i18nDir %>',
                        dest: '<%= buildDir %>/<%= i18nDir %>/',
                        expand: true
                    }
                ]
            },
            buildApp: {
                files: [
                    {
                        src: [ '**/*.js', '**/*.tpl.html' ],
                        cwd: '<%= devDir %>/<%= srcDir %>',
                        dest: '<%= buildDir %>/<%= srcDir %>/',
                        expand: true
                    }
                ]
            },
            buildLib: {
                files: [
                    {
                        src: '<%= bowerFiles.js %>',
                        cwd: '<%= devDir %>/lib',
                        dest: '<%= buildDir %>/lib/',
                        expand: true
                    },
                    {
                        src: '<%= bowerFiles.css %>',
                        cwd: '<%= devDir %>/<%= libDir %>',
                        dest: '<%= buildDir %>/<%= libDir %>/',
                        expand: true
                    },
                    {
                        src: '<%= bowerFiles.map %>',
                        cwd: '<%= devDir %>/<%= libDir %>',
                        dest: '<%= buildDir %>/<%= libDir %>/',
                        expand: true
                    }
                ]
            },
            deployIndex: {
                files: [
                    {
                        src: '<%= devDir %>/<%= appFiles.index %>',
                        dest: '<%= deployDir %>/<%= appFiles.index %>'
                    }
                ]
            },
            deployAssets: {
                files: [
                    {
                        src: [ '**' ],
                        cwd: '<%= devDir %>/<%= mediaDir %>',
                        dest: '<%= deployDir %>/<%= mediaDir %>/',
                        expand: true
                    },
                    {
                        src: [ '**' ],
                        cwd: '<%= devDir %>/<%= fontDir %>',
                        dest: '<%= deployDir %>/<%= fontDir %>/',
                        expand: true
                    },
                    //{
                    //    src: [ '**/*.js' ],
                    //    cwd: '<%= devDir %>/<%= vendorDir %>',
                    //    dest: '<%= deployDir %>/<%= vendorDir %>/',
                    //    expand: true
                    //},
                    {
                        src: [ '**/*.json' ],
                        cwd: '<%= devDir %>/<%= i18nDir %>',
                        dest: '<%= deployDir %>/<%= i18nDir %>/',
                        expand: true
                    }
                ]
            },
            deployLib: {
                files: [
                    {
                        src: '<%= bowerFiles.js %>',
                        cwd: '<%= devDir %>/<%= libDir %>',
                        dest: '<%= deployDir %>/<%= libDir %>/',
                        expand: true
                    },
                    {
                        src: '<%= bowerFiles.css %>',
                        cwd: '<%= devDir %>/<%= libDir %>',
                        dest: '<%= deployDir %>/<%= libDir %>/',
                        expand: true
                    },
                    {
                        src: '<%= bowerFiles.map %>',
                        cwd: '<%= devDir %>/<%= libDir %>',
                        dest: '<%= deployDir %>/<%= libDir %>/',
                        expand: true
                    }
                ]
            },
            deployTpl: {
                files: [
                    {
                        src: [ '**/*.tpl.html' ],
                        cwd: '<%= devDir %>/<%= srcDir %>',
                        dest: '<%= deployDir %>/<%= srcDir %>/',
                        expand: true
                    }
                ]
            }

        },

        /**
         *
         */
        less: {
            dev: {
                files: {
                    '<%= devDir %>/<%= cssDir %>/<%= appName %>.css': '<%= devDir %>/<%= appFiles.less %>'
                }
            }
        },

        /**
         * The 'cssmin' task combines, minifies and adds a banner to our stylesheets
         */
        cssmin: {
            deploy: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= deployDir %>/<%= cssDir %>/<%= appName %>.min.css': [ '<%= devDir %>/<%= appFiles.css %>' ]
                }
            }
        },

        /**
         *
         */
        concat: {
            deploy: {
                src: [
                    '<%= devDir %>/<%= srcDir %>/app.js',
                    '<%= devDir %>/<%= srcDir %>/*.js',
                    '<%= devDir %>/<%= srcDir %>/**/module.js',
                    '<%= devDir %>/<%= srcDir %>/**/routes.js',
                    '<%= devDir %>/<%= appFiles.js %>'
                ],
                dest: '<%= generatedDir %>/<%= appName %>.js'
            },
            vendors: {
                //cwd: '<%= devDir %>/<%= vendorDir %>',
                src: '<%= tmp.vendorFilesJs %>',
                dest: '<%= generatedDir %>/vendors.js'
            }
        },

        /**
         * ngmin tries to make the code safe for minification automatically by
         * using the Angular long form for dependency injection. It doesn't work on
         * things like resolve or inject so those have to be done manually.
         */
        ngmin: {
            deploy: {
                src: ['<%= generatedDir %>/<%= appName %>.js'],
                dest: '<%= generatedDir %>/<%= appName %>.js'
            }
        },

        /**
         * The 'uglify' tasks also like the cssmin combines, minifies and adds a banner to our javascript files. We also
         * generat a debug file with the 'beautify' option.
         */
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            deployDebug: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    '<%= deployDir %>/<%= srcDir %>/<%= appName %>.debug.js': [ '<%= generatedDir %>/<%= appName %>.js' ]
                }
            },
            deployMin: {
                options: {
                    mangle: {
                        except: ['jQuery', 'Angular', 'angular', '$']
                    }
                },
                files: {
                    '<%= deployDir %>/<%= srcDir %>/<%= appName %>.min.js': [ '<%= generatedDir %>/<%= appName %>.js' ]
                }
            },
            deployVendors: {
                options: {
                    mangle: {
                        except: ['jQuery', 'Angular', 'angular', '$']
                    }
                },
                files: {
                    '<%= deployDir %>/<%= vendorDir %>/vendors.min.js': [ '<%= generatedDir %>/vendors.js' ]
                }
            }
        },

        /**
         * The 'fileblocks' tasks adds our files to the index file.
         */
        fileblocks: {
            dev: {
                options: {
                    rebuild: true
                },
                src: '<%= devDir %>/<%= appFiles.index %>',
                blocks: {
                    'styles': {
                        src: [
                            '<%= cssDir %>/normalize.css',
                            '<%= cssDir %>/crossBrowserStyling.css',
                            '<%= appFiles.css %>'
                        ],
                        cwd: '<%= devDir %>'
                    },
                    'app': {
                        src: [
                            '<%= srcDir %>/app.js',
                            '<%= srcDir %>/*.js',
                            '<%= srcDir %>/**/module.js',
                            '<%= srcDir %>/**/routes.js',
                            '<%= appFiles.js %>'
                        ],
                        cwd: '<%= devDir %>'
                    },

                    'bowerCss': { src: '<%= bowerFiles.css %>', cwd: '<%= devDir %>/<%= libDir %>', prefix: '<%= libDir %>'  },
                    'bowerJs': { src: '<%= bowerFiles.js %>', cwd: '<%= devDir %>/<%= libDir %>', prefix: '<%= libDir %>' },
                    'vendorJs': { src: '<%= vendorFiles.js %>', cwd: '<%= devDir %>/<%= vendorDir %>', prefix: '<%= vendorDir %>'  }

                }
            },
            build: {
                options: {
                    rebuild: true,
                    removeAnchors: true
                },
                src: '<%= buildDir %>/<%= appFiles.index %>',
                blocks: {
                    'styles': { src: '<%= appFiles.css %>', cwd: '<%= buildDir %>' },
                    'app': { src: '<%= appFiles.js %>', cwd: '<%= buildDir %>' },

                    'bowerCss': { src: '<%= bowerFiles.css %>', cwd: '<%= buildDir %>/<%= libDir %>', prefix: '<%= libDir %>'  },
                    'bowerJs': { src: '<%= bowerFiles.js %>', cwd: '<%= buildDir %>/<%= libDir %>', prefix: '<%= libDir %>' },
                    'vendorJs': { src: '<%= vendorFiles.js %>', cwd: '<%= buildDir %>/<%= vendorDir %>', prefix: '<%= vendorDir %>'  }

                }

            },
            deploy: {
                options: {
                    rebuild: true,
                    removeAnchors: true
                },
                src: '<%= deployDir %>/<%= appFiles.index %>',
                blocks: {
                    'styles': { src: '<%= appFiles.css %>', cwd: '<%= deployDir %>' },
                    'app': { src: '<%= appFiles.js %>', cwd: '<%= deployDir %>' },

                    'bowerCss': { src: '<%= bowerFiles.css %>', cwd: '<%= deployDir %>/<%= libDir %>', prefix: '<%= libDir %>'  },
                    'bowerJs': { src: '<%= bowerFiles.js %>', cwd: '<%= deployDir %>/<%= libDir %>', prefix: '<%= libDir %>' },
                    'vendorJs': { src: '**/*.js', cwd: '<%= deployDir %>/<%= vendorDir %>', prefix: '<%= vendorDir %>'  }

                }
            }
        },

        /**
         * The 'bump' task
         */
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [ 'pkg' ],
                commit: false,
                //commitMessage: 'Release v%VERSION%',
                //commitFiles: ['package.json'],
                createTag: false,
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false
                //pushTo: 'upstream',
                //gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }


    };
    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    /**
     * Build tasks for building the dev environment
     */
    grunt.registerTask( 'default', [
        'watch_dev'
    ] );

    grunt.registerTask( 'build', [
        'jshint:all',
        'less:dev',
        'fileblocks:dev'
    ] );

    /**
     * This tasks are for the testing stuff with karma and jasmine
     */
    grunt.registerTask( 'check', [
        'jshint:all',
        'jshint:test'
    ] );

    grunt.registerTask( 'test', [
        'jshint:test',
        'karma:unit',
        'karma:e2e'
    ] );

    grunt.registerTask( 'test:unit', [
        'jshint:test',
        'karma:unit'
    ] );

    grunt.registerTask( 'test:e2e', [
        'jshint:test',
        'karma:e2e'
    ] );

    /**
     * The following tasks are for the deployments
     */
    grunt.registerTask( 'dev', [
        'clean:temp',
        'clean:build',
        'build',

        'copy:buildAssets',
        'copy:buildIndex',
        'copy:buildApp',
        'copy:buildLib',

        'fileblocks:build',
        'clean:temp'
    ] );

    grunt.registerTask( 'prod', [
        'clean:temp',
        'clean:deploy',
        'build',

        'copy:deployAssets',
        'copy:deployLib',
        'copy:deployTpl',
        'copy:deployIndex',

        'cssmin:deploy',

        'genFullPathForVendors',
        'concat:vendors',
        'uglify:deployVendors',

        'concat:deploy',
        'ngmin:deploy',

        'uglify:deployDebug',
        'uglify:deployMin',

        'fileblocks:deploy',
        'clean:temp'
    ] );


    /**
     * This task generate the full path for the vendor js files, because the concat task needs this.
     */
    grunt.registerTask( 'genFullPathForVendors', 'Generates the full path for the vendor js files', function(){

        var vendorFiles = grunt.config.get( ['vendorFiles'] ).js;
        var array = [];

        for( var index=0; index<vendorFiles.length; index++ ){
            array.push( 'app/assets/js/' + vendorFiles[index] );
        }

        grunt.config.set( 'tmp.vendorFilesJs', array );

    } );


};
