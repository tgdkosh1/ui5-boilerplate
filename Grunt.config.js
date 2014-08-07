/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    appName: 'boilerplate',

    devDir   : 'app',
    testDir  : 'test',
    buildDir : 'bin',
    deployDir: 'dist',

    libDir   : 'bower_components',
    srcDir   : 'src',

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

        templates: [
            'src/**/*.tpl.html'
        ],

        index: 'index.html',

        css: [
            'assets/css/**/*.css'
        ],

        less: 'assets/less/main.less',

        i18n: [
            'assets/i18n/**/*.json'
        ],

        spec: '**/*.spec.js'
    },

    /**
     * This is the same as `appFiles`, except it contains patterns that reference vendor code (`lib/`, `assets/js/`) that we
     * need to place into the build process somewhere.
     */
    bowerFiles : {
        js : [
            'jquery/dist/jquery.min.js',
            'bootstrap/dist/js/bootstrap.min.js',
            'underscore/underscore.js',
            'angular/angular.js',
            'angular-sanitize/angular-sanitize.min.js',
            'angular-translate/angular-translate.min.js',
            'angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            'angular-ui-router/release/angular-ui-router.min.js',
            'angular-animate/angular-animate.min.js'

        ],
        map:[
            'jquery/dist/jquery.min.map',
            'angular-sanitize/angular-sanitize.min.js.map',
            'angular-animate/angular-animate.min.js.map'

        ],
        css: [
        ]
    },

    vendorFiles: {
        js : [
            'html5shiv.js',
            'affix.js',
            'alert.js',
            'button.js',
            'carousel.js',
            'chosen.js',
            'collapse.js',
            'datepicker.js',
            'dropdown.js',
            'modal.js',
            'popover.js',
            'respond.js',
            'scrollspy.js',
            'tab.js',
            'tooltip.js',
            'transition.js'
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
