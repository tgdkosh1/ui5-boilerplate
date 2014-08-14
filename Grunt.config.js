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
    imagesDir : 'assets/images',
    i18nDir  : 'assets/i18n',

//    tempDir     : '.tmp',
//    generatedDir: '.tmp/generated',

    ui5Dir: this.bowerDir + '/openui5-sdk',

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
