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
            }
        },

        /**
         * The 'clean' tasks cleans the mention directories
         */
        clean: {
            lib: {
                src: [ '<%= devDir %>/<%= libDir %>/**/*' ]
            }
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy our project assets
         * (images, fonts, etc.) and javascripts into `buildDir`, and then to copy the assets to `deployDir`.
         */
        copy: {
            openui5: {
                files: [
                    {
                        src: [ '**' ],
                        cwd: '<%= bowerDir %>/<%= ui5Dir %>/resources',
                        dest: '<%= devDir %>/<%= libDir %>/<%= ui5Dir %>/resources',
                        expand: true
                    }
                ]
            },
            bowerToLib: {
                files: [
                    {
                        src: '<%= bowerFiles.js %>',
                        cwd: '<%= bowerDir %>',
                        dest: '<%= devDir %>/<%= libDir %>/',
                        expand: true
                    }
                ]
            }
        }


    };
    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    /**
     * Build tasks for building the dev environment
     */
    grunt.registerTask( 'default', [
        'build'
    ] );

    grunt.registerTask( 'build', [
        'jshint:all',
        'clean:lib',
        'copy:bowerToLib',
        'copy:openui5'
    ] );


};
