/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    appName: 'boilerplate',

    devDir   : 'app',
    bowerDir : 'bower_components',

    srcDir   : 'src',
    libDir   : 'lib',
    vendorDir: 'assets/js',
    cssDir   : 'assets/css',
    lessDir  : 'assets/less',
    fontDir  : 'assets/fonts',
    mediaDir : 'assets/media',
    i18nDir  : 'assets/i18n',

    tempDir     : '.tmp',
    generatedDir: '.tmp/generated',

    appFiles: {

        js: [
            'src/**/*.js'
        ],

        index: 'index.html',

        css: [
            'assets/css/**/*.css'
        ]

    },

    /**
     * This is the same as `appFiles`, except it contains patterns that reference vendor code (`lib/`, `assets/js/`) that we
     * need to place into the build process somewhere.
     */
    bowerFiles : {
        js : [
        ],
        map:[
        ],
        css: [
        ]
    },

    vendorFiles: {
        js : [
        ],
        map:[
        ],
        css: [
        ]
    },

    /**
     * Temp configs
     */
    tmp: {
        vendorFilesJs: []
    }

};
