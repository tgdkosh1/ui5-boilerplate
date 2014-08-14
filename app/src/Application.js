/**
 * Define your local resources here
 */
sap.ui.localResources( 'view' );
sap.ui.localResources( 'util' );

jQuery.sap.registerModulePath( 'view', 'src/view' );
jQuery.sap.registerModulePath( 'util', 'src/util' );



/**
 * Application
 *
 * At runtime the first code to be executed is the 'Application.js'. The 'init' function is executed
 * right away and can trigger tasks that can be executed without having the DOM available,
 * e.g. loading JSON files from the server. The 'main' function is only called after the DOM is ready.
 * This is the point in time when you instantiate the app view and controller and place the view in the DOM.
 *
 */
jQuery.sap.declare( 'Application' );
jQuery.sap.require( 'sap.ui.app.Application' );

sap.ui.app.Application.extend( 'Application', {
    init: function(){


    },
    /**
     * Defines your home/main view for your spa(single-page-application)
     */
    main: function(){
        var root = this.getRoot();
        var oView = new sap.ui.jsview( 'view.home', 'view.home' );
        oView.placeAt( root );

    }
} );

var oApp = new Application( {root: 'content'} );